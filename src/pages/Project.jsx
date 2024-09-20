import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabase";
import { Link } from "react-router-dom";
import CreateProduct from "../components/CreateProduct";
import { Button } from "react-bootstrap";
import EditProject from "../components/EditProject";
import { Button, Modal } from "react-bootstrap";



const Project = () => {
  const { projectId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const baseUrl = import.meta.env.VITE_SUPABASE_BUCKET_URL;
  const bucketFolder = import.meta.env.VITE_SUPABASE_PRODUCT_IMAGE_FOLDER;
  const [products, setProducts] = useState(null);
  const [showCreateProduct, setShowCreateProduct] = useState(false);
  const [showEditProject, setShowEditProject] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      const { data: projectData } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .single();
        setProject(projectData);

      const { data: productsData } = await supabase
        .from("products")
        .select("*")
        .eq("project_id", projectId);
      setProducts(productsData);
    };

    fetchData();
  }, [projectId]);

  const handleDelete = async () => {
    const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", projectId);

    if (!error) {
      navigate("/projects");
      console.log('Deleted project:', project.name, 'with id:', projectId)
    } else {
      console.error("Error deleting project: ", projectId, error)
    }
  }

  const handleOpenEditProject = () => {
    setShowEditProject(true);
  };
  
  const handleCloseEditProject = () => {
    setShowEditProject(false);
  };

  const handleSaveProject = (updatedProject) => {
    setProject(updatedProject); 
    setShowEditProject(false); 
  };

  const handleOpenCreateProduct = () => {
    setShowCreateProduct(true);
  };

  const handleCloseCreateProduct = () => {
    console.log("Closing CreateProduct form");

    setShowCreateProduct(false);
  };

  return (
    <div>
      <h1>Project Details</h1>
      {project ? (
        <>
        <div>
        <Button onClick={handleOpenEditProject}>Edit</Button>
            {showEditProject && (
              <Modal size="xl" show={showEditProject} onHide={handleCloseEditProject}>
                
              <Modal.Header closeButton>
                <Modal.Title>Edit Project</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <EditProject
                  project={project}
                  onClose={handleCloseEditProject}
                  onSave={handleSaveProject}
                />
              </Modal.Body>
            </Modal>
            )}
          <Button variant="danger" onClick={handleDelete}>
            Radera
          </Button>
        </div>
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
      <button onClick={handleOpenCreateProduct}>Skapa Ny Produkt</button>
      {showCreateProduct && (
        <CreateProduct
          handleCloseCreateProduct={handleCloseCreateProduct}
          project_id={project.id}
          projectName={project.name}
        />
      )}
    </div>
  );
};

export default Project;
