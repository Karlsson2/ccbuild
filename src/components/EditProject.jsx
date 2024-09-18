import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../utils/supabase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Row, Col, Button, Stack } from "react-bootstrap";


export default function EditProject ({ project, onClose, onSave }) {

    const [name, setName] = useState(project?.name || '');
    const [country, setCountry] = useState(project?.country || 'Sverige');
    const [region, setRegion] = useState(project?.region || 'Göteborg');
    const [image, setImage] = useState(null);
    const [currency, setCurrency] = useState(project?.currency || 'SEK');
    const [description, setDescription] = useState(project?.description || '');
    const [project_number, setProject_Number] = useState(project?.project_number || '');
    const [organization, setOrganization] = useState(project?.organization || 'Yrgo');
    const [location_1, setLocation1] = useState(project?.location_1 || '');
    const [location_2, setLocation2] = useState(project?.location_2 || '');
    const [location_3, setLocation3] = useState(project?.location_3 || '');
    const [location_4, setLocation4] = useState(project?.location_4 || '');
    const [decision_1, setDecision1] = useState(project?.decision_1 || '');
    const [decision_2, setDecision2] = useState(project?.decision_2 || '');
    const [decision_3, setDecision3] = useState(project?.decision_3 || '');
    const [decision_4, setDecision4] = useState(project?.decision_4 || '');
    const [start_date, setStart_date] = useState(new Date(project?.start_date) || null);
    const [end_date, setEnd_date] = useState(new Date(project?.end_date) || null);
    const [first_access_date, setFirst_access_date] = useState(new Date(project?.first_access_date) || null);
    const [last_access_date, setLast_access_date] = useState(new Date(project?.last_access_date) || null);
    const [first_delivery_date, setFirst_delivery_date] = useState(new Date(project?.first_delivery_date) || null);
    const [last_delivery_date, setLast_delivery_date] = useState(new Date(project?.last_delivery_date) || null);


    const handleImageUpload = (e) => {
        setImage(e.target.files[0]);
      };
    
      
      const handleSave = async (e) => {
        e.preventDefault();
    
        const imageUrl = image ? await uploadProjectImage(image) : project.image_url;
    
        const updatedData = {
          name,
          country,
          region,
          image_url: imageUrl,
          currency,
          description,
          project_number,
          organization,
          location_1,
          location_2,
          location_3,
          location_4,
          decision_1,
          decision_2,
          decision_3,
          decision_4,
          start_date,
          end_date,
          first_access_date,
          last_access_date,
          first_delivery_date,
          last_delivery_date,
        };
    
        const { error } = await supabase
          .from("projects")
          .update(updatedData)
          .eq("id", project.id);
    
        if (error) {
          console.error("Error updating project:", error);
        } else {
          console.log("Project updated successfully");
          onSave(updatedData); 
          onClose();
        }
      };


    return (
        <>
        <h1>Edit project - {project.name}</h1>
        <Container>
        <Row>
          <Col>
            <form className="form col" onSubmit={handleSave}>
              <h2>Generell information</h2>
              <Row >
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
                    <option defaultValue={'Sverige'}>Sverige</option>
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
                    <option defaultValue={'Göteborg'}>Göteborg</option>
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
                    <option defaultValue={'SEK'}>SEK</option>
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
                  <input type="file" onChange={handleImageUpload} className="form-control" />
                </Col>
              </Row>

              <Row className="mb-4">
                <Col>
                  <label>Projektbeskrivning</label>
                  <textarea
                    className="form-control"
                    placeholder="Beskrivning..."
                    style={{ height: '100px' }}
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
                  >
                    
                  </input>
                </Col>
                <Col>
                  <label>Organisation</label>
                  <select
                    className="form-select mb-3"
                    id="organization"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                  >
                    <option defaultValue={'Yrgo'}>Utbildningskonto - Yrgo</option>
                    <option value="Annat">annat</option>
                    
                  </select>
                </Col>
              </Row>

              <h2>Platsbenämningar</h2>
              <Row className="mb-4">
                <Col>
                  <label>Platsbenämning #1</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="location_1"
                    placeholder="1..."
                    value={location_1}
                    onChange={(e) => setLocation1(e.target.value)}
                  />
                </Col>
                <Col>
                  <label>Platsbenämning #2</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="location_2"
                    placeholder="2..."
                    value={location_2}
                    onChange={(e) => setLocation2(e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <label>Platsbenämning #3</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="location_3"
                    placeholder="3..."
                    value={location_3}
                    onChange={(e) => setLocation3(e.target.value)}
                  />
                </Col>
                <Col>
                  <label>Platsbenämning #4</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="location_4"
                    placeholder="4..."
                    value={location_4}
                    onChange={(e) => setLocation4(e.target.value)}
                  />
                </Col>
              </Row>

              <h2>Beslutsbenämningar</h2>
              <Row className="mb-4">
                <Col>
                  <label>Beslutsbenämning #1</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="decision_1"
                    placeholder="1..."
                    value={decision_1}
                    onChange={(e) => setDecision1(e.target.value)}
                  />
                </Col>
                <Col>
                  <label>Beslutsbenämning #2</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="decision_2"
                    placeholder="2..."
                    value={decision_2}
                    onChange={(e) => setDecision2(e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <label>Beslutsbenämning #3</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="location_3"
                    placeholder="3..."
                    value={decision_3}
                    onChange={(e) => setDecision3(e.target.value)}
                  />
                </Col>
                <Col>
                  <label>Beslutsbenämning #4</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="decision_4"
                    placeholder="4..."
                    value={decision_4}
                    onChange={(e) => setDecision4(e.target.value)}
                  />
                </Col>
              </Row>

              <h2>Datum</h2>
              <Row className="mb-3">
                <Col>
                  <label>Startdatum</label>
                  <div>
                    <DatePicker
                        placeholder="Välj datum"
                        id="start_date"
                        selected={start_date}
                        onChange={(date) => setStart_date(date)}
                        className="form-control"
                    />
                  </div>
                </Col>
                <Col>
                <div>
                  <label>Slutdatum</label>
                  <DatePicker
                    placeholder="Välj datum"
                    id="end_date"
                    selected={end_date}
                    onChange={(date) => setEnd_date(date)}
                    className="form-control"
                  />
                  </div>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col>
                  <label>Första åtkomstdatum</label>
                  <div>
                  <DatePicker
                    placeholder="Välj datum"
                    id="first_access_date"
                    selected={first_access_date}
                    onChange={(date) => setFirst_access_date(date)}
                    className="form-control"
                  />
                  </div>
                </Col>
                <Col>
                  <label>Sista åtkomstdatum</label>
                  <div>
                  <DatePicker
                    placeholder="Välj datum"
                    id="last_access_date"
                    selected={last_access_date}
                    onChange={(date) => setLast_access_date(date)}
                    className="form-control"
                  />
                  </div>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col>
                  <label>Första möjliga leveransdatum</label>
                  <div>
                  <DatePicker
                    placeholder="Välj datum"
                    id="first_delivery_date"
                    selected={first_delivery_date}
                    onChange={(date) => setFirst_delivery_date(date)}
                    className="form-control"
                  />
                  </div>
                </Col>
                <Col>
                  <label>Sista möjliga leveransdatum</label>
                  <div>
                  <DatePicker
                    placeholder="Välj datum"
                    id="last_delivery_date"
                    selected={last_delivery_date}
                    onChange={(date) => setLast_delivery_date(date)}
                    className="form-control"
                  />
                  </div>
                </Col>
              </Row>
              <Row>
                <Stack direction="horizontal" gap={3}>
                    <Button type="submit" className="btn btn-primary mb-2 ml-2" onClick={handleSave}>Submit</Button>
                
                    <Button type="button" className="btn btn-secondary mb-2 ml-2" onClick={onClose}>Close</Button>
                </Stack>
            </Row>
            </form>
          </Col>
        </Row>
      </Container>
        
        </>
    )
}