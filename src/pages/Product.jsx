// Product.js
import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { supabase } from "../utils/supabase";

import {
  Button,
  Container,
  Row,
  Col,
  Image,
  Modal,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";

import Items from "../components/Items";
import Categories from "../components/Categories";
import ItemsLoop from "../components/ItemsLoop";

import EditProduct from "../components/EditProduct";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import {
  faPencil,
  faInfo,
  faLeaf,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Product = () => {
  const { projectId, productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(location.state?.product || null);
  const [shouldFetchProduct, setShouldFetchProduct] = useState(false);

  const noImageUrl = import.meta.env.VITE_SUPABASE_NO_IMAGE_URL;
  const [project, setProject] = useState(location.state?.project || null);
  const [category, setCategory] = useState(null);
  const [categoryId, setCategoryId] = useState(product?.category_id || null);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const [items, setItems] = useState([]);

  // Use effect to check if product is available in location.state
  useEffect(() => {
    if (!product) {
      setShouldFetchProduct(true);
    }
  }, []);

  // Fetch product data if not available in location.state
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        let { data: productData, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", productId);

        if (error) {
          console.error("Error fetching product:", error);
        } else {
          const fetchedProduct = productData?.[0];
          setProduct(fetchedProduct);
          if (fetchedProduct?.category_id) {
            setCategoryId(fetchedProduct.category_id);
          }
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (shouldFetchProduct) {
      fetchProduct();
      setShouldFetchProduct(false); // Reset the flag after fetching
    }
  }, [product, shouldFetchProduct, productId]);

  // Fetch project data
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

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleSaveChanges = async (updatedProduct) => {
    const { error } = await supabase
      .from("products")
      .update(updatedProduct)
      .eq("id", updatedProduct.id);

    if (error) {
      console.error("Error updating product:", error);
    } else {
      setShouldFetchProduct(true); // Trigger re-fetch after saving
      setEditMode(false); // Exit edit mode after saving
    }
  };

  // Fetcha och CRUD Items logik \/
  const fetchItems = async () => {
    const { data: items, error: itemsError } = await supabase
      .from("items")
      .select("*")
      .eq("product_id", productId);

    if (itemsError) {
      console.error("Error fetching items data:", itemsError);
      return;
    }

    setItems(items);
  };

  useEffect(() => {
    if (productId) {
      fetchItems();
    }
  }, [productId]);

  const handleCreateNewItem = async () => {
    try {
      const { data, error } = await supabase
        .from("items")
        .insert([{ amount: 1, product_id: productId }]);

      if (error) {
        console.error("Error creating new item", error);
      } else {
        fetchItems();
      }
    } catch (err) {
      console.error("An error occurred", err);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const { data, error } = await supabase
        .from("items")
        .delete()
        .eq("id", itemId);

      if (error) {
        console.error("Error deleting:", error);
      } else {
        fetchItems();
      }
    } catch (err) {
      console.error("An error occurred:", err);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : product === null || product === undefined ? (
        <Container className="mt-5">
          <Row>
            <Col>
              <h1
                className="generellInfoHeader "
                style={{ textAlign: "center" }}
              >
                Product Not found
              </h1>
            </Col>
          </Row>
        </Container>
      ) : (
        <Container>
          <Row className="productHeader mt-3 mb-5">
            <Col md={4}>
              <Image
                fluid
                src={product?.image_url1 ? product?.image_url1 : noImageUrl}
                alt={product?.product_name}
                onClick={() => handleImageClick(product?.image_url1)}
                style={{
                  cursor: "pointer",
                  height: "240px",
                  objectFit: "cover",
                  width: "100%",
                }}
              />
            </Col>
            <Col sm={8} className="d-flex flex-column justify-content-between">
              <Col className="gap-2 d-flex flex-column">
                <Row>
                  <Col>
                    <h1 className="generellInfoHeader">
                      {product?.product_name.charAt(0).toUpperCase() +
                        product?.product_name.slice(1)}
                    </h1>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <span className="ccId">{product?.id}</span>{" "}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button variant="success" className="buttonC02">
                      Totalt 800kg CO2e
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id="tooltip-top" className="custom-tooltip">
                            <FontAwesomeIcon icon={faLeaf} /> <br></br>
                            Här är din totala klimatbesparing för alla{" "}
                            {product?.product_name}.<br></br>
                          </Tooltip>
                        }
                      >
                        <div className="infoCircle">
                          <FontAwesomeIcon icon={faInfo} />
                        </div>
                      </OverlayTrigger>
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Row className="mt-3 ">
                <Col className="d-flex gap-3">
                  <Button
                    variant="primary"
                    className={"editProduct"}
                    onClick={handleEditToggle}
                  >
                    <FontAwesomeIcon icon={faPencil} /> Ändra generell info
                  </Button>
                  <Button
                    variant="danger"
                    className={"deleteProduct"}
                    onClick={openDeleteConfirmation}
                  >
                    <FontAwesomeIcon icon={faTrashCan} /> Radera produkt
                  </Button>
                </Col>
              </Row>
            </Col>
            <Row>
              <Col xm={3} className="mt-3">
                {category ? (
                  <>
                    {category.category_1 && <span>{category.category_1}</span>}
                    {category.category_1 && category.category_2 && (
                      <span className="chevron-blue">
                        <FontAwesomeIcon icon={faChevronRight} />
                      </span>
                    )}
                    {category.category_2 && <span>{category.category_2}</span>}
                    {category.category_2 && category.category_3 && (
                      <span className="chevron-blue">
                        {" "}
                        <FontAwesomeIcon icon={faChevronRight} />
                      </span>
                    )}
                    {category.category_3 && <span>{category.category_3}</span>}
                  </>
                ) : (
                  "Loading category..."
                )}
              </Col>
            </Row>
          </Row>

          {editMode ? (
            <EditProduct
              product={product}
              noImageUrl={noImageUrl}
              onSave={handleSaveChanges}
              onCancel={handleEditToggle}
              onImageClick={handleImageClick}
            />
          ) : (
            <>
              <Row className="mt-3 mb-3">
                <h2 className="generellInfoSubHeader">Generell information</h2>
              </Row>
              <Row className="mt-3 mb-3">
                <Col sm={3}>
                  <Row>
                    <Col>
                      <strong>Projekt</strong>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {project ? (
                        <Link to={`/projects/${project.id}`}>
                          {project.name}
                        </Link>
                      ) : (
                        "Laddar projekt..."
                      )}
                    </Col>
                  </Row>
                </Col>
                <Col sm={3}>
                  <Row>
                    <Col>
                      <strong>Eget id-nummer</strong>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {!product?.internal_id ? (
                        <span className="interal-id-not">Ej angivet</span>
                      ) : (
                        product?.internal_id
                      )}
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row className="mt-3 mb-3">
                <Col>
                  <Row>
                    <Col>
                      <strong>Produktbeskrivning</strong>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {product?.description || (
                        <span className="interal-id-not">Ej angivet</span>
                      )}
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className="mt-3 mb-3">
                <Col>
                  <Row className="mb-3">
                    <Col>
                      <strong>Produktbilder</strong>
                    </Col>
                  </Row>
                  <Row className="d-flex ">
                    <Col className="d-flex flex-column flex-sm-row gap-3">
                      <Image
                        style={{
                          width: "93px",
                          height: "93px",
                          objectFit: "cover",
                          padding: "0px",
                          cursor: "pointer",
                        }}
                        src={
                          product?.image_url1 ? product?.image_url1 : noImageUrl
                        }
                        alt={"Huvudbild"}
                        onClick={() =>
                          handleImageClick(
                            product?.image_url1
                              ? product?.image_url1
                              : noImageUrl
                          )
                        }
                      />
                      <Image
                        style={{
                          width: "93px",
                          height: "93px",
                          objectFit: "cover",
                          padding: "0px",
                          cursor: "pointer",
                        }}
                        src={
                          product?.image_url2 ? product?.image_url2 : noImageUrl
                        }
                        alt={"Bild 2"}
                        onClick={() =>
                          handleImageClick(
                            product?.image_url2
                              ? product?.image_url2
                              : noImageUrl
                          )
                        }
                      />
                      <Image
                        style={{
                          width: "93px",
                          height: "93px",
                          objectFit: "cover",
                          padding: "0px",
                          cursor: "pointer",
                        }}
                        src={
                          product?.image_url3 ? product?.image_url3 : noImageUrl
                        }
                        alt={"Bild 3"}
                        onClick={() =>
                          handleImageClick(
                            product?.image_url3
                              ? product?.image_url3
                              : noImageUrl
                          )
                        }
                      />
                    </Col>
                  </Row>
                </Col>
                <Row>
                  <Row className="mt-5 mb-3">
                    <Col>
                      <h2 className="generellInfoSubHeader">
                        Lägg till individer
                      </h2>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={6}>
                      Lägg till individer kopplade till din produkt och
                      specificera deras marknadsplatsstatus samt aktuella
                      status. För att optimera synligheten på marknadsplatsen
                      och underlätta för potentiella köpare, är det viktigt att
                      fylla i samtliga relevanta fält. Särskild vikt bör läggas
                      vid att ange produktens vikt, då detta är avgörande för en
                      korrekt beräkning av klimatbesparing.
                    </Col>
                  </Row>
                </Row>
              </Row>
              <Button
                variant="outline-primary"
                className="mb-4 mt-2"
                onClick={handleCreateNewItem}
              >
                Lägg till individ
              </Button>
            </>
          )}
          <Row>
            <Col className="mb-3 ">
              <ItemsLoop items={items} handleDeleteItem={handleDeleteItem} />
            </Col>
          </Row>

          {/* Confirm Delete Modal */}
          <Modal show={showConfirmModal} onHide={closeDeleteConfirmation}>
            <Modal.Header closeButton>
              <Modal.Title>Bekräfta borttagning</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Är du säker på att du vill radera produkten?
            </Modal.Body>
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
      )}
    </div>
  );
};

export default Product;
