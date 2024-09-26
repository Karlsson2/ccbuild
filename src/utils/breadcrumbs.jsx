import { Link, useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { supabase } from "./supabase";
const Breadcrumbs = () => {
  const location = useLocation();
  // Split the pathname and add "Start" as the first element
  let pathnames = ["Start", ...location.pathname.split("/").filter((x) => x)];
  const [names, setNames] = useState({});

  useEffect(() => {
    const fetchNames = async () => {
      const newNames = {};

      for (const pathname of pathnames) {
        const index = pathnames.indexOf(pathname);
        if (pathname === "create-product") {
          newNames[pathname] = "Skapa ny produkt";
        }
        if (!isNaN(pathname)) {
          if (index === 3) {
            const { data: product, error: productError } = await supabase
              .from("products")
              .select("product_name")
              .eq("id", pathname)
              .single();

            if (product) {
              newNames[pathname] = product.product_name;
            }
          } else if (index === 2) {
            const { data: project, error: projectError } = await supabase
              .from("projects")
              .select("name")
              .eq("id", pathname)
              .single();
            if (project) {
              newNames[pathname] = project.name;
            }
          }
        }
      }

      setNames(newNames);
    };

    fetchNames();
  }, [location.pathname]);

  return (
    <>
      <Container>
        <Row>
          <Col
            className="breadcrumbs mt-3"
            style={{ display: "flex", gap: "10px" }}
          >
            {/* Render breadcrumbs */}
            {pathnames.map((pathname, index) => {
              const routeTo =
                pathname === "Start"
                  ? "/"
                  : `/${pathnames.slice(1, index + 1).join("/")}`; // Adjust the slicing to skip "Start"
              const displayName = names[pathname] || pathname;
              return (
                <div key={pathname} style={{ display: "inline" }}>
                  <Link className="breadcrumb-link" to={routeTo}>
                    {displayName === "projects" ? "Alla projekt" : displayName}
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
    </>
  );
};

export default Breadcrumbs;
