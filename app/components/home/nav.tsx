import { Link } from "@remix-run/react";
import { useState } from "react";
import { Button } from "../ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          JobBoard Pro
        </Link>
        <div className="hidden md:flex gap-6">
          <Link to="/all-jobs" className="text-gray-700 hover:text-blue-600">
            Jobs
          </Link>
          <Link to="/companies" className="text-gray-700 hover:text-blue-600">
            Companies
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600">
            About
          </Link>
        </div>
        <div className="hidden md:flex gap-4">
          <Button variant="outline"><Link to='/sign-in'>Login</Link></Button>
          <Button><Link to='/sign-in'>Sign Up</Link></Button>
        </div>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        <i className="ri-menu-line text-3xl"></i>
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white shadow-md absolute w-full left-0 p-4 flex flex-col gap-4">
          <Link to="/jobs" className="text-gray-700 hover:text-blue-600">
            Jobs
          </Link>
          <Link to="/companies" className="text-gray-700 hover:text-blue-600">
            Companies
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600">
            About
          </Link>
          <Button variant="outline">Login</Button>
          <Button><Link to='/sign-up'></Link>Sign Up</Button>
        </div>
      )}
    </nav>
  );
}