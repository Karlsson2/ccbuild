import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { Link } from "react-router-dom";
import CreateProject from "../components/CreateProject";

const Projects = () => {
  const [projects, setProjects] = useState(null);
  const [showCreateProject, setShowCreateProject] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let { data: projects, error } = await supabase
          .from("projects")
          .select("*");
        if (error) {
          console.error("Error fetching data:", error);
        } else {
          console.log("Fetched Projects:", projects);
          setProjects(projects);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Products state:", projects);
  }, [projects]);

  const handleOpenCreateProject = () => {
    setShowCreateProject(true);
  };

  const handleCloseCreateProject = () => {
    setShowCreateProject(false);
  };

  return (
    <>
      <div>
        <h3>Create new project</h3>
        <button onClick={handleOpenCreateProject}>Open Create Project</button>
        {showCreateProject && (
          <CreateProject onClose={handleCloseCreateProject} />
        )}
        <h1>All Projects</h1>
        {projects ? (
          projects.length > 0 ? (
            <ul>
              {projects.map((project) => (
                <Link
                  to={`/projects/${project.id}`}
                  state={{ project }}
                  key={project.id}
                >
                  <li>
                    <strong>ID:</strong> {project.id}, <strong>Name:</strong>{" "}
                    {project.name}, <strong>Created At:</strong>{" "}
                    {new Date(project.created_at).toLocaleString()}
                  </li>
                </Link>
              ))}
            </ul>
          ) : (
            <p>No data found in the Projects table.</p>
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default Projects;
