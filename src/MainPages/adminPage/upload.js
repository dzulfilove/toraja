import { useState } from "react";
import API from "../../config/api";

export default function UploadImage() {
  const [file, setFile] = useState(null);
  const [id, setId] = useState("");

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", file); // key 'image' harus sama dengan upload.single("image")

      await API.put(`/history/image/${id}`, formData);
      alert("Upload berhasil!");
    } catch (err) {
      console.error(err);
      alert("Upload gagal!");
    }
  };

  return (
    <div className="mt-[20rem]">
      <h3>Upload / Update Image</h3>
      <input
        placeholder="Masukkan id image_history"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={upload}>Upload</button>
    </div>
  );
}
