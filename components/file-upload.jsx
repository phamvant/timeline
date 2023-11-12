"use client";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import "../components/InputForm/InputForm.css";

export const FileUpload = ({ endpoint, value, onChange }) => {
  const fileType = value?.split(".").pop();

  if (value) {
    return (
      <div className="wrapper_form">
        <img
          src={value}
          style={{ maxWidth: "100%", borderRadius: "20px" }}
          alt="Uploaded"
        />
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error) => {
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
};

export default FileUpload;
