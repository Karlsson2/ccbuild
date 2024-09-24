import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabase";
import { useState, useEffect } from "react";
import { Container, Button, Form } from "react-bootstrap";
import Categories from "../components/Categories";
import ImageUploader from "../components/ImageUploader";

const CreateProduct = () => {
  const baseUrl = import.meta.env.VITE_SUPABASE_BUCKET_URL;
  const bucketFolder = import.meta.env.VITE_SUPABASE_PRODUCT_IMAGE_FOLDER;
  const [imagePath, setImagePath] = useState("");
  const { projectId } = useParams();
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState(null);
  const [productName, setProductName] = useState(null);
  const [productDescription, setProductDescription] = useState(null);
  const [selectedProductCategory, setSelectedProductCategory] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const navigate = useNavigate();

  // Fetch all projects, save all project names and ids in an array
  // then find the project name that matches the current projectId and set it in the state
  useEffect(() => {
    const fetchData = async () => {
      try {
        let { data: projects, error } = await supabase
          .from("projects")
          .select("*");
        if (error) {
          console.error("Error fetching data:", error);
        }
        console.log("Fetched projects:", projects);
        const currentProjects = projects.map((project) => {
          return { id: project.id, name: project.name };
        });
        setProjects(currentProjects);
        const currentProjectName = currentProjects.find(
          (project) => project.id == projectId
        ).name;
        setProjectName(currentProjectName);
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };
    fetchData();
  }, []);

  const handleProjectNameChange = (event) => {
    navigate(`/projects/${event.target.value}/create-product`);
  };

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleProductDescriptionChange = (event) => {
    setProductDescription(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    //Console log what we will try to save
    console.log("Saving product with the following data:");
    console.log("Project ID:", projectId);
    console.log("Product name:", productName);
    console.log("Image path:", imagePath);
    console.log("Category ID:", selectedCategoryId);
    console.log("Description:", productDescription);

    // Now save the product with its image URL to the database
    const { data, error } = await supabase
      .from("products")
      .insert(
        [
          {
            project_id: projectId, // Link product to the project
            product_name: productName,
            image_url: imagePath,
            category_id: selectedCategoryId,
            description: productDescription,
          },
        ],
        { returning: "minimal" }
      )
      .select("*"); // Select all columns after insertion

    if (error) {
      console.error("Error saving product to the database: ", error);
    } else {
      console.log("Returned data:", data); // Log the entire data object

      if (Array.isArray(data) && data.length > 0) {
        const newProductId = data[0].id; // Assuming 'id' is the column name for the primary key
        console.log("New product ID:", newProductId);

        navigate(`/projects/${projectId}/${newProductId}`);
      } else {
        console.warn("No products were returned after insertion");
      }
    }
  };

  const handleCancel = () => {
    navigate(`/projects/${projectId}/`);
  };

  const handleFileUpload = (fileName) => {
    console.log("Uploaded file name:", fileName);
    setImagePath(`${baseUrl}${bucketFolder}${fileName}`); // Store the file name in the state or handle it accordingly
  };

  return (
    <Container>
      <div
        className="mt-5"
        style={{
          fontFamily: "Inter",
          width: "640px",
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
              {/* Map through projects array, create select with project name as option text and project id as value.
               Select the option with projectId */}
              <Form.Control
                as="select"
                className="bg-gray border-gray br-8"
                value={projectId}
                onChange={handleProjectNameChange}
                style={{ width: "305px" }}
              >
                {projects.map((project, index) => (
                  <option key={index} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="create-prod">Produktbild</Form.Label>
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

            <Categories
              setSelectedProductCategory={setSelectedProductCategory}
              setSelectedCategoryId={setSelectedCategoryId}
              setProductName={setProductName}
            />

            <Form.Group controlId="formProductName" className="mb-4">
              <Form.Label className="create-prod">Produktnamn*</Form.Label>
              <Form.Control
                className="bg-gray border-gray br-8"
                type="text"
                // for value, if productName is not null, use productName,
                // else if selectedProductCategory is not null, use selectedProductCategory
                // else use an empty string
                value={
                  productName
                    ? productName
                    : selectedProductCategory
                    ? selectedProductCategory
                    : ""
                }
                placeholder={"Fyll i produktnamn"}
                onChange={handleProductNameChange}
              />
            </Form.Group>
            <Form.Group controlId="formProductDescription" className="mb-4">
              <Form.Label className="create-prod">
                Produktbeskrivning
              </Form.Label>
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
    </Container>
  );
};

export default CreateProduct;
