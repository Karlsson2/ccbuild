import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";

function ProjectCard({ project }) {
  if (!project.image_url) {
    project.image_url =
      "https://cpqsrfnheiohlhnpxpgo.supabase.co/storage/v1/object/public/ccbuild/public/ingenbild.jpeg";
  }
  return (
    <Col className="col-lg-4 col-md-6 col-sm-12 project-container">
      <Link to={`/projects/${project.id}`} state={{ project }} key={project.id}>
        <Card
          style={{ width: "100%", minHeight: "240px" }}
          className="project-card"
        >
          <Card.Body className="border-radius no-padding">
            <div className="project-card-image">
              <Card.Img
                src={project.image_url}
                alt="Card image"
                style={{ height: "240px", width: "100%" }}
                className=""
              />
            </div>
            <div className="project-text">
              <Card.Title>{project.name}</Card.Title>
              <Card.Subtitle className="mb-2 ">
                {project.description}
              </Card.Subtitle>
            </div>
            <Link to={`/projects/${project.id}/create-product`}>
              <div className="plus-circle">+</div>
            </Link>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
}

export default ProjectCard;
