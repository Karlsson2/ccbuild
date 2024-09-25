import { useEffect, useState } from "react";
import { Row, Col, Form, Modal, Button, Card, Container, Tooltip, OverlayTrigger, } from "react-bootstrap";
import { supabase } from "../utils/supabase";
import ItemsLoopFormDropdown from "./ItemsLoopFormDropdown";
import arrowUp from "../assets/arrow-up.svg"
import bin from "../assets/recycle-bin.png"
import { faPencil, faInfo, faLeaf, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";


export default function ItemsLoopForm({ items: initialItems, handleDeleteItem }) {
  const [formData, setFormData] = useState(initialItems || {});
  const [isExpanded, setIsExpanded] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value === "true" ? true : value === "false" ? false : value;
    
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
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
        toggleExpansion();

      }
    } catch (err) {
      console.error('An error occurred during submission:', err);
    }
  };

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Container className="mb-3 ">
      <div className="d-flex align-items-center hover-pointer border rounded p-3 cursor-pointer" onClick={toggleExpansion}>
        <Form method="POST" id="form1" onSubmit={handleSubmit} className="w-100">
          <Row className="align-items-center justify-content-between w-100 p-1">
            <Col xs="auto">
              <Form.Check 
              type="checkbox"
              onClick={(e) => e.stopPropagation()} />
            </Col>
            <Col xs={1}>
              <Form.Control
                type="number"
                name="amount"
                value={formData.amount}
                min={1}
                onChange={handleInputChange}
                onClick={(e) => e.stopPropagation()}
                
              />
            </Col>
            <Col xs={3}>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                onClick={(e) => e.stopPropagation()}
              
              >
                <option>Välj status</option>
                <option>Ej publicerad</option>
                <option>Publicerad som intern annons</option>
                <option>Publicerad som extern annons</option>
                <option>Reserverad</option>
                <option>Såld</option>
                <option>Avpublicerad</option>
                <option>Automatiskt avpublicerad</option>
              </Form.Select>
            </Col>
            <Col xs={4}>
              <Form.Select
                name="market_place"
                value={formData.market_place}
                onChange={handleInputChange}
                onClick={(e) => e.stopPropagation()}
              
              >
                <option>Välj marknadsplatsstatus</option>
                <option>Inventerad</option>
                <option>Inventerad - i lager/förråd</option>
                <option>Inventerad i byggnad</option>
                <option>Mängdad</option>
                <option>Mängdad - i byggnad</option>
                <option>Mängdad - i lager/förråd</option>
                <option>På rekonditionering</option>
                <option>I lager</option>
                <option>Bevarad</option>
                <option>Återbrukad i projektet</option>
                <option>Återbrukad inom organisationen</option>
                <option>Återbrukad av externt av annan aktör</option>
                <option>Avfallshanterad</option>
              </Form.Select>
            </Col>
            <Col xs="auto" style={{ border: "1px solid green", borderRadius: "700px", padding: "2px 12px"  }}>
              <span className="text-success">
                400 kg CO2e
              </span>
            </Col>
            <Col xs="auto">
              <div className="hover-pointer" onClick={(e) => {handleShow(); e.stopPropagation();}}>
                <img className="mb-1" src={bin} width={18} alt="H" />
                <i className="bi bi-trash"></i> Ta bort
              </div>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Radera item</Modal.Title>
                </Modal.Header>
                <Modal.Body>Vill du verkligen radera detta item</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={(e) => {handleClose(); e.stopPropagation();}}>
                    Stäng
                  </Button>
                  <Button variant="primary" onClick={() => { handleDeleteItem(initialItems.id); handleClose(); }}>
                    Ja
                  </Button>
                </Modal.Footer>
              </Modal>
              </Col>
              <Col xs="auto">
              <img 
                src={arrowUp}
                alt="Arrow Up"
                width={25}
                className={`d-flex justify-content-end arrow-up ${isExpanded ? 'expanded' : ''}`}
                onClick={() => setIsExpanded(!isExpanded)} 
               />
            </Col>
          </Row>
        

      <div className={`card-collapse ${isExpanded ? 'expanded' : ''}`}>
        <Container className="mt-3 p-4" onClick={(e) => e.stopPropagation()}>
            
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Estetiskt skick</Form.Label>
                    <Form.Select
                      name="aesthetic"
                      value={formData.aesthetic}
                      onChange={handleInputChange}
                    
                    >
                      <option value="">Välj estetiskt skick</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
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
                    
                    >
                      <option value="">Välj funktionellt skick</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
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
                    
                    >
                      <option value="Ej angivet">Välj</option>
                      <option>Enkel att demontera/demontering krävs ej</option>
                      <option>Begränsad demonterbarhet</option>
                      <option>Går ej att demontera</option>
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
                    
                    >
                      <option>Välj</option>
                      <option>Dålig</option>
                      <option>Okej</option>
                      <option>Bra</option>
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
                      name="unit_weight"
                      value={formData.unit_weight}
                      onChange={handleInputChange}
                     
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
                      value={formData.unit_dimensions}
                      onChange={handleInputChange}
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
                      
                    >
                        <option value="Ej angivet">Välj material</option>
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
                      
                    >
                        
                        <option value="Ej angivet">Välj finish</option>
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
                <Col md={2}>
                    <Form.Group className="mb-3">
                    <Form.Label>CE-märkning</Form.Label>
                    <Row>
                    <Col>
                    <Form.Check
                          inline
                          type="radio"
                          label="Nej"
                          name="ce_mark"
                          value={false}
                          checked={formData.ce_mark === false}
                          onChange={handleInputChange}
                      />
                  </Col>
                  <Col>
                      <Form.Check
                          inline
                          type="radio"
                          label="Ja"
                          name="ce_mark"
                          value={true}
                          checked={formData.ce_mark === true}
                          onChange={handleInputChange}
                      />
                  </Col>
                    </Row>
                    </Form.Group>
                </Col>
                </Row>

                <Col md={9}>
                    <Form.Group className="mb-3">
                    <Form.Label>Ljuskälla</Form.Label>
                    <Row>
                        {["Ej angivet", "LED", "Halogen", "Fluorescerande", "Glödlampa", "Övrigt"].map((option, index) => (
                        <Col key={index}>
                            <Form.Check
                            inline
                            type="radio"
                            label={option}
                            name="light_source"
                            value={option}
                            checked={formData.light_source === option}
                            onChange={handleInputChange}
                          
                            />
                        </Col>
                        ))}
                    </Row>
                    </Form.Group>
                </Col>

                
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Färgtemperatur</Form.Label>
                     
                      <div className="d-flex flex-wrap">
                        {['Ej angivet', '2700K', '3000K', '3500K', '4100K', '5000K', '6500K'].map((temp, index) => (
                          <div key={index} className="me-2 mb-2">
                            <Form.Check
                              inline
                              type="radio"
                              label={`${temp}`}
                              name="color_temp"
                              value={`${temp}`}
                              checked={formData.color_temp === `${temp}`}
                              onChange={handleInputChange}
                            />
                          </div>
                        ))}
                      </div>
                    </Form.Group>
                  </Col>
                

                <Row>
                <Col md={12}>
                    <Form.Group className="mb-3">
                    <Form.Label>IP-klassning</Form.Label>
                    <Row>
                        {['Ej angivet', 'IP20', 'IP23', 'IP43/44/45', 'IP54/55', 'IP66', 'IP67', 'IP68'].map((ip_class, index) => (
                        <Col key={index}  >
                            <Form.Check
                            inline
                            type="radio"
                            label={`${ip_class}`}
                            name="ip_class"
                            value={`${ip_class}`}
                            checked={formData.ip_class === `${ip_class}`}
                            onChange={handleInputChange}
                          
                            />
                        </Col>
                        ))}
                    </Row>
                    </Form.Group>
                </Col>
                </Row>
                <ItemsLoopFormDropdown formData={formData} setFormData={setFormData} />
                <Button variant="outline-primary" className="mt-3" type="submit">
                  Spara
                </Button>
            
        </Container>
        </div>
        </Form>
      </div>
    </Container>
    
  );
}