import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { uploadNewProductImage } from "../utils/handleSupabaseImage";

const ImageUploader = ({ onFileUpload }) => {
  const baseUrl = import.meta.env.VITE_SUPABASE_BUCKET_URL;
  const bucketFolder = "/public/";
  const uploadIcon = `${baseUrl}${bucketFolder}upload.png`;
  const [dragging, setDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true);
      const image = await uploadNewProductImage(file);
      setIsUploading(false);

      // Call the parent's callback function and pass the file name
      if (onFileUpload && image) {
        onFileUpload(image); // Pass the image name to the parent
      }
    }
  };

  return (
    <div
      style={{
        border: dragging
          ? "1px solid var(--upload-border-gray)"
          : "1px solid var(--upload-border-gray)",
        borderRadius: "4px",
        width: "240px",
        height: "92px",
        padding: "8px",
        backgroundColor: dragging
          ? "var(--category-bg-gray)"
          : "var(--category-bg-gray)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        position: "relative",
      }}
    >
      <img
        src={uploadIcon}
        alt="preview"
        style={{
          width: "32px",
          height: "32px",
          objectFit: "cover",
        }}
      />

      <img size={32} color={dragging ? "#007bff" : "#888"} />
      <span
        style={{
          display: "inline-block",
          textAlign: "center",

          color: "#555",
          fontFamily: "Inter",
          fontWeight: "bold",
          fontSize: "14px",
          color: "var(--upload-text-gray)",
        }}
      >
        Dra och släpp bilder här eller tryck för att bläddra lokalt
      </span>

      <Form.Control
        type="file"
        id="file-input"
        accept="image/*"
        onChange={handleImageUpload}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0,
          cursor: "pointer",
        }}
      />
    </div>
  );
};

export default ImageUploader;
