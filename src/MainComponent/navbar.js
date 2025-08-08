import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import icon from "../assets/icon.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={icon} alt="Wonderful Indonesia Logo" className="h-16 w-16" />
        </Link>

        {/* Menu Desktop */}
        <ul className="hidden md:flex space-x-8 text-white font-medium text-md mr-12">
          <li><Link to="/" className="hover:text-toraja-kuning">Home</Link></li>
          <li><Link to="/sejarah" className="hover:text-toraja-kuning">Sejarah & Asal Usul</Link></li>
          <li><Link to="/tarian" className="hover:text-toraja-kuning">Tarian Khas</Link></li>
          <li><Link to="/makanan" className="hover:text-toraja-kuning">Makanan Khas</Link></li>
          <li><Link to="/wisata" className="hover:text-toraja-kuning">Wisata</Link></li>
          <li><Link to="/faq" className="hover:text-toraja-kuning">FAQ</Link></li>
          <li><Link to="/login" className="hover:text-toraja-kuning">Login</Link></li>
        </ul>

        {/* Burger Menu Button */}
        <button className="md:hidden text-white" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Mobile Menu - Slide from Right */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-black/90 text-white z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu}>
            <X size={28} />
          </button>
        </div>
        <ul className="flex flex-col space-y-6 p-6 font-medium">
          <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/sejarah" onClick={toggleMenu}>Sejarah & Asal Usul</Link></li>
          <li><Link to="/tarian" onClick={toggleMenu}>Tarian Khas</Link></li>
          <li><Link to="/makanan" onClick={toggleMenu}>Makanan Khas</Link></li>
          <li><Link to="/wisata" onClick={toggleMenu}>Wisata</Link></li>
          <li><Link to="/faq" onClick={toggleMenu}>FAQ</Link></li>
          <li><Link to="/login" onClick={toggleMenu}>Login</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
