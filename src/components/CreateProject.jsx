
import { fetchImage, uploadProjectImage, uploadProductImage, saveImgPathToDb } from "../utils/handleSupabaseImage";
import { supabase } from "../utils/supabase";
import { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Row, Col, Button, Stack } from "react-bootstrap";

export default function CreateProject({ onClose }) {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('Sverige');
  const [region, setRegion] = useState('Göteborg');
  const [image, setImage] = useState(null);
  const [currency, setCurrency] = useState('false');
  const [description, setDescription] = useState('');
  const [project_number, setProject_Number] = useState('');
  const [organization, setOrganization] = useState('');
  const [location_1, setLocation1] = useState('');
  const [location_2, setLocation2] = useState('');
  const [location_3, setLocation3] = useState('');
  const [location_4, setLocation4] = useState('');
  const [decision_1, setDecision1] = useState('');
  const [decision_2, setDecision2] = useState('');
  const [decision_3, setDecision3] = useState('');
  const [decision_4, setDecision4] = useState('');
  const [start_date, setStart_date] = useState('');
  const [end_date, setEnd_date] = useState('');
  const [first_access_date, setFirst_access_date] = useState('');
  const [last_access_date, setLast_access_date] = useState('');
  const [first_delivery_date, setFirst_delivery_date] = useState('');
  const [last_delivery_date, setLast_delivery_date] = useState('');

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      await uploadProjectImage(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { data, error } = await supabase
      .from('projects')
      .insert([
        {
          name,
          country,
          region,
          image_url: image ? await uploadProjectImage(image) : null,
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
        },
      ]);
    if (error) {
      console.error('Error inserting project: ', error);
    } else {
        onClose();
        console.log('Project successfully inserted');
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
                    <Button type="submit" className="btn btn-primary mb-2 ml-2" onClick={handleSubmit}>Submit</Button>
                
                    <Button type="button" className="btn btn-secondary mb-2 ml-2" onClick={onClose}>Close</Button>
                </Stack>
            </Row>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

