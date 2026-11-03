import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./component/navbar/navbar";
import Bisection from "./page/bisection";
import Falseposition from "./page/falsepositon";
import Onepoint from "./page/one_point";
import { useState } from "react";
import "./index.css";
const queryClient = new QueryClient();
const problemOptions = {
  "Root of Equation": [
    { name: "Bisection", path: "/bisection" },
    { name: "False Position", path: "/falseposition" },
    { name: "One-point Iteration", path: "/one_point" },
  ],
};

function PageSelect() {
  const navigate = useNavigate();
  const [type, setType] = useState(""); // สามารถตั้ง default เช่น "Root of Equation" ก็ได้
  const [solution, setSolution] = useState("");

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setSolution(""); // reset solution
  };

  const handleSolutionChange = (e) => {
    setSolution(e.target.value);
    navigate(e.target.value);
  };

  const currentSolutions = type ? problemOptions[type] : [];

  return (
    <div className="p-4 flex   gap-10 items-center justify-center text-xl mt-5">
      {/* Type of Problem */}
      <div>
        <label className="mr-2 block">Type of Problem:</label>
        <select value={type} onChange={handleTypeChange} className="mt-2 shadow-md shadow-sm px-4 py-4 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option value="">Select Type</option>
          {Object.keys(problemOptions).map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
      </div>

      {/* Solution */}
      <div>
        <label className="mr-2 block">Solution:</label>
        <select value={solution} onChange={handleSolutionChange} className="mt-2 shadow-md shadow-sm px-4 py-4 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option value="">Select Solution</option>
          {currentSolutions.map((item) => (
            <option key={item.path} value={item.path}>{item.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

function App(){
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
          <Navbar />
          
          <Routes>
            <Route path="/" element={<div className="flex flex-col items-center justify-center h-screen">
              <h1 className="text-6xl font-bold">Welcome to Numerical</h1>
              <PageSelect />
            </div>} />
            
            <Route path="/bisection" element={<Bisection />} />
            <Route path="/falseposition" element={<Falseposition/>} />
            <Route path="/one_point" element={<Onepoint/>}/>
          </Routes>
        </Router>
    </QueryClientProvider>
  );
}
export default App;
