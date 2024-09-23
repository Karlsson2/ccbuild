import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { supabase } from "../utils/supabase";
import { useState, useEffect } from "react";
import { Container, Row, Col, Image, Button, Form } from "react-bootstrap";
import Categories from "../components/Categories";
import ImageUploader from "../components/ImageUploader";

const CreateProduct = () => {
  const baseUrl = import.meta.env.VITE_SUPABASE_BUCKET_URL;
  const bucketFolder = import.meta.env.VITE_SUPABASE_PRODUCT_IMAGE_FOLDER;
  const [imagePath, setImagePath] = useState("");
  const { projectId } = useParams();
  const [projectName, setProjectName] = useState(null);
  const [productName, setProductName] = useState(null);
  const [productDescription, setProductDescription] = useState(null);
  const [selectedProductCategory, setSelectedProductCategory] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const location = useLocation();
  const [isUploading, setIsUploading] = useState(false);

  // Fetch project name using projectId
  useEffect(() => {
    const fetchData = async () => {
      try {
        let { data: project, error } = await supabase
          .from("projects")
          .select("*")
          .eq("id", projectId);
        if (error) {
          console.error("Error fetching data:", error);
        } else {
          console.log("Fetched project:", project);
          setProjectName(project[0].name);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };
    fetchData();
  }, []);

  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
  };

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedProductCategory(event.target.value);
  };

  const handleProductDescriptionChange = (event) => {
    setProductDescription(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!productName || !imagePath) {
      alert("Please provide both a product name and an image.");
      return;
    }
    // Console log what we will try to save
    // console.log("Saving product with the following data:");
    // console.log("Project ID:", projectId);
    // console.log("Product name:", productName);
    // console.log("Image path:", imagePath);
    // console.log("Category ID:", selectedCategoryId);
    // console.log("Description:", productDescription);

    // Now save the product with its image URL to the database
    const { data, error } = await supabase.from("products").insert([
      {
        project_id: projectId, // Link product to the project
        product_name: productName,
        image_url: imagePath,
        category_id: selectedProductCategory,
        description: productDescription,
      },
    ]);

    if (error) {
      console.error("Error saving product to the database: ", error);
    } else {
      console.log("Product saved successfully!");
      // Reset state or navigate to another view
    }
  };

  const handleCancel = () => {
    console.log("cancel");
  };

  const handleFileUpload = (fileName) => {
    console.log("Uploaded file name:", fileName);
    setImagePath(`${baseUrl}${bucketFolder}${fileName}`); // Store the file name in the state or handle it accordingly
  };

  return (
    <div
      className="mt-5"
      style={{
        fontFamily: "Inter",
      }}
    >
      <Container>
        <h1
          style={{
            fontSize: "48px",
            fontWeight: "bold",
            color: "var(--blue)",
          }}
        >
          Lägg till ny produkt
        </h1>
        <h2
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            margin: "20px 0",
          }}
        >
          Generell information
        </h2>
        <p
          style={{
            fontSize: "18px",
            fontWeight: "normal",
          }}
        >
          Här fyller du i generell information om produkten så som vilken
          kategori den tillhör och en beskrivning.
        </p>
      </Container>
      <Container>
        <Form>
          <Form.Group controlId="formProjectName" className="mb-4">
            <Form.Label className="create-prod">Projekt*</Form.Label>
            <Form.Control
              className="bg-gray border-gray br-8"
              type="text"
              value={projectName ? projectName : ""}
              onChange={handleProjectNameChange}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="create-prod">Produktbild</Form.Label>
            {/* <p>Dra och släpp bilder här eller tryck för att bläddra lokalt</p> */}
            <div
              style={{
                display: "flex",
                gap: "16px",
              }}
            >
              <ImageUploader onFileUpload={handleFileUpload} />
              <div>
                {/* Display the uploaded image */}
                {imagePath && (
                  <img
                    src={imagePath}
                    alt="Uppladdad produktbild"
                    style={{
                      height: "92px",
                      width: "auto",
                    }}
                  />
                )}
              </div>
            </div>
          </Form.Group>

          <Form.Group controlId="formProductCategory" className="mb-4">
            <Form.Label className="create-prod">Produktkategori*</Form.Label>
            <p>Sök eller välj från kategorilistan.</p>
            <Form.Control
              className="bg-gray border-gray br-8"
              type="text"
              value={selectedProductCategory ? selectedProductCategory : ""}
              onChange={handleCategoryChange}
            />
          </Form.Group>

          <Categories setSelectedCategoryId={setSelectedCategoryId} />

          <Form.Group controlId="formProductName" className="mb-4">
            <Form.Label className="create-prod">Produktnamn*</Form.Label>
            <Form.Control
              className="bg-gray border-gray br-8"
              type="text"
              value={productName ? productName : ""}
              placeholder={"Fyll i produktnamn"}
              onChange={handleProductNameChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formProductDescription" className="mb-4">
            <Form.Label className="create-prod">Produktbeskrivning</Form.Label>
            <Form.Control
              className="bg-gray border-gray br-8"
              as="textarea"
              rows="3"
              value={productDescription ? productDescription : ""}
              placeholder="Fyll i produktbeskrivning"
              onChange={handleProductDescriptionChange}
            />
          </Form.Group>
          <Button
            variant="primary"
            className={"cp save mb-5"}
            type="submit"
            onClick={handleSubmit}
          >
            Spara
          </Button>
          <Button
            variant="primary"
            className={"cp cancel mb-5"}
            onClick={handleCancel}
          >
            Avbryt
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default CreateProduct;
