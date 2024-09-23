import React, { useState } from "react";
import { Button, Form, Col, Row, Image } from "react-bootstrap";
import { uploadProductImagWithReturn } from "../utils/handleSupabaseImage";

const EditProduct = ({ product, noImageUrl, onSave, onCancel }) => {
  const [productName, setProductName] = useState(product.product_name);
  const [ownId, setOwnId] = useState(product.own_id);
  const [description, setDescription] = useState(product.description);
  const [imageUrls, setImageUrls] = useState([
    product.image_url1 || noImageUrl,
    product.image_url2 || noImageUrl,
    product.image_url3 || noImageUrl,
  ]);
  const [imageFiles, setImageFiles] = useState([null, null, null]); // To hold selected files

  const handleFileChange = (index, file) => {
    const updatedFiles = [...imageFiles];
    updatedFiles[index] = file;
    setImageFiles(updatedFiles);

    // Update the imageUrls to show the selected image
    const newImageUrl = file ? URL.createObjectURL(file) : noImageUrl;
    const updatedUrls = [...imageUrls];
    updatedUrls[index] = newImageUrl;
    setImageUrls(updatedUrls);
  };

  const handleSave = async () => {
    // Handle image uploads
    const newImageUrls = await Promise.all(
      imageFiles.map(async (file, index) => {
        if (file) {
          const fileUrl = await uploadProductImagWithReturn(file);
          return fileUrl;
        }
        return imageUrls[index]; // Use existing URL if no new file
      })
    );

    const updatedProduct = {
      ...product,
      product_name: productName,
      own_id: ownId,
      description,
      image_url1: newImageUrls[0],
      image_url2: newImageUrls[1],
      image_url3: newImageUrls[2],
    };
    onSave(updatedProduct); // Pass the updated product back to the parent
  };

  return (
    <Form>
      <Row className="mt-3 mb-3">
        <Col sm={3}>
          <Form.Group controlId="productName">
            <Form.Label>Produktnamn</Form.Label>
            <Form.Control
              type="text"
              value={productName || "Ej Angivet"}
              onChange={(e) => setProductName(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col sm={3}>
          <Form.Group controlId="ownId">
            <Form.Label>Eget Id-nummer</Form.Label>
            <Form.Control
              type="text"
              value={ownId || "Ej Angivet"}
              onChange={(e) => setOwnId(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mt-3 mb-3">
        <Col sm={6}>
          <Form.Group controlId="description">
            <Form.Label>Produktbeskrivning</Form.Label>
            <Form.Control
              as="textarea"
              value={description || "Ej Angivet"}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <strong>Produktbilder</strong>
          <Row className="mt-3 mb-3">
            <Col className="d-flex flex-column flex-sm-row gap-3">
              {imageUrls.map((url, index) => (
                <Form.Group
                  controlId={`imageUrl${index}`}
                  key={index}
                  style={{ textAlign: "center" }}
                >
                  <Form.Label>
                    {index === 0 ? <p>Huvudbild</p> : <p>Bild {index + 1}</p>}
                  </Form.Label>
                  <div
                    onClick={() =>
                      document.getElementById(`fileInput${index}`).click()
                    }
                    style={{
                      border: "2px dashed #ccc",
                      borderRadius: "5px",
                      padding: "2px",
                      cursor: "pointer",
                      width: "100px",
                      height: "100px",
                    }}
                  >
                    <Image
                      fluid
                      src={url}
                      alt={`Bild ${index + 1}`}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                  <Form.Control
                    id={`fileInput${index}`}
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => handleFileChange(index, e.target.files[0])}
                  />
                </Form.Group>
              ))}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="mt-3 mb-3">
        <Col className="gap-3 d-flex">
          <Button variant="primary" onClick={handleSave}>
            Spara
          </Button>
          <Button variant="secondary" onClick={onCancel}>
            Avbryt
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default EditProduct;
