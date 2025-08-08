import axios from "axios";
import React, { useState } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import Swal from "sweetalert2";
import API from "../config/api";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const response = await API.post("/question", {
        email,
        question,
      });

      Swal.fire({
        icon: "success",
        title: "Pertanyaan berhasil dikirim!",
        html: `
          <p class="mt-2">Jawaban akan dikirim ke email <strong>${response.data.email}</strong></p>
        `,
      });

      setEmail("");
      setQuestion("");
      setIsSubmitting(false);
    } catch (err) {
      console.error("[FRONTEND ERROR]", err);
      setIsSubmitting(false);

      Swal.fire({
        icon: "error",
        title: "Gagal mengirim pertanyaan",
        text:
          err.response?.data?.message ||
          "Terjadi kesalahan. Silakan coba lagi nanti.",
      });
    }
  };
  return (
    <footer className="bg-gray-900 text-white py-32 px-4 md:px-8 h-full gap-8 flex justify-start items-center  font-montserrat">
      <div className="w-full mx-auto bg-transparent border border-white  rounded-xl shadow-md overflow-hidden p-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold text-white mb-2">
            Punya Pertanyaan?
          </h3>
          <p className="text-white text-sm">
            Kirim pertanyaan Anda tentang website kami dan kami akan segera
            membalas
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@contoh.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
            />
          </div>

          <div className="space-y-1">
            <textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Tulis pertanyaan Anda di sini..."
              rows="4"
              className="w-full px-4 py-2 border text-gray-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-y"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 rounded-lg font-medium text-white transition-all ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-toraja-merah hover:bg-transparent border border-toraja-merah hover:border-white active:scale-95"
            }`}
          >
            {isSubmitting ? "Mengirim..." : "Kirim Pertanyaan"}
          </button>
        </form>
      </div>

      <div className=" w-full flex flex-col justify-start items-start ">
        <div className="container flex flex-row justify-center  gap-8">
          {/* Kolom 2: Informations */}
          <div className="flex-1">
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
          <div className="flex-1">
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
      </div>
    </footer>
  );
};

export default Footer;
