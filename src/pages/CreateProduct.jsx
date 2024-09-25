import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabase";
import { useState, useEffect } from "react";
import { Container, Button, Form, Spinner } from "react-bootstrap";
import Categories from "../components/Categories";
import ImageUploader from "../components/ImageUploader";

const CreateProduct = () => {
  const baseUrl = import.meta.env.VITE_SUPABASE_BUCKET_URL;
  const bucketFolder = import.meta.env.VITE_SUPABASE_PRODUCT_IMAGE_FOLDER;
  const [imagePaths, setImagePaths] = useState([]);
  const { projectId } = useParams();
  const [projects, setProjects] = useState([]);
  const [productName, setProductName] = useState(null);
  const [productDescription, setProductDescription] = useState(null);
  const [selectedProductCategory, setSelectedProductCategory] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [imageLoading, setImageLoading] = useState(-1);
  const [isUploading, setIsUploading] = useState(false);
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
        // setProjectName(currentProjectName);
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

  const handleImageLoading = (index) => {
    setImageLoading(index);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    //Console log what we will try to save
    console.log("Saving product with the following data:");
    console.log("Project ID:", projectId);
    console.log("Product name:", productName);
    console.log("Image path 1:", imagePaths[0]);
    console.log("Image path 2:", imagePaths[1]);
    console.log("Image path 3:", imagePaths[2]);
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
            image_url1: imagePaths[0],
            image_url2: imagePaths[1],
            image_url3: imagePaths[2],
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
    setImageLoading(imagePaths.length);
    setImagePaths((prevPaths) => {
      // Check if the array already has 3 or more items
      if (prevPaths.length >= 3) {
        // Create a new array where the oldest item is replaced
        const newPaths = [...prevPaths];
        const indexToReplace = prevPaths.length % 3; // Circular index (0, 1, 2)
        newPaths[indexToReplace] = `${baseUrl}${bucketFolder}${fileName}`;
        return newPaths;
      } else {
        // If less than 3 items, just add the new file name to the array
        return [...prevPaths, `${baseUrl}${bucketFolder}${fileName}`];
      }
    });
  };

  const handleDeleteClick = (event) => {
    // Find the index of the image in the array and set it to null
    const index = imagePaths.indexOf(event.target.src);
    setImagePaths((prevPaths) => {
      const newPaths = [...prevPaths];
      //splice the image path from the array
      newPaths.splice(index, 1);
      return newPaths;
    });
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
            className="mb-4"
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "var(--blue)",
            }}
          >
            Lägg till ny produkt
          </h1>
          <div
            style={{
              width: "100%",
              height: "4px",
              backgroundColor: "var(--hr-gray)",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <div
              style={{
                width: "220px",
                height: "4px",
                backgroundColor: "var(--hr-yellow)",
              }}
            ></div>
          </div>
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
              <Form.Label className="create-prod">Produktbilder</Form.Label>
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                }}
              >
                {/* Display a spinner while uploading */}
                {imageLoading !== -1 && (
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
                    }}
                  >
                    <Spinner animation="border" size="xl" />
                  </div>
                )}
                {imageLoading === -1 && (
                  <ImageUploader
                    onFileUpload={handleFileUpload}
                    setIsUploading={setIsUploading}
                  />
                )}
                <div
                  style={{
                    width: "320px",
                    display: "flex",
                    gap: "16px",
                    justifyContent: "space-between",
                  }}
                >
                  {
                    // map through imagePaths array and display each image if not null
                    imagePaths.map((imagePath, index) => {
                      if (imagePath) {
                        return (
                          <div
                            className="image-container"
                            key={index}
                            style={{
                              position: "relative",
                            }}
                          >
                            <img
                              className="uploaded-image"
                              onClick={handleDeleteClick}
                              key={index}
                              src={imagePath}
                              alt="Uppladdad produktbild"
                              style={{
                                height: "92px",
                                width: "auto",
                                cursor: "pointer",
                              }}
                              onLoadStart={() => {
                                setImageLoading(index);
                                setIsUploading(true);
                              }}
                              onLoad={() => {
                                setImageLoading(-1);
                                setIsUploading(false);
                              }}
                            />

                            {/* Display a close button on the top right of the image,
                            but only AFTER the image above has loaded */}
                            {imageLoading !== index && (
                              <img
                                key={index + 999}
                                src={`${baseUrl}/public/close_small.png`}
                                alt="Ta bort bild"
                                style={{
                                  position: "absolute",
                                  top: "0",
                                  right: "0",
                                  cursor: "pointer",
                                }}
                                onClick={handleDeleteClick}
                              />
                            )}
                          </div>
                        );
                      }
                      return null;
                    })
                  }
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
