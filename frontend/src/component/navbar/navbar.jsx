import {useState} from "react"
import { Link } from "react-router-dom";
function Navbar() {
  const [openmenu,setMenu] = useState(false);
  const [openmenumobileroot,setOpenmenumobileroot] = useState(false);
  function toggle(){
    setMenu(!openmenu)
  }
  function Clickmenuroot(){
    setOpenmenumobileroot(!openmenumobileroot)
  }
  function handleLinkClick() {
    setMenu(false); // ปิดเมนู mobile
    setOpenmenumobileroot(false);
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
                  <Link to="/bisection" onClick={handleLinkClick}>Bisection</Link>
                </li>
                <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                  <Link to="/falseposition" onClick={handleLinkClick}>False Position</Link>
                </li>
                <li className="hover:bg-cyan-400 px-4 py-2 rounded-lg">
                  <Link to="/one_point" onClick={handleLinkClick}>One-point iteration</Link>
                </li>
              </ul>
            ) : null}
          </li>
        </ul>
        ) : null}
    </nav>
  )
}
export default Navbar;
