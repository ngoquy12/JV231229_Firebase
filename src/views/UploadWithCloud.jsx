import axios from "axios";
import React, { useState } from "react";

export default function UploadWithCloud() {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file); // Dữ liệu từ form
    formData.append("upload_preset", "jv231229");

    // Gọi API
    try {
      const response = await axios.post(
        import.meta.env.VITE_BASE_URL_CLOUD,
        formData
      );

      console.log(response.data.url);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  return (
    <div>
      <input onChange={handleChange} type="file" name="" id="" />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
