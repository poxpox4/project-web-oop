import {useState} from "react"
import { Link } from "react-router-dom";
function Navbar() {
  const [openmenu,setMenu] = useState(false);
  const [openmenumobileroot,setOpenmenumobileroot] = useState(false);
  const [openmenumobilelinear,setOpenmenumobilelinear] = useState(false);
  const [openmenumobileintrgration,setOpenmenumobileintegration] = useState(false);
  const [openmenumobileregression,setOpenmenumobileregression] = useState(false);
  const [openmenumobilediff,setOpenmenumobilediff] = useState(false);
  function toggle(){
    setMenu(!openmenu)
  }
  function Clickmenuroot(){
    setOpenmenumobileroot(!openmenumobileroot)
  }
  function Clickmenulinear(){
    setOpenmenumobilelinear(!openmenumobilelinear);
  }
  // function Clickmenuregression(){
  //   setOpenmenumobile(!openmenumobile);
  // }
  function Clickmenuintegration(){
    setOpenmenumobileintegration(!openmenumobileintrgration);
  }
  function Clickmenuregression(){
    setOpenmenumobileregression(!openmenumobileregression);
  }
  function Clickmenudiff(){
    setOpenmenumobilediff(!openmenumobilediff);
  }
  function handleLinkClick() {
    setMenu(false); // ปิดเมนู mobile
    setOpenmenumobileroot(false);
    setOpenmenumobilelinear(false);
    setOpenmenumobileintegration(false);
    setOpenmenumobileregression(false);
    setOpenmenumobilediff(false);
  }
  return (
    <nav className="bg-blue-500 p-4 shadow-lg sticky top-0 z-50 w-full  text-lg">
      <div className="p-3  flex justify-between items-center text-white">
        {/* <div className="text-white text-2xl font-bold">NUMER NICAL</div> */}
        <Link to="/" className=" font-bold text-3xl">Numerical</Link>
        <div className="md:hidden">
          {/*toggle menu*/}
          <button id="menu-toggle" className="text-white" onClick={toggle}>
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" 
            strokeWidth={2} viewBox="0 0 24 24" className="w-6 h-6">
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        <ul className="hidden md:flex space-x-6">
          <li className="relative group">{/* <a href="#" className="text-white" >ROOT OF EQUATION</a> */} 
            <span className="cursor-pointer">Root of equation</span>
          {/*drop down */}
            <ul className="absolute hidden group-hover:block bg-gray-900 top-full left-0 rounded-lg">
              <li className="hover:bg-cyan-400 px-4 rounded-lg">
                <Link to="/graphical" >Graphical Method</Link>
              </li>
              <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg ">
                {/*link to bisection page*/}
                <Link to="/bisection" >Bisection</Link>
              </li>
              <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                {/*link falseposition page */}
                <Link to="/falseposition" >False Position</Link>
              </li>
              <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                  <Link to="/one_point" >One-point iteration</Link>
                </li>
              <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                <Link to="/newton-raphson" >Newton Raphson</Link>
              </li>
              <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                <Link to="/secant" >Secant Method</Link>
              </li>
            </ul>
          </li>
          <li className="relative group">
            <span className="cursor-pointer">Linear algebra equation</span>
            <ul className="absolute hidden group-hover:block bg-gray-900 top-full left-0 rounded-lg">
              <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                <Link to="/carmer_rule" >Carmer's Rule</Link>
              </li>
              <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                  <Link to="/gauss_elimination" className="text-white">Gauss Elimination Method</Link>
              </li>
              <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                  <Link to="/gauss_jordan" className="text-white">Gauss Jordan Method</Link>
              </li>
              <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                  <Link to="/matrix_invert" className="text-white">Matrix Inversion</Link>
              </li>
              <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                  <Link to="/jacobi" className="text-white">Jacobi</Link>
              </li>
              <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                  <Link to="/gauss_seidel" className="text-white">Gauss-Seidel</Link>
                </li>
            </ul>
          </li>
          <li className="relative group">
            <span className="cursor-pointer">Least-Squares Regression</span>
            
            <ul className="absolute hidden group-hover:block bg-gray-900 top-full left-0 rounded-lg">
              <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                <Link to="/linear-regression" >Linear Regression</Link>
              </li>
              <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                  <Link to="/polynomial_regression" className="text-white">Polynomial Regression</Link>
                </li>
              <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                <Link to="/multiple_regression" >Multiple Linear Regression</Link>
              </li>
            </ul>
          </li>
          <li className="relative group">
          <span className="cursor-pointer">Integration</span>
            <ul className="absolute hidden group-hover:block bg-gray-900 top-full right-0 rounded-lg">
              <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                <Link to="/trapezoidal" >Trapezoidal Rule</Link>
              </li>
               <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                <Link to="/composite_trap" >Composite Trapezoidal Rule</Link>
              </li>
              <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                <Link to="/simpson" >Simpson Rule</Link>
              </li>
              <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                <Link to="/composite_simpson" >Composite Simpson Rule</Link>
              </li>
            </ul>
          </li>
          <li className="relative group">
            <span className="cursor-pointer">Differentiation</span>
            <ul className="absolute hidden group-hover:block bg-gray-900 top-full left-0 rounded-lg">
              <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                  <Link to="/diff" className="text-white">Numerical Differentiation</Link>
                </li>
            </ul>
          </li>
        </ul>
      </div>
      {/*แสดงเมนูmobile*/}
        {openmenu ? (
        <ul className="flex flex-col md:flex py-2 text-white space-y-1">
          <li>
            <button onClick={Clickmenuroot} className=" text-left py-2 flex justify-between items-center w-full">
              Root of equation
              <span className={`transform transition-transform duration-300 ${openmenumobileroot ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>
            {openmenumobileroot ? (
              <ul className="bg-gray-900 rounded-lg ">
                <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                  <Link to="/graphical" onClick={handleLinkClick}>Graphical Method</Link>
                </li>
                <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                  <Link to="/bisection" onClick={handleLinkClick}>Bisection</Link>
                </li>
                <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                  <Link to="/falseposition" onClick={handleLinkClick}>False Position</Link>
                </li>
                <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                  <Link to="/one_point" onClick={handleLinkClick}>One-point iteration</Link>
                </li>
                <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                  <Link to="/newton-raphson" onClick={handleLinkClick}>Newton Raphson</Link>
                </li>
                <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                  <Link to="/secant" onClick={handleLinkClick}>Secant Method</Link>
                </li>
              </ul>
            ) : null}
          </li>
          <li>
            <button onClick={Clickmenulinear} className="text-white text-left py-2 flex justify-between items-center w-full">
              Linear algebra equation
              <span className={`transform transition-transform duration-300 ${openmenumobilelinear ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>
            {openmenumobilelinear ? (
              <ul className="bg-gray-900 rounded-lg">
                <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                  <Link to="/carmer_rule" className="text-white" onClick={handleLinkClick}>Carmer Rule</Link>
                </li>
                <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                  <Link to="/gauss_elimination" className="text-white" onClick={handleLinkClick}>Gauss Elimination Method</Link>
                </li>
                <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                  <Link to="/gauss_jordan" className="text-white" onClick={handleLinkClick}>Gauss Jordan Method</Link>
                </li>
                <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                  <Link to="/matrix_invert" className="text-white" onClick={handleLinkClick}>Matrix Inversion</Link>
                </li>
                <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                  <Link to="/jacobi" className="text-white" onClick={handleLinkClick}>Jacobi</Link>
                </li>
                <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                  <Link to="/gauss_seidel" className="text-white" onClick={handleLinkClick}>Gauss-Seidel</Link>
                </li>
              </ul>
            ):null}
          </li>
          <li>
            <button onClick={Clickmenuregression} className="text-white py-2 flex justify-between items-center w-full">
              Least-Squares Regression
              <span className={`transform transition-transform duration-300 ${openmenumobileregression ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>
            {openmenumobileregression ?(
              <ul className="bg-gray-900 rounded-lg">
                <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                  <Link to="/linear-regression" className="text-white" onClick={handleLinkClick}>Linear Regression</Link>
                </li>
                <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                  <Link to="/polynomial_regression" className="text-white" onClick={handleLinkClick}>Polynomial Regression</Link>
                </li>
                <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg" onClick={handleLinkClick}>
                  <Link to="/multiple_regression" onClick={handleLinkClick}>Multiple Linear Regression</Link>
                </li>
              </ul>
            ):null}
          </li>
          <li>
            <button onClick={Clickmenuintegration} className="text-white text-left py-2 flex justify-between items-center w-full">
              Integration
              <span className={`transform transition-transform duration-300 ${openmenumobileintrgration ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>
            {openmenumobileintrgration ? (
              <ul className="bg-gray-900 rounded-lg">
                <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                <Link to="/trapezoidal" className="text-white" onClick={handleLinkClick}>Trapezoidal Rule</Link>
              </li>
               <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                <Link to="/composite_trap" className="text-white" onClick={handleLinkClick}>Composite Trapezoidal Rule</Link>
              </li>
              <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                <Link to="/simpson" className="text-white" onClick={handleLinkClick}>Simpson Rule</Link>
              </li>
              <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                <Link to="/composite_simpson" className="text-white" onClick={handleLinkClick}>Composite Simpson Rule</Link>
              </li>
              </ul>
            ):null}
          </li>
          <li>
            <button onClick={Clickmenudiff} className="text-white text-left py-2 flex justify-between items-center w-full">
              Differentiation
              <span className={`transform transition-transform duration-300 ${openmenumobilediff ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>
            {openmenumobilediff ? (
              <ul className="bg-gray-900 rounded-lg">
                <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                  <Link to="/diff" className="text-white" onClick={handleLinkClick}>Numerical Differentiation</Link>
                </li>
              </ul>
            ):null}
          </li>
          
        </ul>
        ) : null}
    </nav>
  )
}
export default Navbar;
