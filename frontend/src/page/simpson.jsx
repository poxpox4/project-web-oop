import { useState } from "react";
import nerdamer from "nerdamer";
import "nerdamer/Calculus";
import Plot from "react-plotly.js";
import { evaluate } from "mathjs";
import { MathJax,MathJaxContext } from "better-react-mathjax";
import { useQuery,useQueryClient,useMutation } from "@tanstack/react-query";
import axios from "axios";
function CompositeSimpson(){
    const [fx,setFx] = useState("");
    const [a,setA] = useState();
    const [b,setB] = useState();
    const [n,setN] = useState(1);
    const [Ireal,setIreal] = useState(null);
    const [Ical,setIcal] = useState(null);
    const [error,setError] = useState(null);
    const [xcurve,setXcurve] = useState([]);
    const [ycurve,setYcurve] = useState([]);
    const [xiter,setXiter] = useState([]);
    const [yiter,setYiter] = useState([]);
    const [graph,setGraph] = useState([]);
    const [graphn,setGraphn] = useState([]);
    //backend
    const [selectId,setSelectId] = useState("");
    const queryClient = useQueryClient();
    //ดึงข้อมูลจากDB
    const { data: equation = [], isLoading, error: fetchError } = useQuery({
        queryKey: ["equation"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/integration");
            return res.data || [];
        },
    });
    // เมื่อเลือกสมการ
    const Select = (e) => {
        const id = e.target.value;
        setSelectId(id);
        const found = equation.find((eq) => eq.ID === parseInt(id));
        if(found) setFx(found.Equation);
    }
    // เพิ่มสมการใหม่
    const addEquationMutation = useMutation({
        mutationFn: async (newEquation) => {
            const res = await axios.post("http://localhost:5000/integration", { equation: newEquation });
            return res.data;
        },
        onSuccess: (data) => {
            if (data.success) {
                alert("บันทึกสมการสำเร็จ");
                queryClient.invalidateQueries({ queryKey: ["equation"] });
            } else {
                alert("บันทึกไม่สำเร็จ");
            }
        },
    });
    const AddEquation = () => {
        const trimfx = fx.trim();
        const isSameequation = equation.some(eq => eq.Equation.trim().toLowerCase() === trimfx.toLowerCase())
        if(isSameequation){
            alert("สมการนี้มีอยู่แล้ว");
            return;
        }
        addEquationMutation.mutate(trimfx);
    }
    function F(x,variable){
            const equation = evaluate(fx,{[variable]:x});
            return equation;
        }
        function Comsimp(a,b,n,variable){
            if(n<1){
            alert("n ต้องมากกว่า 1");
            return;
            }
            if(a>b){
            alert("a ต้องน้อยกว่า b");
            return;
            }
            const h = (b-a)/(2*n);
            let sumpo = 0;
            let sumne = 0;
            for(let i=1;i<2*n;i++){
            if(i%2==0){
                sumpo += F(a+i*h,variable);
            }
            else{
                sumne += F(a+i*h,variable);
            }
            }
            const I = (h/3)*(F(a,variable)+F(b,variable)+4*(sumne)+2*(sumpo));
            return I;
        }
        function Calculate(){
            try{
            if(!fx||!a||!b||!n){
                alert("ใส่ค่าให้ครบ");
                return;
            }
            const variablemath = fx.match(/[a-zA-Z]+/g);
            const variable = variablemath ? variablemath[variablemath.length-1] : "x";
            const anum = parseFloat(a);
            const bnum = parseFloat(b);
            const nnum = parseFloat(n);
            const Fx_integrate = nerdamer.integrate(fx, variable).toString();
            const FB = evaluate(Fx_integrate,{[variable]:bnum});
            const FA = evaluate(Fx_integrate,{[variable]:anum});
            const I_real = FB-FA;
            const I_cal = Comsimp(anum,bnum,nnum,variable);
            const error = ((I_real-I_cal)/I_real)*100;
            setIreal(I_real);
            setIcal(I_cal);
            setError(error);
            const Xcurve = [];
            const Ycurve = [];
            for(let i=anum;i<=bnum;i+=0.01){
                Xcurve.push(i);
                Ycurve.push(F(i,variable));
            }
            setXcurve(Xcurve);
            setYcurve(Ycurve);
    
            const h = (bnum-anum)/(2*nnum);
            const Xiter = [];
            const Yiter = [];
            const lineiter = [];
            for(let i=0;i<=2*nnum;i++){
                let xcal = anum+i*h;
                Xiter.push(xcal);
                Yiter.push(F(xcal,variable));
                lineiter.push({
                x: [xcal,xcal],
                y: [0,F(xcal,variable)],
                type: "scatter",
                mode: "lines",
                line: {color:"black"}
                })
            }
            setGraph(lineiter);
            setXiter(Xiter);
            setYiter(Yiter);
    
            const fill2 = [];
            const colors = [
                "rgba(255,99,132,0.3)",  // แดงอ่อน
                "rgba(54,162,235,0.3)",  // น้ำเงิน
                "rgba(75,192,192,0.3)",  // เขียว
                "rgba(255,206,86,0.3)",  // เหลือง
                "rgba(153,102,255,0.3)", // ม่วง
                "rgba(255,159,64,0.3)"   // ส้ม
            ];
    
            for(let i=0;i<nnum;i++){
                const x0 = anum+(2*i)*h;
                const x1 = anum+(2*i+1)*h;
                const x2 = anum+(2*i+2)*h;
                const y0 = F(x0,variable);
                const y1 = F(x1,variable);
                const y2 = F(x2,variable);
                const color = colors[i % colors.length];
                fill2.push({
                x: [x0,x1,x2],
                y: [y0,y1,y2],
                type: "scatter",
                mode: "lines",
                line: { shape: "spline", color: color.replace("0.3","0.8")},
                fill: "tozeroy",
                fillcolor: colors,
                })
            }
            setGraphn(fill2);
            
            }
            catch{
            alert("Error");
            }
        }
        if(isLoading) return <>Loading...</>
        if(fetchError) return <>Error fetch</>
        
    return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4 p-4">
        <h1 className="font-bold text-3xl text-center">Simpson</h1>

        <MathJaxContext>
        <div className="w-full max-w-4xl px-4 ">
            <div className="mt-1 p-4 bg-white-50 rounded-2xl shadow-md text-center ">
            <MathJax className="text-3xl">{"\\[\\int_{"+(a||"a")+"}^{"+(b||"b")+"} ("+(fx||"\\;...\\;")+")\\,dx\\]"}</MathJax>
            </div>
        </div>
        </MathJaxContext>

        <div className="w-full max-w-xl space-y-3 mt-1 px-10 py-10 bg-white-50 rounded-2xl shadow-md text-center">
            <label >เลือกสมการ</label>
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
                    onClick={AddEquation}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                        +
                    </button>
                </div>
            <div>
                <label className="block mb-1 ">f(x)</label>
                <input
                type="text"
                placeholder="x^7+2x^3-1"
                className="rounded shadow-md px-3 py-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
                value={fx}
                onChange={(e) => setFx(e.target.value)}/>
            </div>

            <div>
                <label className="block mb-1 ">a</label>
                <input
                type="number"
                placeholder="2"
                className="rounded shadow-md px-3 py-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
                value={a}
                onChange={(e) => setA(e.target.value)}/>
            </div>

            <div>
                <label className="block mb-1 ">b</label>
                <input
                type="number"
                placeholder="8"
                className="rounded shadow-md px-3 py-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
                value={b}
                onChange={(e) => setB(e.target.value)}/>
            </div>
        </div>

        <button
            onClick={Calculate} className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded text-white  ">Calculate
        </button>
        <div className="mt-1 p-4 bg-white-50 rounded-2xl shadow-md w-full max-w-4xl px-4 text-center">
            <h2 className="text-xl mb-2 font-bold">Solution</h2>
            {Ireal !== null && (
                <div className="text-xl mb-2">Result of I_real is : {Ireal.toFixed(6)}</div>
            )}
            {Ical !== null && (
                <div className="text-xl mb-2">Result of I_cal is : {Ical.toFixed(6)}</div>
            )}
            {error !== null && (
                <div className="text-xl mb-2">Result of Error is : {error.toFixed(6)}</div>
            )}
        </div>
        <div className="w-full max-w-4xl mt-1 p-4 bg-white-50 rounded-2xl shadow-md">
            <Plot useResizeHandler={true}
                data={[
                {
                    x: xcurve,
                    y: ycurve,
                    type: "scatter",
                    mode: "lines",
                    line: { color: "black" },
                    name: "f(x)",
                },
                {
                    x: xiter,
                    y: yiter,
                    type: "scatter",
                    mode: "markers",
                    marker: { color: "blue" },
                    name: "จุดย่อย",
                },
                ...graph,
                ...graphn,
                
                ]}
                layout={{
                    autosize: true,
                    responsive: true,
                    title: {text: "Graph Composite Trapezoidal"},
                    xaxis: {title:{text:"X"}},
                    yaxis: {title:{text:"f(X)"}},
                }}
                style={{width:"100%",height:"500px"}}
                />
        </div>
      
    </div>

);

}
export default CompositeSimpson;