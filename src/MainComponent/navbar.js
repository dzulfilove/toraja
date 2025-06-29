import React from "react";
import { Link } from "react-router-dom";
import { Globe, Search } from "lucide-react"; // pastikan kamu install lucide-react
import icon from "../assets/icon.png";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={icon}
            alt="Wonderful Indonesia Logo"
            className="h-16 w-16"
          />
        </Link>

        {/* Menu */}
        <ul className="hidden md:flex space-x-8 text-white font-medium text-md mr-12">
          <li>
            <Link to="/" className="hover:text-toraja-kuning">
              Home
            </Link>
          </li>
          <li>
            <Link to="/sejarah" className="hover:text-toraja-kuning">
              Sejarah & Asal Usul
            </Link>
          </li>
          <li>
            <Link to="/tarian" className="hover:text-toraja-kuning">
              Tarian Khas
            </Link>
          </li>
          <li>
            <Link to="/makanan" className="hover:text-toraja-kuning">
              Makanan Khas
            </Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-toraja-kuning">
              Login
            </Link>
          </li>
        </ul>
        {/* Language & Search */}
       
      </div>
    </nav>
  );
};

export default Navbar;
