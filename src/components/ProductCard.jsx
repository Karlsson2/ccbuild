import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

const ProductCard = ({ project, product }) => {
  const [category, setCategory] = useState(null);
  useEffect(() => {
    console.log(product);

    const fetchCategory = async () => {
      try {
        let { data: categoryData, error } = await supabase
          .from("categories")
          .select("*")
          .eq("categoryid", product.category_id);

        if (error) {
          console.error("Error fetching category:", error);
        } else {
          setCategory(categoryData?.[0]);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    if (product) {
      fetchCategory();
    }
  }, [product]);

  return (
    <Col className="col-lg-4 col-md-6 col-sm-6 project-container">
      <Link to={`/projects/${project.id}/${product.id}`} state={{ product }}>
        <Card className="mb-3 product-card">
          <img
            src={product.image_url1}
            alt={product.product_name}
            style={{
              width: "100%",
              height: "240px",
              objectFit: "cover",
            }}
          />
          <Card.Body style={{ fontSize: "12px", backgroundColor: "#f9f9f9" }}>
            <Card.Text>
              {category ? (
                <>
                  {category.category_1 && <span>{category.category_1}</span>}
                  {category.category_1 && category.category_2 && (
                    <span className="chevron-blue">&gt;</span>
                  )}
                  {category.category_2 && <span>{category.category_2}</span>}
                  {category.category_2 && category.category_3 && (
                    <span className="chevron-blue">&gt;</span>
                  )}
                  {category.category_3 && <span>{category.category_3}</span>}
                </>
              ) : (
                "Loading category..."
              )}
            </Card.Text>
            <Card.Title>
              <strong>{product.product_name}</strong>{" "}
            </Card.Title>
            <Card.Text
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <strong>CCbuild Nr:</strong> {product.id}
            </Card.Text>
            <Card.Text
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <strong>Totalt antal:</strong> {product.total_amount}
            </Card.Text>
            <Card.Text
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <strong>Total klimatbesparing:</strong> 800 kg CO₂e
            </Card.Text>
            <Card.Text
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <strong>Total mängd:</strong> {product.total_weight} kg
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};

export default ProductCard;
