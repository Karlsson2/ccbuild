import { Link, useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Container>
      <Row>
        <Col
          className="breadcrumbs mt-3"
          style={{ display: "flex", gap: "10px" }}
        >
          {pathnames.map((pathname, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            return (
              <div key={pathname} style={{ display: "inline" }}>
                <Link className="breadcrumb-link" to={routeTo}>
                  {pathname}
                </Link>
                {index < pathnames.length - 1 && (
                  <span className="breadcrumb-chevron">
                    <FontAwesomeIcon icon={faChevronRight} />
                  </span>
                )}
              </div>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
};

export default Breadcrumbs;
