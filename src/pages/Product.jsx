import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { supabase } from "../utils/supabase";
import { useState, useEffect } from "react";

const Product = () => {
  const { productId } = useParams();
  const location = useLocation();
  const product = location.state?.product;
  const baseUrl = import.meta.env.VITE_SUPABASE_BUCKET_URL;
  const bucketFolder = import.meta.env.VITE_SUPABASE_PRODUCT_IMAGE_FOLDER;
  const imageUrl = `${baseUrl}${bucketFolder}${product.image_url}`;
  const [items, setItems] = useState(null);

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
  }, []);

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
                        <strong>ID:</strong> {item.id}, <strong>Amount:</strong>
                        {item.amount}
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
        </>
      ) : (
        <p>No product data found. Please try again.</p>
      )}
    </div>
  );
};

export default Product;
