import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

const Projects = () => {
  const [projects, setProjects] = useState(null);

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

  return (
    <>
      <div>
        <h1>Projects Page</h1>
        <h2>Fetched Projects:</h2>
        {projects ? (
          projects.length > 0 ? (
            <ul>
              {projects.map((projects) => (
                <li key={projects.id}>
                  <strong>ID:</strong> {projects.id},<strong> Name: </strong>{" "}
                  {projects.name},<strong> Created At:</strong>{" "}
                  {new Date(projects.created_at).toLocaleString()}
                </li>
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
