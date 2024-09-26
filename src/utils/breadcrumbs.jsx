import { Link, useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { supabase } from "./supabase";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const [names, setNames] = useState({});
  const capPathnames = pathnames.map((item) =>
    typeof item === "string"
      ? item.charAt(0).toUpperCase() + item.slice(1)
      : item
  );

  useEffect(() => {
    const fetchNames = async () => {
      const newNames = {};
      for (const pathname of capPathnames) {
        if (!isNaN(pathname)) {
          const { data: project, error: projectError } = await supabase
            .from("projects")
            .select("name")
            .eq("id", pathname)
            .single();
          if (project) {
            newNames[pathname] = project.name;
          } else {
            const { data: product, error: productError } = await supabase
              .from("products")
              .select("product_name")
              .eq("id", pathname)
              .single();
            if (product) {
              newNames[pathname] = product.product_name;
            }
          }
        }
      }
      setNames(newNames);
    };

    fetchNames();
  }, [location.pathname]);

  return (
    <Container>
      <Row>
        <Col
          className="breadcrumbs mt-3"
          style={{ display: "flex", gap: "10px" }}
        >
          {capPathnames.map((pathname, index) => {
            const routeTo = `/${capPathnames.slice(0, index + 1).join("/")}`;
            const displayName = names[pathname] || pathname;
            return (
              <div key={pathname} style={{ display: "inline" }}>
                <Link className="breadcrumb-link" to={routeTo}>
                  {displayName}
                </Link>
                {index < capPathnames.length - 1 && (
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
