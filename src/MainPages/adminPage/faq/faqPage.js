// src/components/FAQList.jsx
import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import API from "../../../config/api";
import { FaInbox } from "react-icons/fa"; // Tambahkan import
import { LuCopy } from "react-icons/lu";
import { TbMailShare } from "react-icons/tb";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FiSave } from "react-icons/fi";
const FAQPage = () => {
  const [openId, setOpenId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [answerInputs, setAnswerInputs] = useState({});
  const [submittingAnswerId, setSubmittingAnswerId] = useState(null);

  const [filter, setFilter] = useState("all");
  const unansweredCount = questions.filter((q) => !q.answer).length;

  const filteredQuestions = [...questions]
    .sort((a, b) => {
      // Belum terjawab (null/empty) akan naik ke atas
      if (!a.answer && b.answer) return -1;
      if (a.answer && !b.answer) return 1;
      return 0;
    })
    .filter((q) => {
      if (filter === "unanswered") return !q.answer;
      if (filter === "answered") return q.answer;
      return true;
    });

  const toggleAnswer = (id) => {
    setOpenId(openId === id ? null : id);
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
      setQuestions(res.data.data);
      setError("");
    } catch (err) {
      console.error("[GET QUESTIONS ERROR]", err);
      setError("Gagal memuat data pertanyaan.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (id, value) => {
    setAnswerInputs((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleAnswerSubmit = async (id) => {
    const answer = answerInputs[id];
    if (!answer || answer.trim() === "") {
      Swal.fire("Gagal", "Jawaban tidak boleh kosong", "warning");
      return;
    }

    try {
      setSubmittingAnswerId(id);
      const res = await API.put(`/question/${id}`, {
        answer,
        status: "answered", // atau apa pun status yang kamu pakai
      });

      Swal.fire("Berhasil", "Jawaban berhasil dikirim", "success");

      // Refresh pertanyaan
      await fetchQuestions();
      setOpenId(null);
    } catch (err) {
      console.error("[UPDATE QUESTION ERROR]", err);
      Swal.fire("Gagal", "Gagal mengirim jawaban", "error");
    } finally {
      setSubmittingAnswerId(null);
    }
  };

  const handleUpdateSend = (id) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q.id === id ? { ...q, is_send: true } : q))
    );
  };

  const handleUpdateClose = (id) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q.id === id ? { ...q, is_send: false } : q))
    );
  };
  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-5xl mx-auto mt-10 bg-gray-100 p-6 rounded-2xl shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <h1 className="text-xl font-bold text-toraja-merah">FAQ</h1>

            {/* Inbox Icon with Badge */}
            <div className="flex items-center gap-2">
              <FaInbox className="text-red-500 text-base" />
              <span className="text-red-600 font-semibold">
                {unansweredCount} belum dijawab
              </span>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 mb-6">
            {[
              { label: "Semua", value: "all" },
              { label: "Belum Terjawab", value: "unanswered" },
              { label: "Sudah Terjawab", value: "answered" },
            ].map((btn) => (
              <button
                key={btn.value}
                onClick={() => setFilter(btn.value)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                  filter === btn.value
                    ? "bg-toraja-merah text-white"
                    : "bg-white text-toraja-merah border border-toraja-merah"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {filteredQuestions.map((q) => (
            <div
              key={q.id}
              className={`mb-4 p-4 rounded-xl shadow-sm transition-all text-sm duration-300 h-auto ${
                openId === q.id ? "border border-toraja-merah" : ""
              } ${!q.answer ? "bg-red-100" : "bg-white"}`}
            >
              <div
                className="flex flex-col justify-between items-start cursor-pointer w-full"
                onClick={() => toggleAnswer(q.id)}
              >
                <h2
                  className={`font-semibold transition-all ${
                    openId === q.id
                      ? "text-toraja-merah"
                      : !q.answer
                      ? "text-red-600"
                      : "text-gray-800"
                  }`}
                >
                  {q.email}
                </h2>
                <div
                  className="flex w-full justify-between items-center cursor-pointer mt-2"
                  onClick={() => toggleAnswer(q.id)}
                >
                  <h3
                    className={`font-semibold transition-all text-xl ${
                      openId === q.id
                        ? "text-toraja-merah"
                        : !q.answer
                        ? "text-red-600"
                        : "text-gray-800"
                    }`}
                  >
                    {q.question}
                  </h3>

                  {openId === q.id ? (
                    <FaChevronUp className="text-toraja-merah" />
                  ) : (
                    <FaChevronDown className="text-toraja-merah" />
                  )}
                </div>
              </div>

              {/* Animated Answer Form */}
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
                    {!q.is_send ? (
                      <>
                        <textarea
                          className="w-full p-3 border rounded-md mb-3"
                          placeholder="Tulis jawaban di sini..."
                          rows={4}
                          value={q.answer || ""}
                          onChange={(e) =>
                            handleAnswerChange(q.id, e.target.value)
                          }
                        />
                        <div className="flex justify-start gap-4 items-center w-full">
                          <button
                            className="bg-toraja-merah text-white px-4 py-2 rounded hover:bg-white hover:text-toraja-merah transition-all border border-toraja-merah"
                            onClick={() => handleAnswerSubmit(q.id)}
                            disabled={submittingAnswerId === q.id}
                          >
                            <div className="flex items-center gap-4">
                              <p className=" text-sm">
                                {" "}
                                {submittingAnswerId === q.id
                                  ? "Menyimpan..."
                                  : "Simpan Jawaban"}
                              </p>
                              <FiSave className="text-xl " />
                            </div>
                          </button>
                          {q.answer && (
                            <a
                              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${
                                q.email
                              }&su=${encodeURIComponent(
                                "Balasan Resmi dari Tim Toraja Budaya atas Pertanyaan Anda"
                              )}&body=${encodeURIComponent(q.answer)}`}
                              className="bg-toraja-merah text-white px-4 py-2 rounded hover:bg-white hover:text-toraja-merah transition-all border border-toraja-merah"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <div className="flex items-center gap-4">
                                <p className="text-sm">Kirim Ke Email</p>
                                <TbMailShare className="text-xl" />
                              </div>
                            </a>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="mb-3 h-auto">
                          <label className="font-medium text-gray-700 block mb-1">
                            Subject:
                          </label>
                          <div className="flex items-center gap-2">
                            <div className="bg-gray-100 p-2 rounded w-full">{`Menjawab pertanyaan Anda`}</div>
                            <button
                              onClick={() =>
                                navigator.clipboard.writeText(
                                  "Menjawab pertanyaan Anda"
                                )
                              }
                              className=" bg-red-200 p-4 rounded-xl"
                            >
                              <LuCopy className="text-toraja-merah text-xl font-bold" />
                            </button>
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="font-medium text-gray-700 block mb-1">
                            Isi Jawaban:
                          </label>
                          <div className="flex items-center gap-2">
                            <div className="bg-gray-100 p-2 rounded w-full whitespace-pre-line">
                              {q.answer}
                            </div>
                            <button
                              onClick={() =>
                                navigator.clipboard.writeText(q.answer)
                              }
                              className=" bg-red-200 p-4 rounded-xl"
                            >
                              <LuCopy className="text-toraja-merah text-xl font-bold" />
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-start gap-4 items-center w-full">
                          <a
                            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${
                              q.email
                            }&su=${encodeURIComponent(
                              "Balasan Resmi dari Tim Toraja Budaya atas Pertanyaan Anda"
                            )}&body=${encodeURIComponent(q.answer)}`}
                            className="bg-toraja-merah text-white px-4 py-2 rounded hover:bg-white hover:text-toraja-merah transition-all border border-toraja-merah"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <div className="flex items-center gap-4">
                              <p className=" text-sm">Kirim Email</p>
                              <TbMailShare className="text-xl " />
                            </div>
                          </a>
                          <button
                            className="bg-toraja-merah text-white px-4 py-2 rounded hover:bg-white hover:text-toraja-merah transition-all border border-toraja-merah"
                            onClick={() => handleUpdateClose(q.id)}
                            disabled={submittingAnswerId === q.id}
                          >
                            <div className="flex items-center gap-4">
                              <p className=" text-sm">Tutup</p>
                              <IoMdCloseCircleOutline className="text-xl " />
                            </div>
                          </button>
                        </div>
                      </>
                    )}
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

export default FAQPage;
