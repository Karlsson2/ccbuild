import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { supabase } from "../utils/supabase";
import { Button, Container, Row, Col, Image, Modal } from "react-bootstrap";

const Product = () => {
  const { projectId, productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  const noImageUrl = import.meta.env.VITE_SUPABASE_NO_IMAGE_URL;
  const [project, setProject] = useState(location.state?.project || null);
  const [category, setCategory] = useState(null);
  const [categoryId, setCategoryId] = useState(product?.category_id || null);
  const [loading, setLoading] = useState(false);

  console.log(noImageUrl);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  // Fetch project data if not available in location.state
  useEffect(() => {
    const fetchProject = async () => {
      if (!project) {
        setLoading(true);
        try {
          let { data: projectData, error } = await supabase
            .from("projects")
            .select("*")
            .eq("id", projectId);

          if (error) {
            console.error("Error fetching project:", error);
          } else {
            const fetchedProject = projectData?.[0];
            setProject(fetchedProject);
            if (fetchedProject?.category_id) {
              setCategoryId(fetchedProject.category_id);
            }
          }
        } catch (error) {
          console.error("Unexpected error:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProject();
  }, [projectId, project]);

  // Fetch category based on categoryId
  useEffect(() => {
    const fetchCategory = async () => {
      if (!categoryId) return;

      try {
        let { data: categoryData, error } = await supabase
          .from("categories")
          .select("*")
          .eq("categoryid", categoryId);

        if (error) {
          console.error("Error fetching category:", error);
        } else {
          setCategory(categoryData?.[0]);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    fetchCategory();
  }, [categoryId]);

  // Delete product handler
  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);

      if (error) {
        console.error("Error deleting product:", error);
        setFeedbackMessage("Något gick fel. Produkten kunde inte raderas.");
      } else {
        setFeedbackMessage("Produkten har raderats.");
        setShowConfirmModal(false);
        setShowFeedbackModal(true);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setFeedbackMessage("Något gick fel. Produkten kunde inte raderas.");
    }
  };

  const openDeleteConfirmation = () => {
    setShowConfirmModal(true);
  };

  const closeDeleteConfirmation = () => {
    setShowConfirmModal(false);
  };

  // Feedback modal after deletion
  const handleFeedbackClose = () => {
    setShowFeedbackModal(false);
    navigate(`/projects/${projectId}`); // Redirect to project page after modal closes
  };

  // Image modal handler functions
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowImageModal(true);
  };

  const handleImageModalClose = () => {
    setShowImageModal(false);
    setSelectedImage("");
  };

  console.log("No Image URL:", import.meta.env.VITE_SUPABASE_NO_IMAGE_URL);

  return (
    <Container>
      {product ? (
        <>
          <Row className="productHeader">
            <Col sm={4}>
              <Image
                fluid
                src={product.image_url1 ? product.image_url1 : noImageUrl}
                alt={product.product_name}
                onClick={() => handleImageClick(product.image_url1)}
                style={{ cursor: "pointer" }}
              />
            </Col>
            <Col sm={8}>
              <Row>
                <Col>
                  <h1>
                    {category ? category.category_3 : "Loading category..."}
                  </h1>
                </Col>
              </Row>
              <Row>
                <Col>Id: {product.id}</Col>
              </Row>
              <Row>
                <Col>
                  {project ? (
                    <Link to={`/projects/${project.id}`}>{project.name}</Link>
                  ) : (
                    "Loading project..."
                  )}
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button variant="primary">Redigera Produkt</Button>
                  <Button variant="danger" onClick={openDeleteConfirmation}>
                    Radera Produkt
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col sm={3}>
              <Row>
                <Col>
                  <strong>Produktnamn:</strong>
                </Col>
              </Row>
              <Row>
                <Col>{product.product_name}</Col>
              </Row>
            </Col>
            <Col sm={3}>
              <Row>
                <Col>
                  <strong>Projekt</strong>
                </Col>
              </Row>
              <Row>
                <Col>{project ? project.name : "Loading project..."}</Col>
              </Row>
            </Col>
            <Col sm={3}>
              <Row>
                <Col>
                  <strong>Eget Id-nummer</strong>
                </Col>
              </Row>
              <Row>
                <Col>{product.own_id}</Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row>
                <Col>
                  <strong>ProduktBeskrivning</strong>
                </Col>
              </Row>
              <Row>
                <Col>{product.description}</Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row>
                <Col>
                  <strong>Produktbilder</strong>
                </Col>
              </Row>
              <Row className="d-flex ">
                <Col className="d-flex gap-3">
                  <Image
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      padding: "0px",
                      cursor: "pointer",
                    }}
                    src={product.image_url1 ? product.image_url1 : noImageUrl}
                    alt={product.product_name}
                    onClick={() =>
                      handleImageClick(
                        product.image_url1 ? product.image_url1 : noImageUrl
                      )
                    }
                  />
                  <Image
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      padding: "0px",
                      cursor: "pointer",
                    }}
                    src={product.image_url2 ? product.image_url2 : noImageUrl}
                    alt={product.product_name}
                    onClick={() =>
                      handleImageClick(
                        product.image_url2 ? product.image_url2 : noImageUrl
                      )
                    }
                  />
                  <Image
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      padding: "0px",
                      cursor: "pointer",
                    }}
                    src={product.image_url3 ? product.image_url3 : noImageUrl}
                    alt={product.product_name}
                    onClick={() =>
                      handleImageClick(
                        product.image_url3 ? product.image_url3 : noImageUrl
                      )
                    }
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      ) : (
        <p>Ingen produktdata. Vänligen försök igen.</p>
      )}

      <Row>
        <Col xs={6}>
          <h2>Lägg till individer</h2>
          <p>
            Lägg till individer kopplade till din produkt och specificera deras
            marknadsplatsstatus samt aktuella status. För att optimera
            synligheten på marknadsplatsen och underlätta för potentiella
            köpare, är det viktigt att fylla i samtliga relevanta fält. Särskild
            vikt bör läggas vid att ange produktens vikt, då detta är avgörande
            för en korrekt beräkning av klimatbesparing.
          </p>
        </Col>
      </Row>

      {/* Confirm Delete Modal */}
      <Modal show={showConfirmModal} onHide={closeDeleteConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>Bekräfta borttagning</Modal.Title>
        </Modal.Header>
        <Modal.Body>Är du säker på att du vill radera produkten?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteConfirmation}>
            Avbryt
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Radera
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Feedback Modal */}
      <Modal show={showFeedbackModal} onHide={handleFeedbackClose}>
        <Modal.Header closeButton>
          <Modal.Title>Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>{feedbackMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleFeedbackClose}>
            Stäng
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Image Modal */}
      <Modal show={showImageModal} onHide={handleImageModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Produktbild</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image
            src={selectedImage}
            alt="Produktbild"
            fluid
            style={{ maxHeight: "80vh", objectFit: "contain" }}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Product;
