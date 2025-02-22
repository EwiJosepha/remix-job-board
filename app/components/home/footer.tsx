import { Link } from "@remix-run/react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
        <div>
          <h2 className="text-lg font-bold">JobBoard Pro</h2>
          <p className="text-gray-400 mt-2">
            Helping you find your dream job with ease.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li><Link to="/jobs" className="text-gray-400 hover:text-white">Browse Jobs</Link></li>
            <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
            <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
            <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <Link to="#" className="text-gray-400 hover:text-white"><i className="ri-facebook-line"></i></Link>
            <Link to="#" className="text-gray-400 hover:text-white"><i className="ri-twitter-x-line"></i></Link>
            <Link to="#" className="text-gray-400 hover:text-white"><i className="ri-linkedin-line"></i></Link>
            <Link to="#" className="text-gray-400 hover:text-white"><i className="ri-instagram-line"></i></Link>
          </div>
          <h3 className="text-lg font-bold mt-4">Stay Updated</h3>
          <form className="mt-2 flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 text-gray-900 rounded-l w-full outline-none"
            />
            <button className="bg-blue-500 px-4 py-2 text-white rounded-r hover:bg-blue-600">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-6 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} JobBoard Pro. All rights reserved.
      </div>
    </footer>
  );
}
