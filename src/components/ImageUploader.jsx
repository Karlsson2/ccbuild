import React from "react";
import { Form } from "react-bootstrap";
import { uploadNewProductImage } from "../utils/handleSupabaseImage";

const ImageUploader = ({ onFileUpload }) => {
  const baseUrl = import.meta.env.VITE_SUPABASE_BUCKET_URL;
  const bucketFolder = "/public/";
  const uploadIcon = `${baseUrl}${bucketFolder}upload.png`;

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const image = await uploadNewProductImage(file);

      // Call the parent's callback function and pass the file name
      if (onFileUpload && image) {
        onFileUpload(image); // Pass the image name to the parent
      }
    }
  };

  return (
    <div
      style={{
        border: "1px solid var(--upload-border-gray)",
        borderRadius: "4px",
        width: "240px",
        height: "92px",
        padding: "8px",
        backgroundColor: "var(--category-bg-gray)",
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

      <img size={32} color={"#888"} />
      <span
        style={{
          display: "inline-block",
          textAlign: "center",
          fontFamily: "Inter",
          fontWeight: "bold",
          fontSize: "14px",
          color: "var(--upload-text-gray)",
        }}
      >
        Dra och släpp en bild här eller tryck för att bläddra lokalt
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
