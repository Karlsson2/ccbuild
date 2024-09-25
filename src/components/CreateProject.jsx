import {
  fetchImage,
  uploadProjectImage,
  uploadProductImage,
  saveImgPathToDb,
} from "../utils/handleSupabaseImage";
import { supabase } from "../utils/supabase";
import { useState } from "react";

import { Container, Row, Col, Button, Stack } from "react-bootstrap";

export default function CreateProject({ onClose, fetchData }) {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("Sverige");
  const [region, setRegion] = useState("Göteborg");
  const [image, setImage] = useState(null);
  const [currency, setCurrency] = useState("false");
  const [description, setDescription] = useState("");
  const [project_number, setProject_Number] = useState("");
  const [organization, setOrganization] = useState("Yrgo");

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      await uploadProjectImage(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { data, error } = await supabase.from("projects").insert([
      {
        name,
        country,
        region,
        image_url: image ? await uploadProjectImage(image) : null,
        currency,
        description,
        project_number,
        organization,
      },
    ]);

    if (error) {
      console.error("Error inserting project: ", error);
    } else {
      onClose();
      console.log("Project successfully inserted");
      fetchData();
    }
  };
  return (
    <div className="full-screen-form d-flex justify-content-center align-items-center">
      <Container>
        <Row>
          <Col>
            <form className="form col" onSubmit={handleSubmit}>
              <h2>Generell information</h2>
              <Row>
                <Col>
                  <label>Projektnamn</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="name"
                    placeholder="Projektnamn"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Col>
                <Col>
                  <label>Land</label>
                  <select
                    className="form-select mb-3"
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option defaultValue={"Sverige"}>Sverige</option>
                    <option value="Danmark">Danmark</option>
                    <option value="Finland">Finland</option>
                  </select>
                </Col>
              </Row>

              <Row>
                <Col>
                  <label>Region</label>
                  <select
                    className="form-select mb-3"
                    id="region"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                  >
                    <option defaultValue={"Göteborg"}>Göteborg</option>
                    <option value="Gävleborg">Gävleborg</option>
                    <option value="Halland">Halland</option>
                  </select>
                </Col>
                <Col>
                  <label>Valuta</label>
                  <select
                    className="form-select mb-3"
                    id="currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <option defaultValue={"SEK"}>SEK</option>
                    <option value="NOK">NOK</option>
                    <option value="DKK">DKK</option>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                  </select>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col>
                  <label>Projekt-bild</label>
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    className="form-control"
                  />
                </Col>
              </Row>

              <Row className="mb-4">
                <Col>
                  <label>Projektbeskrivning</label>
                  <textarea
                    className="form-control"
                    placeholder="Beskrivning..."
                    style={{ height: "100px" }}
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </Col>
              </Row>

              <Row>
                <Col>
                  <label>Eget projektnummer</label>
                  <input
                    className="form-select mb-5"
                    id="project_number"
                    value={project_number}
                    onChange={(e) => setProject_Number(e.target.value)}
                  ></input>
                </Col>
                <Col>
                  <label>Organisation</label>
                  <select
                    className="form-select mb-3"
                    id="organization"
                    value={organization} // Controlled by state
                    onChange={(e) => setOrganization(e.target.value)} // Updates state
                  >
                    <option value="Yrgo">Utbildningskonto - Yrgo</option>
                    <option value="Annat">annat</option>
                  </select>
                </Col>
              </Row>
              <Stack direction="horizontal" gap={3}>
                <Button
                  type="submit"
                  className="btn btn-primary mb-2 ml-2"
                  onClick={handleSubmit}
                >
                  Skapa
                </Button>

                <Button
                  type="button"
                  className="btn btn-secondary mb-2 ml-2"
                  onClick={onClose}
                >
                  Stäng
                </Button>
              </Stack>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
