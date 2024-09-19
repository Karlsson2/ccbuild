import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { supabase } from "../utils/supabase";
import { useState, useEffect } from "react";
import Items from "../components/Items";
import Button from "react-bootstrap/Button";
import searchCategories from "../utils/searchCategories";
import createCategoriesArray from "../utils/createCategoriesArray";

const Product = () => {
  const { productId } = useParams();
  const location = useLocation();
  const product = location.state?.product;
  const baseUrl = import.meta.env.VITE_SUPABASE_BUCKET_URL;
  const bucketFolder = import.meta.env.VITE_SUPABASE_PRODUCT_IMAGE_FOLDER;
  const imageUrl = `${baseUrl}${bucketFolder}${product.image_url}`;
  const [items, setItems] = useState(null);
  const [showItems, setShowItems] = useState(null); // Show specific item.id for <Items> component
  const [categoriesArr, setCategoriesArr] = useState(null);

  console.log(product);

  // use effect for fetching categories from categories table
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        let { data: categories, error } = await supabase
          .from("categories")
          .select("*");
        if (error) {
          console.error("Error fetching data:", error);
        } else {
          console.log("Fetched categories:", categories);
          const nestedArrays = createCategoriesArray(categories);
          setCategoriesArr(nestedArrays);
          // Test the searchCategories function with search term "plast"
          const searchResult = searchCategories(nestedArrays, "plast");
          console.log("searchResult:", searchResult);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };
    fetchCategories();
  }, []);

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
            <strong>Namn:</strong> {product.product_name}
          </div>
          <div>
            <strong>Skapad:</strong>{" "}
            {new Date(product.created_at).toLocaleString()}
          </div>
          <div>
            <strong>Exemplar:</strong>
            {items ? (
              items.length > 0 ? (
                <>
                  <ul>
                    {items.map((item) => {
                      return (
                        <li key={item.id}>
                          <strong>ID:</strong> {item.id},{" "}
                          <strong>Antal:</strong> {item.amount}
                          <Button
                            variant="primary"
                            onClick={() => setShowItems(item.id)}
                            style={{ marginLeft: "10px" }}
                          >
                            Visa
                          </Button>
                        </li>
                      );
                    })}
                  </ul>
                  <Button
                    variant="primary"
                    onClick={() => setShowItems("new")}
                    style={{ marginLeft: "10px" }}
                  >
                    Nytt exemplar
                  </Button>
                </>
              ) : (
                <p>Den här produkten har inga exemplar.</p>
              )
            ) : (
              <p>Loading items ...</p>
            )}
          </div>

          {/* Conditionally render the <Items> component, passing the itemId as a prop */}
          {showItems && (
            <div>
              <h2>Antal, status och platsinformation</h2>
              <Items
                itemId={showItems}
                productId={productId}
                setShowItems={setShowItems}
              />{" "}
              {/* Pass the selected item.id */}
            </div>
          )}
        </>
      ) : (
        <p>Ingen produktdata. Vänligen försök igen.</p>
      )}
    </div>
  );
};

export default Product;
