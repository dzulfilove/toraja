
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // style default

const RichTextEditor = ({ value, onChange }) => {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      placeholder="Tulis deskripsi..."
      className="bg-white rounded shadow"
    />
  );
};

export default RichTextEditor;
