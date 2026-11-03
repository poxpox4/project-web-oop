import { useState } from "react";
import Plot from "react-plotly.js";
import { MathJax,MathJaxContext } from "better-react-mathjax";
import { useQuery,useQueryClient,useMutation } from "@tanstack/react-query";
import { rootEquationService } from "../lib/equationService";
import { SolverError } from "../lib/errors";
import { RootOfEquationProblem } from "../lib/rootOfEquationProblem";
import { FalsePositionSolver } from "../lib/solvers/falsePositionSolver";
function Falseposition(){
    const [fx,setFx] = useState("");
    const [xl,setXl] = useState("");
    const [xr,setXr] = useState("");
    //const [x1,setX1] = useState("");
    const [error,setError] = useState("");
    const [result,setResult] = useState(null);
    const [iteration,setIteration] = useState([]);
    //backend
    const [selectId,setSelectId] = useState("");
    const queryClient = useQueryClient();
    //get DB
    const {data: equation = [],isLoading,error:fetchError} = useQuery({
        queryKey: ["equation"],
        queryFn: () => rootEquationService.getAll(),
    })
    //Select
    const Select = (e) => {
        const id = e.target.value;
        setSelectId(id);
        const found = equation.find((eq) => eq.ID === parseFloat(id))
        if(found) setFx(found.Equation);
    }
    //Add
    const addEquationMutation = useMutation({
        mutationFn: (newEquation) => rootEquationService.add(newEquation),
        onSuccess: (data) => {
            if(data.success){
                alert("เพิ่มสมการสำเร็จ");
                queryClient.invalidateQueries({queryKey:["equation"]})
            }
            else{
                alert("ไม่สามารถเพิ่มสมการได้");
            }
        }
    })
    const AddEquation = () => {
        const trimfx = fx.trim();
        const isSameequation = equation.some((eq) => eq.Equation.trim().toLowerCase() === trimfx.toLowerCase());
        if(isSameequation){
            alert("สมการนี้มีอยู่แล้ว");
            return;
        }
        addEquationMutation.mutate(trimfx);
    }
    function Calculate(){
        try{
            const problem = new RootOfEquationProblem({ fx, xl, xr, error });
            const solver = new FalsePositionSolver(problem);
            const output = solver.getOutput();
            setResult(output.result);
            setIteration(output.iterations);
        }
        catch(e){
            alert(e instanceof SolverError ? e.message : "สมการผิด");
        }
    }
    if(isLoading) return <div>Loading...</div>
    if(fetchError) return <div>Error fetch</div>
    return(
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4 p-4">
            <h1 className="font-bold text-3xl">False Position</h1>
            <MathJaxContext>
                <div className="w-full max-w-4xl px-4">
                    <div className="mt-1 p-4 bg-white-50 rounded-2xl shadow-md text-center ">
                        <MathJax className="text-3xl">{"\\[f(x)=" + (fx || "\\;...\\;") + "\\]"}</MathJax>
                    </div>
                </div>
            </MathJaxContext>
            <div className="w-full max-w-xl space-y-3 mt-1 px-10 py-10 bg-white-50 rounded-2xl shadow-md text-center">
                <label htmlFor="">เลือกสมการ</label>
                <select 
                className="shadow-md rounded w-full px-4 py-3 text-center"
                value={selectId}
                onChange={Select}>
                    <option value="">เลือกสมการ</option>
                    {equation.map((eq) => (
                        <option key={eq.ID} value={eq.ID}>{eq.Equation}</option>
                    ))}
                </select>
                <div className="flex justify-center">
                    <button
                    className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white"
                    onClick={AddEquation}>
                        +   
                    </button>
                </div>
                <div>
                    <label className="block mb-1">f(x)</label>
                    <input type="text" 
                    placeholder="x^4-13"
                    className="rounded shadow-md px-3 py-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
                    value={fx}
                    onChange={(e) => setFx(e.target.value)}/>
                </div>
                <div>
                    <label className="block mb-1">XL</label>
                    <input type="number" 
                    placeholder="1.5"
                    className="rounded shadow-md px-3 py-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
                    value={xl}
                    onChange={(e) => setXl(e.target.value)}/>
                </div>
                <div>
                    <label className="block mb-1">XR</label>
                    <input type="number" 
                    placeholder="2"
                    className="rounded shadow-md px-3 py-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
                    value={xr}
                    onChange={(e) => setXr(e.target.value)}/>
                </div>
                <div>
                    <label className="block mb-1">ERROR</label>
                    <input type="number" 
                    placeholder="0.000001"
                    className="rounded shadow-md px-3 py-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
                    value={error}
                    onChange={(e) => setError(e.target.value)}/>
                </div>
            </div>
            <button onClick={Calculate} className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded text-white">Calculate</button>
            <div className="mt-1 px-4 py-10 bg-white-50 rounded-2xl shadow-md w-full max-w-4xl px-4 text-center">
                <h2 className="font-bold text-xl mb-3">Solution</h2>
                {result !== null &&(
                    <div className="text-xl mb-3">Result is : {result.toFixed(6)}</div>
                )}
                {iteration.length > 0 &&(
                    <table className="border-collapse border border-gray-400 w-full">
                        <thead>
                            <tr>
                                <th className="border px-2 py-1">ITERATION</th>
                                <th className="border px-2 py-1">XL</th>
                                <th className="border px-2 py-1">XR</th>
                                <th className="border px-2 py-1">f(XL)</th>
                                <th className="border px-2 py-1">f(XR)</th>
                                <th className="border px-2 py-1">X1</th>
                                <th className="border px-2 py-1">f(X1)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {iteration.map((item,index) => (
                                <tr key={index}>
                                    <td className="border px-2 py-1">{index+1}</td>
                                    <td className="border px-2 py-1">{item.xl.toFixed(6)}</td>
                                    <td className="border px-2 py-1">{item.xr.toFixed(6)}</td>
                                    <td className="border px-2 py-1">{item.fxl.toFixed(6)}</td>
                                    <td className="border px-2 py-1">{item.fxr.toFixed(6)}</td>
                                    <td className="border px-2 py-1">{item.x1.toFixed(6)}</td>
                                    <td className="border px-2 py-1">{item.fx1.toFixed(6)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <div className="w-full max-w-4xl mt-1 p-4 bg-white-50 rounded-2xl shadow-md">
                <Plot useResizeHandler={true} 
                    data={[
                        {
                            x: iteration.map((item,index) => index+1),
                            y: iteration.map((item) => item.error),
                            type: "scatter",
                            mode: "lines+markers",
                            marker: { color: "black" },
                            line: {color: "gray"},
                        }
                    ]}
                    layout={{
                        autosize: true,
                        responsive: true,
                        title:{text: "Graph Falseposition Error"},
                        xaxis: { title: { text: "X" } },
                        yaxis: { title: { text: "f(X)" } },
                    }}
                    style={{width:"100%",height:"500px"}}
                />
            </div>
            
        </div>
    )
}
export default Falseposition;