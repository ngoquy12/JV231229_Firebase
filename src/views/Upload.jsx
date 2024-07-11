import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { storage } from "../uploads/firebase.config";

export default function Upload() {
  const [filePrev, setFilePrev] = useState("");
  const [file, setFile] = useState("");
  const [uploadProcess, setUploadProcess] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState("");

  console.log(downloadUrl);

  const handleChangeFile = (e) => {
    const selectedFile = e.target.files[0]; // Lấy dữ liệu từ input

    setFile(selectedFile); // Lấy thông tin từ input

    const urlPrev = URL.createObjectURL(selectedFile);

    // Cập nhật lại đường dẫn prev cho hình ảnh
    setFilePrev(urlPrev);
  };

  const handleUpload = () => {
    if (!file) {
      return;
    }

    // Lưu trữ dữ liệu lên firebase

    // 1. Xác định vị trí mà chúng ta cần lưu trên firebase
    const storageRef = ref(storage, file.name);

    // Tạo tiến trình cho mỗi hành động upload
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshort) => {
        const process =
          (snapshort.bytesTransferred / snapshort.totalBytes) * 100; // Tính toán tiến trình thực hiện upload
        setUploadProcess(process);
      },
      (error) => {
        console.log("Đã có lỗi: ", error);
      },
      () => {
        // Lấy url về
        getDownloadURL(uploadTask.snapshot.ref)
          .then((response) => setDownloadUrl(response))
          .catch((error) => {
            console.log("error: ", error);
          });
      }
    );
  };

  return (
    <div>
      <img height={400} width={600} src={filePrev} alt="" />
      <input onChange={handleChangeFile} type="file" name="" id="" />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
