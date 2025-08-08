// src/components/FAQList.jsx
import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import HeaderList from "../MainComponent/listComponent/headerList";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import API from "../config/api";

const FAQList = () => {
  const [openId, setOpenId] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const toggleAnswer = (id) => {
    setOpenId(openId === id ? null : id);
  };

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
      setShowForm(false);
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

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await API.get("/question", {
        params: {
          status: undefined,
          page: 1,
          limit: 100,
        },
      });
      console.log(res.data);
      setQuestions(res.data.data);
      setError("");
    } catch (err) {
      console.error("[GET QUESTIONS ERROR]", err);
      setError("Gagal memuat data pertanyaan.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory">
      <HeaderList
        title="Pertanyaan dan Jawaban"
        image="https://i.pinimg.com/1200x/1d/3f/60/1d3f60d5b1ae11bfc8aa92f769bfe95a.jpg"
      />
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-5xl mx-auto mt-10 bg-gray-100 border border-toraja-merah rounded-xl shadow-md overflow-hidden p-6 mb-8"
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-toraja-merah mb-2">
                  Punya Pertanyaan?
                </h3>
                <p className="text-toraja-merah text-sm">
                  Kirim pertanyaan Anda tentang website kami dan kami akan
                  segera membalas
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
                    className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
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
                      : "bg-toraja-merah text-white hover:bg-transparent hover:bg-white hover:border-toraja-merah hover:text-toraja-merah border border-white active:scale-95"
                  }`}
                >
                  {isSubmitting ? "Mengirim..." : "Kirim Pertanyaan"}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="max-w-5xl mx-auto mt-10 bg-gray-100 p-6 rounded-2xl shadow-lg">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-toraja-merah">FAQ</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-toraja-merah text-white px-4 py-2 rounded-full hover:bg-toraja-merah transition"
            >
              Punya Pertanyaan?
            </button>
          </div>

          {questions.map((q) => (
            <div
              key={q.id}
              className={`mb-4 p-4 rounded-xl shadow-sm transition-all duration-300 ${
                openId === q.id
                  ? "bg-white border border-toraja-merah"
                  : "bg-white"
              }`}
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleAnswer(q.id)}
              >
                <h2
                  className={`font-semibold transition-all ${
                    openId === q.id ? "text-toraja-merah" : "text-gray-800"
                  }`}
                >
                  {q.question}
                </h2>
                {openId === q.id ? (
                  <FaChevronUp className="text-toraja-merah" />
                ) : (
                  <FaChevronDown className="text-toraja-merah" />
                )}
              </div>

              {/* Animated Answer */}
              <AnimatePresence>
                {openId === q.id && (
                  <motion.div
                    key="answer"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-3 text-sm text-gray-600"
                  >
                    {q.answer?q.answer:"Belum Terjawab"}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default FAQList;
