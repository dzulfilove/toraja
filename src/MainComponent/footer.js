import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 md:px-8 h-full flex items-center font-montserrat">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Kolom 1: Our Websites */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Our Websites</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <ul className="space-y-3">
                <li className="font-medium hover:text-blue-400 cursor-pointer transition">
                  Yacht
                </li>
                <li className="font-medium hover:text-blue-400 cursor-pointer transition">
                  Cruise
                </li>
              </ul>
            </div>
            <div>
              <ul className="space-y-3">
                <li className="hover:text-blue-400 cursor-pointer transition">
                  About Us
                </li>
                <li className="hover:text-blue-400 cursor-pointer transition">
                  Privacy Policy
                </li>
                <li className="hover:text-blue-400 cursor-pointer transition">
                  Terms & Conditions
                </li>
                <li className="hover:text-blue-400 cursor-pointer transition">
                  Cookie Policy
                </li>
                <li className="hover:text-blue-400 cursor-pointer transition">
                  Contact Us
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Kolom 2: Informations */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Informations</h3>
          <div>
            <h4 className="font-semibold mb-3">Social Media</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400 transition">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                <FaYoutube size={20} />
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                <FaTiktok size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Kolom 3: Newsletter */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Stay Updated</h3>
          <p className="mb-4">
            Subscribe to our newsletter for the latest updates
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2 rounded-l-md text-gray-900 w-full focus:outline-none"
            />
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="container mx-auto mt-12 pt-6 border-t border-gray-700 text-center text-gray-400">
        <p>
          © {new Date().getFullYear()} Toraja Cultural Heritage. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
