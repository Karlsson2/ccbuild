import {
  fetchImage,
  uploadProjectImage,
  uploadProductImage,
  saveImgPathToDb,
} from "../utils/handleSupabaseImage";
import { supabase } from "../utils/supabase";
import { useState } from "react";

export default function CreateProject({ handleCloseCreateProject }) {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("Sverige");
  const [region, setRegion] = useState("Göteborg");
  const [image, setImage] = useState(null);
  const [currency, setCurrency] = useState("false");
  const [description, setDescription] = useState("");
  const [project_number, setProject_Number] = useState("");
  const [organization, setOrganization] = useState("");
  const [location_1, setLocation1] = useState("");
  const [location_2, setLocation2] = useState("");
  const [location_3, setLocation3] = useState("");
  const [location_4, setLocation4] = useState("");

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      await uploadProjectImage(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { data, error } = await supabase.from("projects").upsert([
      {
        name: name,
        country: country,
        region: region,
        image_url: image
          ? `${
              import.meta.env.VITE_SUPABASE_URL
            }/storage/v1/object/public/ccbuild/${
              import.meta.env.VITE_SUPABASE_PROJECT_FOLDER
            }/${image.name}`
          : null,
      },
    ]);
    if (error) {
      console.error("Error inserting project: ", error);
    } else {
      console.log("Project successfully inserted");
      handleCloseCreateProject();
    }
  };

  return (
    <>
      <div className="create-project-modal">
        <div className=" border p-3">
          <form className="form-inline col" onSubmit={handleSubmit}>
            <div className="row">
              <div className="mb-3 col">
                <label htmlFor="">Projektnamn</label>
                <input
                  type="text"
                  className="form-control"
                  id=""
                  placeholder="Projektnamn"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
              <div className="mb-3 col">
                <label htmlFor="">Land</label>
                <select
                  className="form-select"
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option defaultValue={"Sverige"}>Sverige</option>
                  <option value="1">Danrmark</option>
                  <option value="2">Finland</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className=" mb-3 ">
                <label htmlFor="">Region</label>
                <select
                  className="form-select"
                  id="region"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                >
                  <option defaultValue={"Göteborg"}>Göteborg</option>
                  <option value="1">Gävleborg</option>
                  <option value="2">Halland</option>
                </select>
              </div>
              <div className="mb-6 ">
                <label htmlFor="">Valuta</label>
                <select
                  className="form-select"
                  id="currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option defaultValue={"SEK"}>SEK</option>
                  <option value="1">NOK</option>
                  <option value="2">DKK</option>
                  <option value="3">EUR</option>
                  <option value="4">USD</option>
                </select>
              </div>
            </div>

            <div className="form-inline mt-5 mb-3 ">
              <label htmlFor="">Projekt-bild</label>
              <input type="file" onChange={handleImageUpload} />
            </div>
            <div className="mb-5" id="description">
              <label htmlFor="">Projektbeskrivning</label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                style={{ height: "100px" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="row mb-5">
              <div className=" col">
                <label htmlFor="">Eget projektnummer</label>
                <input
                  type="text"
                  className="form-control"
                  id="project_number"
                  placeholder="Eget projektnummer"
                  value={project_number}
                  onChange={(e) => setProject_Number(e.target.value)}
                ></input>
              </div>
              <div className=" col">
                <label htmlFor="">Organistaion</label>
                <select
                  className="form-select"
                  id="orgianization"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                >
                  <option defaultValue={"Sverige"}>
                    Utbildningskonto - Yrgo
                  </option>
                  <option value="1">Annat</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className=" mb-3 col">
                <label htmlFor="">Platsbenämning #1</label>
                <input
                  type="text"
                  className="form-control"
                  id=""
                  placeholder="Eget projektnummer"
                  value={location_1}
                  onChange={(e) => setLocation1(e.target.value)}
                ></input>
              </div>
              <div className=" mb-3 col">
                <label htmlFor="">Platsbenämning #2</label>
                <input
                  type="text"
                  className="form-control"
                  id=""
                  placeholder="Eget projektnummer"
                  value={location_2}
                  onChange={(e) => setLocation2(e.target.value)}
                ></input>
              </div>
            </div>

            <div className="row">
              <div className=" mb-3 col">
                <label htmlFor="">Platsbenämning #3</label>
                <input
                  type="text"
                  className="form-control"
                  id=""
                  placeholder="Eget projektnummer"
                  value={location_3}
                  onChange={(e) => setLocation3(e.target.value)}
                ></input>
              </div>
              <div className=" mb-3 col">
                <label htmlFor="">Platsbenämning #4</label>
                <input
                  type="text"
                  className="form-control"
                  id=""
                  placeholder="Eget projektnummer"
                  value={location_4}
                  onChange={(e) => setLocation4(e.target.value)}
                ></input>
              </div>
            </div>

            <button type="submit" className="btn btn-primary mb-2 ml-2">
              Submit
            </button>
            <button
              type="button"
              className="btn btn-secondary mb-2 ml-2"
              onClick={handleCloseCreateProject}
            >
              Close
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
