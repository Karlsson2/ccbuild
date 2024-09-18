import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { Link } from "react-router-dom";
import CreateProject from "../components/CreateProject";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import ProjectCard from "../components/ProjectCard";

const Projects = () => {
  const [projects, setProjects] = useState(null);
  const [showCreateProject, setShowCreateProject] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let { data: projects, error } = await supabase
          .from("projects")
          .select("*");
        if (error) {
          console.error("Error fetching data:", error);
        } else {
          console.log("Fetched Projects:", projects);
          setProjects(projects);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Products state:", projects);
  }, [projects]);

  const handleOpenCreateProject = () => {
    setShowCreateProject(true);
  };

  const handleCloseCreateProject = () => {
    setShowCreateProject(false);
  };

  return (
    <>
      <Container>
        <Container>
          <Row>
            <Col>
              <h1>Alla Projekt</h1>
            </Col>
            <Col>
              <button onClick={handleOpenCreateProject}>
                Skapa Nytt Projekt
              </button>
              {showCreateProject && (
                <CreateProject onClose={handleCloseCreateProject} />
              )}
            </Col>
          </Row>
        </Container>
        <hr className="allproduct-border"></hr>
        <Container>
          <Row>
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
                    </Form>{" "}
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Land</Accordion.Header>
                  <Accordion.Body>
                    <Form.Select aria-label="Default select example">
                      <option>Välj land</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Region</Accordion.Header>
                  <Accordion.Body>
                    {" "}
                    <Form.Select aria-label="Default select example">
                      <option>Välj Region</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>{" "}
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>Organisation</Accordion.Header>
                  <Accordion.Body>
                    {" "}
                    <Form.Select aria-label="Default select example">
                      <option>Välj Organisation</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>{" "}
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <Accordion.Header>Status</Accordion.Header>
                  <Accordion.Body>
                    {" "}
                    <Form.Select aria-label="Default select example">
                      <option>Aktivt</option>
                      <option value="1">One</option>
                    </Form.Select>{" "}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
            <Col>
              <Row>
                {projects ? (
                  projects.length > 0 ? (
                    <>
                      {projects.map((project) => (
                        <ProjectCard
                          project={project}
                          key={project.id}
                        ></ProjectCard>
                      ))}
                    </>
                  ) : (
                    <p>No data found in the Projects table.</p>
                  )
                ) : (
                  <p>Loading...</p>
                )}
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default Projects;
