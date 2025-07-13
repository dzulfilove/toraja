import React, { useState } from "react";
import API from "../config/api";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Login() {
  const [step, setStep] = useState("login"); // 'login' | 'requestToken' | 'reset'
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      alert("Login berhasil");
      navigate(`/admin`);
      // window.location.reload();

      // TODO: navigate ke dashboard
    } catch (err) {
      alert("Login failed");
    }
  };

  const getToken = async () => {
    try {
      const res = await API.post("/auth/forgot-password", { username });
      setStep("reset");
      alert(
        "Reset token dikirim ke Telegram. Cek Telegram & masukkan di bawah."
      );
    } catch (err) {
      alert("Gagal mengirim reset token");
    }
  };

  const handleReset = async () => {
    try {
      await API.post("/auth/reset-password", {
        token: resetToken,
        newPassword,
      });
      alert("Password berhasil direset. Silakan login lagi.");
      setStep("login");
    } catch (err) {
      alert("Reset password gagal");
    }
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(https://res.cloudinary.com/diipdl14x/image/upload/v1751188952/pxoqhdsvzooxu7cngspx.jpg)`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/100 to-transparent z-10"></div>

      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-20 w-full max-w-md p-8 space-y-8 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center text-[#F5F5DC]">
          BUDAYA TORAJA
        </h2>

        {step === "login" && (
          <>
            <p className="text-center text-[#F5F5DC]/80">
              Isi Username & Password untuk Masuk
            </p>
            <div className="space-y-4">
              <input
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 text-[#F5F5DC] placeholder-white/70 bg-white/10 border border-[#F5F5DC]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm backdrop-blur-sm"
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 text-[#F5F5DC] placeholder-white/70 bg-white/10 border border-[#F5F5DC]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm backdrop-blur-sm"
              />
              <button
                onClick={handleLogin}
                className="inline-block w-full cursor-pointer rounded-xl border-[1.58px] border-zinc-600 bg-[#8B0000] px-5 py-3 font-medium text-[#F5F5DC] shadow-md transition-all duration-300 hover:translate-y-[-0.335rem] hover:shadow-xl"
              >
                Login
              </button>
              <button
                onClick={() => setStep("requestToken")}
                className="text-sm text-[#FFD700] hover:underline"
              >
                Lupa password?
              </button>
            </div>
          </>
        )}

        {step === "requestToken" && (
          <>
            <p className="text-center text-[#F5F5DC]/80">
              Masukkan Username untuk Kirim Reset Token
            </p>
            <div className="space-y-4">
              <input
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 text-[#F5F5DC] placeholder-white/70 bg-white/10 border border-[#F5F5DC]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm backdrop-blur-sm"
              />
              <button
                onClick={getToken}
                className="inline-block w-full cursor-pointer rounded-xl border-[1.58px] border-zinc-600 bg-[#8B0000] px-5 py-3 font-medium text-[#F5F5DC] shadow-md transition-all duration-300 hover:translate-y-[-0.335rem] hover:shadow-xl"
              >
                Kirim Reset Token
              </button>
              <button
                onClick={() => setStep("login")}
                className="text-sm text-[#FFD700] hover:underline"
              >
                Kembali ke Login
              </button>
            </div>
          </>
        )}

        {step === "reset" && (
          <>
            <p className="text-center text-[#F5F5DC]/80">
              Masukkan Token & Password Baru
            </p>
            <div className="space-y-4">
              <input
                placeholder="Reset Token"
                onChange={(e) => setResetToken(e.target.value)}
                className="w-full px-3 py-2 text-[#F5F5DC] placeholder-white/70 bg-white/10 border border-[#F5F5DC]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm backdrop-blur-sm"
              />
              <input
                type="password"
                placeholder="Password Baru"
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 text-[#F5F5DC] placeholder-white/70 bg-white/10 border border-[#F5F5DC]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm backdrop-blur-sm"
              />
              <button
                onClick={handleReset}
                className="inline-block w-full cursor-pointer rounded-xl border-[1.58px] border-zinc-600 bg-[#8B0000] px-5 py-3 font-medium text-[#F5F5DC] shadow-md transition-all duration-300 hover:translate-y-[-0.335rem] hover:shadow-xl"
              >
                Reset Password
              </button>
              <button
                onClick={() => setStep("login")}
                className="text-sm text-[#FFD700] hover:underline"
              >
                Kembali ke Login
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default Login;
