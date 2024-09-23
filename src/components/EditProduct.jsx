// EditProduct.js
import React, { useState } from "react";
import { Button, Form, Col, Row, Image } from "react-bootstrap";
import { uploadProductImagWithReturn } from "../utils/handleSupabaseImage";

const EditProduct = ({
  product,
  noImageUrl,
  onSave,
  onCancel,
  onImageClick,
}) => {
  const [productName, setProductName] = useState(product.product_name);
  const [ownId, setOwnId] = useState(product.own_id);
  const [description, setDescription] = useState(product.description);
  const [imageUrls, setImageUrls] = useState([
    product.image_url1 || noImageUrl,
    product.image_url2 || noImageUrl,
    product.image_url3 || noImageUrl,
  ]);
  const [imageFiles, setImageFiles] = useState([null, null, null]); // To hold selected files

  const handleImageUrlChange = (index, value) => {
    const updatedUrls = [...imageUrls];
    updatedUrls[index] = value;
    setImageUrls(updatedUrls);
  };

  const handleFileChange = (index, file) => {
    const updatedFiles = [...imageFiles];
    updatedFiles[index] = file;
    setImageFiles(updatedFiles);
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
      <Row>
        <Col sm={3}>
          <Form.Group controlId="productName">
            <Form.Label>Produktnamn</Form.Label>
            <Form.Control
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col sm={3}>
          <Form.Group controlId="ownId">
            <Form.Label>Eget Id-nummer</Form.Label>
            <Form.Control
              type="text"
              value={ownId}
              onChange={(e) => setOwnId(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col sm={3}>
          <Form.Group controlId="description">
            <Form.Label>Produktbeskrivning</Form.Label>
            <Form.Control
              as="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <strong>Produktbilder</strong>
          <Row className="d-flex gap-3 mt-2">
            {imageUrls.map((url, index) => (
              <Col key={index} sm={4}>
                <Form.Group controlId={`imageUrl${index}`}>
                  <Form.Label>Bild {index + 1}</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => handleFileChange(index, e.target.files[0])}
                  />
                  <Image
                    fluid
                    src={url}
                    alt={`Produktbild ${index + 1}`}
                    onClick={() => onImageClick(url)}
                    style={{ cursor: "pointer", marginTop: "5px" }}
                  />
                </Form.Group>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <Button variant="primary" onClick={handleSave}>
        Spara
      </Button>
      <Button variant="secondary" onClick={onCancel}>
        Avbryt
      </Button>
    </Form>
  );
};

export default EditProduct;
