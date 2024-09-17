import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { supabase } from "../utils/supabase";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const Project = () => {
  const { projectId } = useParams();
  const location = useLocation();
  const project = location.state?.project;
  const baseUrl = import.meta.env.VITE_SUPABASE_BUCKET_URL;
  const bucketFolder = import.meta.env.VITE_SUPABASE_PRODUCT_IMAGE_FOLDER;
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let { data: products, error } = await supabase
          .from("products")
          .select("*")
          .eq("project_id", projectId);
        if (error) {
          console.error("Error fetching data:", error);
        } else {
          console.log("Fetched products:", products);
          setProducts(products);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("products state:", products);
  }, [products]);

  return (
    <div>
      <h1>Project Details</h1>
      {project ? (
        <>
          <div>
            <strong>ID:</strong> {project.id}
          </div>
          <div>
            <strong>Name:</strong> {project.name}
          </div>
          <div>
            <strong>Created At:</strong>{" "}
            {new Date(project.created_at).toLocaleString()}
          </div>
          <div>
            <strong>Products:</strong>
            {products ? (
              products.length > 0 ? (
                <ul>
                  {products.map((product) => {
                    const imageUrl = `${baseUrl}${bucketFolder}${product.image_url}`;
                    return (
                      <Link
                        to={`/projects/${project.id}/${product.id}`}
                        state={{ product }}
                        key={product.id}
                      >
                        <li>
                          <strong>ID:</strong> {product.id},{" "}
                          <strong>Name:</strong> {product.product_name},{" "}
                          <img src={imageUrl} alt={product.product_name} />
                        </li>
                      </Link>
                    );
                  })}
                </ul>
              ) : (
                <p>No products found for this project.</p>
              )
            ) : (
              <p>Loading products...</p>
            )}
          </div>
        </>
      ) : (
        <p>No project data found. Please try again.</p>
      )}
    </div>
  );
};

export default Project;
