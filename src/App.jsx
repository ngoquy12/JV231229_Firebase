import React from "react";
import Upload from "./views/Upload";
import UploadWithCloud from "./views/UploadWithCloud";

export default function App() {
  console.log(import.meta.env.VITE_API_KEY);
  console.log(import.meta.env.VITE_AUTH_DOMAIN);
  return (
    <div>
      {/* <Upload /> */}
      <UploadWithCloud />
    </div>
  );
}
