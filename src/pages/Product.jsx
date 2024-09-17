import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { supabase } from "../utils/supabase";
import { useState, useEffect } from "react";
import Items from "../components/Items";
import Button from "react-bootstrap/Button";

const Product = () => {
  const { productId } = useParams();
  const location = useLocation();
  const product = location.state?.product;
  const baseUrl = import.meta.env.VITE_SUPABASE_BUCKET_URL;
  const bucketFolder = import.meta.env.VITE_SUPABASE_PRODUCT_IMAGE_FOLDER;
  const imageUrl = `${baseUrl}${bucketFolder}${product.image_url}`;
  const [items, setItems] = useState(null);
  const [showItems, setShowItems] = useState(null); // Show specific item.id for <Items> component

  console.log(product);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let { data: items, error } = await supabase
          .from("items")
          .select("*")
          .eq("product_id", productId);
        if (error) {
          console.error("Error fetching data:", error);
        } else {
          console.log("Fetched items:", items);
          setItems(items);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    fetchData();
  }, [productId]); // Added productId as dependency to rerun if productId changes

  useEffect(() => {
    console.log("Items state:", items);
  }, [items]);

  return (
    <div>
      <h1>Product Details</h1>
      {product ? (
        <>
          <div>
            <img src={imageUrl} alt="" />
          </div>
          <div>
            <strong>ID:</strong> {product.id}
          </div>
          <div>
            <strong>Name:</strong> {product.product_name}
          </div>
          <div>
            <strong>Created At:</strong>{" "}
            {new Date(product.created_at).toLocaleString()}
          </div>
          <div>
            <strong>Items:</strong>
            {items ? (
              items.length > 0 ? (
                <ul>
                  {items.map((item) => {
                    return (
                      <li key={item.id}>
                        <strong>ID:</strong> {item.id}, <strong>Amount:</strong>{" "}
                        {item.amount}
                        <Button
                          variant="primary"
                          onClick={() => setShowItems(item.id)} // Pass the function here
                          style={{ marginLeft: "10px" }}
                        >
                          Visa
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => setShowItems(null)} // Pass the function here
                          style={{ marginLeft: "10px" }}
                        >
                          Stäng
                        </Button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p>No items found for this product.</p>
              )
            ) : (
              <p>Loading items ...</p>
            )}
          </div>

          {/* Conditionally render the <Items> component, passing the itemId as a prop */}
          {showItems && (
            <div>
              <h2>Item Details</h2>
              <Items itemId={showItems} /> {/* Pass the selected item.id */}
            </div>
          )}
        </>
      ) : (
        <p>No product data found. Please try again.</p>
      )}
    </div>
  );
};

export default Product;
