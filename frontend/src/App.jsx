import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./component/navbar/navbar";
import Graphical from "./page/graphical";
import Bisection from "./page/bisection";
import Falseposition from "./page/falsepositon";
import Newton from "./page/newton-raphson";
import Secant from "./page/secant";
import Trapezoidal from "./page/trapezoidal";
import Linear from "./page/linear-regression";
import Simpson from "./page/simpson";
import CompositeTrapezoidal from "./page/composite_trap";
import CompositeSimpson from "./page/composite_simpson";
import Onepoint from "./page/one_point";
import Carmer from "./page/carmer_rule";
import Gausseliminate from "./page/gauss_elimination";
import Gaussjordan from "./page/gauss_jordan";
import MatrixInvert from "./page/matrix_invert";
import Diff from "./page/diff";
import PolynomialRegression from "./page/polynomial_regression";
import Multiple from "./page/multiple_regression";
import Jacobi from "./page/jacobi";
import Gauss_seidal from "./page/gauss_seidel";
import { useState } from "react";
import "./index.css";
const queryClient = new QueryClient();
const problemOptions = {
  "Root of Equation": [
    { name: "Graphical Method", path: "/graphical" },
    { name: "Bisection", path: "/bisection" },
    { name: "False Position", path: "/falseposition" },
    { name: "One-point Iteration", path: "/one_point" },
    { name: "Newton-Raphson", path: "/newton-raphson" },
    { name: "Secant Method", path: "/secant" },
  ],
  "Linear Algebra": [
    { name: "Cramer's Rule", path: "/carmer_rule" },
    { name: "Gauss Elimination", path: "/gauss_elimination" },
    { name: "Gauss Jordan", path: "/gauss_jordan" },
    { name: "Matrix Invert", path: "/matrix_invert" },
    { name: "Jacobi", path: "/jacobi" },
    { name: "Gauss Seidel", path: "/gauss_seidel" },
  ],
  "Regression": [
    { name: "Linear Regression", path: "/linear-regression" },
    { name: "Polynomial Regression", path: "/polynomial_regression" },
    { name: "Multiple Regression", path: "/multiple_regression" },
  ],
  "Integration": [
    { name: "Trapezoidal", path: "/trapezoidal" },
    { name: "Composite Trapezoidal", path: "/composite_trap" },
    { name: "Simpson", path: "/simpson" },
    { name: "Composite Simpson", path: "/composite_simpson" },
  ],
  "Differentiation": [
    { name: "Differentiation", path: "/diff" },
  ]
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
            
            <Route path="/graphical" element={<Graphical/>}/>
            <Route path="/bisection" element={<Bisection />} />
            <Route path="/falseposition" element={<Falseposition/>} />
            <Route path="/newton-raphson" element={<Newton/>} />
            <Route path="/secant" element={<Secant/>}/>
            <Route path="/trapezoidal" element={<Trapezoidal/>}/>
            <Route path="/composite_trap" element={<CompositeTrapezoidal/>}/>
            <Route path="/linear-regression" element={<Linear/>}/>
            <Route path="/simpson" element={<Simpson/>}/>
            <Route path="/composite_simpson" element={<CompositeSimpson/>}/>
            <Route path="/one_point" element={<Onepoint/>}/>
            <Route path="/carmer_rule" element={<Carmer/>}/>
            <Route path="/gauss_elimination" element={<Gausseliminate/>}/>
            <Route path="/gauss_jordan" element={<Gaussjordan/>}/>
            <Route path="/matrix_invert" element={<MatrixInvert/>}/>
            <Route path="/diff" element={<Diff/>}/>
            <Route path="/polynomial_regression" element={<PolynomialRegression/>}/>
            <Route path="/multiple_regression" element={<Multiple/>}/>
            <Route path="/jacobi" element={<Jacobi/>}/>
            <Route path="/gauss_seidel" element={<Gauss_seidal/>}/>
          </Routes>
        </Router>
    </QueryClientProvider>
  );
}
export default App;