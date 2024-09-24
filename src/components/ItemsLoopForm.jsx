import { useEffect, useState } from "react";
import { Row, Col, Form, Modal, Button, Card, Container } from "react-bootstrap";
import { supabase } from "../utils/supabase";

export default function ItemsLoopForm({ items: initialItems }) {
  const [formData, setFormData] = useState(initialItems || {});

  const [isExpanded, setIsExpanded] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value === "" ? null : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted');
    try {
      const { data, error } = await supabase
        .from('items')
        .upsert([formData]);
      
      if (error) {
        console.error('Error upserting data: ', error);
      } else {
        console.log('Data upserted successfully:', data);
      }
    } catch (err) {
      console.error('An error occurred during submission:', err);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const { data, error } = await supabase
        .from('items')
        .delete()
        .eq('id', itemId);
  
      if (error) {
        console.error('Error deleting:', error);
      } else {
        console.log('Deleted item with id:', itemId);
        
      }
    } catch (err) {
      console.error('An error occurred:', err);
    }
  };

  const handleStopPropagation = (e) => {
    e.stopPropagation();
  };

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Container className="mb-3">
      <div className="d-flex align-items-center bg-light border border-secondary rounded p-3 cursor-pointer" onClick={toggleExpansion}>
        <Form method="POST" id="form1" onSubmit={handleSubmit} className="w-100">
          <Row className="align-items-center w-100 p-1">
            <Col xs="auto">
              <Form.Check type="checkbox" onClick={handleStopPropagation} />
            </Col>
            <Col xs={2}>
              <Form.Control
                type="number"
                name="amount"
                value={formData.amount}
                min={1}
                onChange={handleInputChange}
                onClick={handleStopPropagation}
              />
            </Col>
            <Col>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                onClick={handleStopPropagation}
              >
                <option>Välj status</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Select
                name="market_place"
                value={formData.market_place}
                onChange={handleInputChange}
                onClick={handleStopPropagation}
              >
                <option>Välj marknadsplatsstatus</option>
                <option>Inventerad</option>
              </Form.Select>
            </Col>
            <Col xs="auto" style={{ border: "1px solid green", borderRadius: "700px", padding: "9px" }}>
              <span className="text-muted">400 kg CO2e</span>
            </Col>
            <Col xs="auto">
              <Button variant="link" onClick={() => handleDeleteItem(formData.id)}>
                <i className="bi bi-trash"></i> Ta bort produkt
              </Button>
            </Col>
          </Row>
        </Form>
      </div>

      {isExpanded && (
        <Card className="mt-3">
          <Card.Body>
            <Form method="POST" onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Estetiskt skick</Form.Label>
                    <Form.Select
                      name="aesthetic"
                      value={formData.aesthetic}
                      onChange={handleInputChange}
                      onClick={handleStopPropagation}
                    >
                      <option value="">Välj estetiskt skick</option>
                      <option>2</option>
                      <option>3</option>
                      <option>5</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Funktionellt skick</Form.Label>
                    <Form.Select
                      name="functionality"
                      value={formData.functionality}
                      onChange={handleInputChange}
                      onClick={handleStopPropagation}
                    >
                      <option value="">Välj funktionellt skick</option>
                      <option >1</option>
                      <option >5</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Datum Tillgänglig</Form.Label>
                    <Form.Control
                      type="date"
                      name="date_available"
                      value={formData.date_available}
                      onChange={handleInputChange}
                      onClick={handleStopPropagation}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Datum första möjliga leverans</Form.Label>
                    <Form.Control
                      type="date"
                      name="date_delivery"
                      value={formData.date_delivery}
                      onChange={handleInputChange}
                      onClick={handleStopPropagation}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Demonterbarhet</Form.Label>
                    <Form.Select
                      name="demountability"
                      value={formData.demountability}
                      onChange={handleInputChange}
                      onClick={handleStopPropagation}
                    >
                      <option>Enkel att demontera/demontering krävs ej</option>
                      <option>Begränsad demonterbarhet</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mt-2">
                    <Form.Label>Demonterbarhet kommentar</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="demountability_comment"
                      value={formData.demountability_comment}
                      onChange={handleInputChange}
                      placeholder="Skriv kommentar här"
                      onClick={handleStopPropagation}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Åtkomlighet</Form.Label>
                    <Form.Select
                      name="accessibility"
                      value={formData.accessibility}
                      onChange={handleInputChange}
                      onClick={handleStopPropagation}
                    >
                      <option>Välj</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mt-2">
                    <Form.Label>Åtkomlighet kommentar</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="accessibility_comment"
                      value={formData.accessibility_comment}
                      onChange={handleInputChange}
                      placeholder="Skriv kommentar här"
                      onClick={handleStopPropagation}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                {[1, 2, 3, 4].map((num) => (
                    <Col key={num} md={3}>
                    <Form.Group>
                        <Form.Label>Placering {num}</Form.Label>
                        <Form.Control
                        type="text"
                        name={`location_${num}`}
                        value={formData[`location_${num}`]}
                        onChange={handleInputChange}
                        onClick={handleStopPropagation}
                        />
                    </Form.Group>
                    </Col>
                ))}
                </Row>

                <Row className="mb-3">
                {[1, 2, 3, 4].map((num) => (
                    <Col key={num} md={3}>
                    <Form.Group>
                        <Form.Label>Beslutsbenämning {num}</Form.Label>
                        <Form.Control
                        type="text"
                        name={`decision_${num}`}
                        value={formData[`decision_${num}`]}
                        onChange={handleInputChange}
                        onClick={handleStopPropagation}
                        />
                    </Form.Group>
                    </Col>
                ))}
                </Row>
              <Card.Title>Form</Card.Title>
              <Row>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>Enhets vikt</Form.Label>
                    <Form.Select
                      type="text"
                      /* name="unit_weight"
                      value={formData.unit_weight}
                      onChange={handleInputChange}
                      onClick={handleStopPropagation} */
                    >
                      <option>kg</option>
                      <option>ton</option>
                      <option>gram</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>Vikt /st</Form.Label>
                    <Form.Control
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      placeholder="Vikt"
                      onClick={handleStopPropagation}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={2}>
                  <Form.Group className="mb-3">
                    <Form.Label>Enhets mått</Form.Label>
                    <Form.Select
                      name="unit_dimensions"
                      /* value={formData.unit_dimensions}
                      onChange={handleInputChange}
                      onClick={handleStopPropagation} */
                    >
                      <option>mm</option>
                      <option>cm</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={1}>
                  <Form.Group className="mb-3">
                    <Form.Label>Bredd</Form.Label>
                    <Form.Control
                      type="number"
                      name="width"
                      value={formData.width}
                      onChange={handleInputChange}
                      placeholder="Bredd"
                      onClick={handleStopPropagation}
                    />
                  </Form.Group>
                </Col>
                <Col md={1}>
                  <Form.Group className="mb-3">
                    <Form.Label>Längd</Form.Label>
                    <Form.Control
                      type="number"
                      name="length"
                      value={formData.length}
                      onChange={handleInputChange}
                      placeholder="Längd"
                      onClick={handleStopPropagation}
                    />
                  </Form.Group>
                </Col>
                <Col md={1}>
                  <Form.Group className="mb-3">
                    <Form.Label>Höjd</Form.Label>
                    <Form.Control
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      placeholder="Höjd"
                      onClick={handleStopPropagation}
                    />
                    </Form.Group>
                </Col>
                <Col md={1}>
                  <Form.Group className="mb-3">
                    <Form.Label>Djup</Form.Label>
                    <Form.Control
                      type="number"
                      name="depth"
                      value={formData.depth}
                      onChange={handleInputChange}
                      placeholder="Djup"
                      onClick={handleStopPropagation}
                    />
                  </Form.Group>
                </Col>
                <Col md={1}>
                  <Form.Group className="mb-3">
                    <Form.Label>Diameter</Form.Label>
                    <Form.Control
                      type="number"
                      name="diameter"
                      value={formData.diameter}
                      onChange={handleInputChange}
                      placeholder="Diameter"
                      onClick={handleStopPropagation}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Card.Title>Material och Yta</Card.Title>
                <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                    <Form.Label>Material</Form.Label>
                    <Form.Select
                        name="material"
                        value={formData.material}
                        onChange={handleInputChange}
                        onClick={handleStopPropagation}
                    >
                        <option>Välj material</option>
                        <option>Metall</option>
                        <option>Trä</option>
                        <option>Plast</option>
                        <option>Glas</option>
                        <option>Textil</option>
                        <option>Elektronik</option>
                        <option>Övrigt</option>
                    </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                    <Form.Label>Yta</Form.Label>
                    <Form.Select
                        name="color"
                        value={formData.color}
                        onChange={handleInputChange}
                        onClick={handleStopPropagation}
                    >
                        <option>Välj finish</option>
                        <option>Lackad</option>
                        <option>Oljad</option>
                        <option>Laserskuren</option>
                        <option>Graverad</option>
                        <option>Tryckt</option>
                        <option>Övrigt</option>
                    </Form.Select>
                    </Form.Group>
                </Col>
                </Row>
              <Card.Title>Certifieringar</Card.Title>
                <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                    <Form.Label>CE-märkning</Form.Label>
                    <Row>
                        <Col>
                        <Form.Check
                            inline
                            type="radio"
                            label="Ja"
                            name="ce_mark"
                            value="true"
                            checked={formData.ce_mark === "true"}
                            onChange={handleInputChange}
                            onClick={handleStopPropagation}
                        />
                        </Col>
                        <Col>
                        <Form.Check
                            inline
                            type="radio"
                            label="Nej"
                            name="ce_mark"
                            value="false"
                            checked={formData.ce_mark !== "true"}
                            onChange={handleInputChange}
                            onClick={handleStopPropagation}
                        />
                        </Col>
                    </Row>
                    </Form.Group>
                </Col>
                </Row>

                <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                    <Form.Label>Ljuskälla</Form.Label>
                    <Row>
                        {["Ej angivet", "LED", "Halogen", "Fluorescerande", "Glödlampa", "Övrigt"].map((option, index) => (
                        <Col key={index} xs={6} sm={4} md={3}>
                            <Form.Check
                            inline
                            type="radio"
                            label={option}
                            name="light_source"
                            value={option}
                            checked={formData.light_source === option}
                            onChange={handleInputChange}
                            onClick={handleStopPropagation}
                            />
                        </Col>
                        ))}
                    </Row>
                    </Form.Group>
                </Col>
                </Row>

                <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                    <Form.Label>Färgtemperatur</Form.Label>
                    <Row>
                        {["Ej angivet", 2700, 3000, 3500, 4100, 5000, 6500].map((temp, index) => (
                        <Col key={index} xs={6} sm={4} md={3}>
                            <Form.Check
                            inline
                            type="radio"
                            label={`${temp}K`}
                            name="color_temp"
                            value={`${temp}K`}
                            checked={formData.color_temp === `${temp}K`}
                            onChange={handleInputChange}
                            onClick={handleStopPropagation}
                            />
                        </Col>
                        ))}
                    </Row>
                    </Form.Group>
                </Col>
                </Row>

                <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                    <Form.Label>IP-klassning</Form.Label>
                    <Row>
                        {[0, 1].map((ip_class, index) => (
                        <Col key={index} xs={6} sm={4} md={3}>
                            <Form.Check
                            inline
                            type="radio"
                            label={`IP${ip_class}`}
                            name="ip_class"
                            value={`IP${ip_class}`}
                            checked={formData.ip_class === `IP${ip_class}`}
                            onChange={handleInputChange}
                            onClick={handleStopPropagation}
                            />
                        </Col>
                        ))}
                    </Row>
                    </Form.Group>
                </Col>
                </Row>
                <Button type="submit">Skicka</Button>
            </Form>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}