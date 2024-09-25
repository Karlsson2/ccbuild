import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

const ProductCard = ({ project, product }) => {
  const [category, setCategory] = useState(null);
  const [items, setItems] = useState(null);
  const itemsWeight = items?.reduce((acc, item) => acc + item.weight, 0);
  const itemsTotal = items?.reduce((acc, item) => acc + item.amount, 0);
  const itemsCO2 = itemsWeight * 0.8;
  const noImageUrl =
    "https://cpqsrfnheiohlhnpxpgo.supabase.co/storage/v1/object/public/ccbuild/public/ingenbild.jpeg";

  useEffect(() => {
    const fetchItems = async () => {
      try {
        let { data: itemsData, error } = await supabase
          .from("items")
          .select("*")
          .eq("product_id", product.id);

        if (error) {
          console.error("Error fetching items:", error);
        } else {
          setItems(itemsData);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    if (product) {
      fetchItems();
    }
  }, [product]);

  useEffect(() => {
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
        <Card className="mb-3 product-card " style={{ position: "relative" }}>
          <div className="organisation-info">{project.organization}</div>
          <img
            src={product.image_url1 ? product.image_url1 : noImageUrl}
            alt={product.product_name}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
            }}
          />
          <Card.Body
            style={{
              fontSize: "12px",
              backgroundColor: "#f9f9f9",
              height: "220px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
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
            <div>
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
                <strong>Totalt antal:</strong>
                {itemsTotal}
              </Card.Text>
              <Card.Text
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <strong>Total klimatbesparing:</strong>{" "}
                <span className="greenText">{itemsCO2} kg CO₂e</span>
              </Card.Text>
              <Card.Text
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <strong>Total mängd:</strong> {itemsWeight} kg
              </Card.Text>
            </div>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};

export default ProductCard;
