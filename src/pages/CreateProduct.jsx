import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { supabase } from "../utils/supabase";
import { useState, useEffect } from "react";
import { Container, Row, Col, Image, Button, Form } from "react-bootstrap";
import Categories from "../components/Categories";

const CreateProduct = () => {
  const baseUrl = import.meta.env.VITE_SUPABASE_BUCKET_URL;
  const bucketFolder = import.meta.env.VITE_SUPABASE_PRODUCT_IMAGE_FOLDER;
  const { projectId } = useParams();
  const [projectName, setProjectName] = useState(null);
  const [productName, setProductName] = useState(null);
  const [productDescription, setProductDescription] = useState(null);
  const location = useLocation();
  const [selectedProductCategory, setSelectedProductCategory] = useState(null);

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleProductDescriptionChange = (event) => {
    setProductDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submit");
  };

  const handleCancel = () => {
    console.log("cancel");
  };

  const handleCategoryChange = (event) => {
    setSelectedProductCategory(event.target.value);
  };

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

  return (
    <div
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
          <Form.Group controlId="formProjectName">
            <Form.Label className="create-prod">Projektnamn*</Form.Label>
            <Form.Control
              type="text"
              value={projectName ? projectName : ""}
              disabled
            />
          </Form.Group>

          <Form.Group controlId="formProductCategory">
            <Form.Label className="create-prod">Produktkategori*</Form.Label>
            <p>Sök eller välj från kategorilistan.</p>
            <Form.Control
              type="text"
              value={selectedProductCategory ? selectedProductCategory : ""}
              onChange={handleCategoryChange}
            />
          </Form.Group>

          <Categories />

          <Form.Group controlId="formProductName">
            <Form.Label className="create-prod">Produktnamn*</Form.Label>
            <Form.Control
              type="text"
              value={productName ? productName : ""}
              placeholder={"Fyll i produktnamn"}
              onChange={handleProductNameChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formProductDescription">
            <Form.Label className="create-prod">Produktbeskrivning</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              value={productDescription ? productDescription : ""}
              placeholder="Fyll i produktbeskrivning"
              onChange={handleProductDescriptionChange}
            />
          </Form.Group>
          <Button
            variant="primary"
            className={"cp save"}
            type="submit"
            onClick={handleSubmit}
          >
            Spara
          </Button>
          <Button
            variant="primary"
            className={"cp cancel"}
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
