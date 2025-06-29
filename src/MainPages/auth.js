import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/button.css";
import Wave from "../utils/wave";
import loginBg from "../assets/login.jpg";
import { motion } from "framer-motion";

function Login() {
  const [email, setEmail] = useState("");
  const [isLogin, setisLogin] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      {/* Overlay gradasi kiri ke kanan */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/100 to-transparent z-10"></div>

      {/* Card login di tengah dengan efek glass */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-20 w-full max-w-md p-8 space-y-8 
             bg-white/10 backdrop-blur-md 
             rounded-lg border border-white/20 shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center text-[#F5F5DC]">
          BUDAYA TORAJA
        </h2>

        {isLogin ? (
          <p className="text-center text-[#F5F5DC]/80">
            Kirim Permintaan Password
          </p>
        ) : (
          <p className="text-center text-[#F5F5DC]/80">
            Selamat Datang Mohon Isi Username dan Password Untuk Masuk
          </p>
        )}

        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm">
            <input
              name="email"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-[#F5F5DC] placeholder-white/70 bg-white/10 border border-[#F5F5DC]/30 rounded-t-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 sm:text-sm backdrop-blur-sm"
              placeholder="Email"
            />
            {!isLogin && (
              <input
                name="password"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full px-3 py-2 text-[#F5F5DC] placeholder-white/70 bg-white/10 border border-[#F5F5DC]/30 rounded-b-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 sm:text-sm backdrop-blur-sm"
                placeholder="Password"
              />
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <button
              onClick={() => setisLogin(!isLogin)}
              className="font-medium text-[#FFD700] hover:text-[#FFD700]"
            >
              {isLogin ? "Sign In Again" : "Forgot your password?"}
            </button>
          </div>

          <div className="w-full flex justify-center">
            {/* Gunakan tombol kamu seperti biasa */}
            {isLogin ? (
              <button className="button-forget">
                <span>Kirim</span>
              </button>
            ) : (
              <button class="inline-block w-60 cursor-pointer items-center justify-center rounded-xl border-[1.58px] border-zinc-600 bg-[#8B0000] px-5 py-3 font-medium text-[#F5F5DC] shadow-md transition-all duration-300 hover:[transform:translateY(-.335rem)] hover:shadow-xl">
                Masuk
                {/* <span class="text-slate-300/85"> ─ simple button</span> */}
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* <Wave /> */}
    </div>
  );
}

export default Login;
