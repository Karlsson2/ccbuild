import React from "react";
import { useParams, useLocation } from "react-router-dom";

const Project = () => {
  const { projectId } = useParams();
  const location = useLocation();
  const project = location.state?.project;

  return (
    <div>
      <h1>Project Details</h1>
      {project ? (
        <>
          <p>
            <strong>ID:</strong> {project.id}
          </p>
          <p>
            <strong>Name:</strong> {project.name}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(project.created_at).toLocaleString()}
          </p>
        </>
      ) : (
        <p>No project data found. Please try again.</p>
      )}
    </div>
  );
};

export default Project;
