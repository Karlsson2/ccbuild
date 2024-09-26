import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabase";
import { Link } from "react-router-dom";
import CreateProduct from "../components/CreateProduct";
import EditProject from "../components/EditProject";
import ProductCard from "../components/ProductCard";
import {
  Accordion,
  Form,
  Button,
  Modal,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import ItemsLoop from "../components/ItemsLoop";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import {
  faPencil,
  faPlus,
  faInfo,
  faLeaf,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Project = () => {
  const { projectId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const baseUrl = import.meta.env.VITE_SUPABASE_BUCKET_URL;
  const bucketFolder = import.meta.env.VITE_SUPABASE_PRODUCT_IMAGE_FOLDER;
  const [products, setProducts] = useState(null);
  const [showCreateProduct, setShowCreateProduct] = useState(false);
  const [showEditProject, setShowEditProject] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data: projectData } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .single();
      setProject(projectData);

      const { data: productsData } = await supabase
        .from("products")
        .select("*")
        .eq("project_id", projectId);
      setProducts(productsData);
    };

    fetchData();
  }, [projectId]);

  const handleDelete = async () => {
    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", projectId);

    if (!error) {
      navigate("/projects");
      console.log("Deleted project:", project.name, "with id:", projectId);
    } else {
      console.error("Error deleting project: ", projectId, error);
    }
  };

  const handleOpenEditProject = () => {
    setShowEditProject(true);
  };

  const handleCloseEditProject = () => {
    setShowEditProject(false);
  };

  const handleSaveProject = (updatedProject) => {
    updatedProject.id = projectId;
    setProject(updatedProject);
    setShowEditProject(false);
  };

  return (
    <Container>
      {project ? (
        <>
          <div
            className="projectsdetails-banner"
            style={{ backgroundImage: `url(${project.image_url})` }}
          >
            <div className="projectsdetails-actions">
              <Button onClick={handleOpenEditProject} className="editProduct">
                <FontAwesomeIcon icon={faPencil} /> Redigera
              </Button>
              {showEditProject && (
                <Modal
                  size="xl"
                  show={showEditProject}
                  onHide={handleCloseEditProject}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Edit Project - {project.name}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <EditProject
                      project={project}
                      onClose={handleCloseEditProject}
                      onSave={handleSaveProject}
                    />
                  </Modal.Body>
                </Modal>
              )}
              <Button
                variant="danger"
                onClick={handleDelete}
                className="deleteProduct "
              >
                <FontAwesomeIcon icon={faTrashCan} /> Radera
              </Button>
            </div>
            <Row className="projectsdetails-info">
              <Col className="content">
                <Row>
                  <h1>{project.name}</h1>
                </Row>
                <Row>
                  <Col>{project.organization}</Col>
                </Row>
              </Col>
              <Col className="buttons" sm={7}>
                <Link to={`/projects/${project.id}/create-product`}>
                  <Button
                    className="createProduct"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <FontAwesomeIcon icon={faPlus} /> Skapa ny produkt
                  </Button>
                </Link>
                <Button
                  className="createProduct"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  Duplicera
                </Button>
                <Button
                  className="createProduct"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  Importera
                </Button>
                <Button
                  className="createProduct"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  Visa rapport
                </Button>
                <Button
                  className="createProduct"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  Projekt aktivt
                </Button>
              </Col>
            </Row>
          </div>

          <Container>
            <Row className="mt-4">
              <Col className="col-lg-3 col-md-12">
                <Col>
                  <h3>Filter</h3>
                </Col>
                <Accordion
                  defaultActiveKey={["0", "1", "2", "3", "4"]}
                  alwaysOpen
                  flush
                >
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Fritext</Accordion.Header>
                    <Accordion.Body>
                      <Form>
                        <Row>
                          <Col>
                            <Form.Control
                              type="text"
                              placeholder="Fritext"
                              className=" mr-sm-2"
                            />
                          </Col>
                        </Row>
                      </Form>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Märkning</Accordion.Header>
                    <Accordion.Body>
                      <Form.Select aria-label="Default select example">
                        <option>Alla</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </Form.Select>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>Inventeringsstatus</Accordion.Header>
                    <Accordion.Body>
                      {" "}
                      <Form.Select aria-label="Default select example">
                        <option>Välj...</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </Form.Select>{" "}
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="3">
                    <Accordion.Header>Marknadsplatsstatus</Accordion.Header>
                    <Accordion.Body>
                      {" "}
                      <Form.Select aria-label="Default select example">
                        <option>Välj...</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </Form.Select>{" "}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Col>
              <Col>
                <Row className="mt-4">
                  {products ? (
                    products.length > 0 ? (
                      <>
                        {products.map((product) => (
                          <ProductCard
                            project={project}
                            product={product}
                            key={product.id}
                          />
                        ))}
                      </>
                    ) : (
                      <p>Inga produkter hittades för det här projektet.</p>
                    )
                  ) : (
                    <p>Laddar...</p>
                  )}
                </Row>
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <p>Ingen projektdata. Vänligen försök igen.</p>
      )}
    </Container>
  );
};

export default Project;
