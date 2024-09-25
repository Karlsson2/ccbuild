import { useEffect, useState } from "react";
import { Row, Col, Form, Modal, Button, Card, Container } from "react-bootstrap";
import { supabase } from "../utils/supabase";
import '../index.css'
import arrowUp from "../assets/arrow-up.svg"

export default function ItemsLoopFormDropdown ({ formData, setFormData }) {
    const [isExpanded, setIsExpanded] = useState(false);


    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
      };

      const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === "checkbox" ? checked : value === "true" ? true : value === "false" ? false : value;
        
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: newValue,
        }));
      };

    return (
        <>
            <Container className="bg-gray br-8 hover-pointer p-4"
            onClick={toggleExpansion}>
              <Row className="d-flex justify-content-center">
                <Col>
                  <h2>
                      Hantering för marknadsplats
                  </h2>
                  </Col>
                  <Col xs="auto">
                  <img 
                    src={arrowUp}
                    alt="Arrow Up"
                    height={40}
                    className={`d-flex justify-content-end arrow-up ${isExpanded ? 'expanded' : ''}`}
                    onClick={() => setIsExpanded(!isExpanded)} 
                  />
                  </Col>
               </Row>
            </Container>
            {isExpanded && (
                <Container md={8} className="mt-4">
                  <Form.Group>
                    <Form.Label>Välj marknadsplats status</Form.Label>
                    <Form.Select
                name="market_place"
                value={formData.market_place}
                onChange={handleInputChange}
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
                  </Form.Group>
          
                  <Form.Text className="text-muted">
                    Alla priser ska anges exklusive moms
                  </Form.Text>
          
                  <Form.Group className="mt-4">
                    <Form.Label>Nypris / st</Form.Label>
                    <Row>
                      <Col>
                        <Form.Control 
                        type="number"
                        name="purchase_price"
                        value={formData.purchase_price}
                        onChange={handleInputChange}
                        placeholder="Pris" />
                      </Col>
                      <Col>
                        <Button variant="primary">Uppskatta pris</Button>
                      </Col>
                    </Row>
                  </Form.Group>
          
                  <Row md={3} className="mt-4">
                    <Col>
                      <Form.Group>
                        <Form.Label>Externt pris / st</Form.Label>
                        <Form.Control 
                        type="number"
                        name="external_price"
                        value={formData.external_price}
                        onChange={handleInputChange}
                        placeholder="Pris" />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Internt pris / st</Form.Label>
                        <Form.Control 
                        type="number" 
                        name="internal_price"
                        value={formData.internal_price}
                        placeholder="Pris" />
                      </Form.Group>
                    </Col>
                    <Col className="d-flex align-items-end mb-2">
                    <Form.Group>
                        <Form.Check 
                        inline
                        type="checkbox"
                        label="Låt köparen föreslå pris" 
                        name="suggest_price"
                        checked={formData.suggest_price}
                        onChange={handleInputChange}
                        />
                          
                    </Form.Group>
                    </Col>
                  </Row>
          
                  <Row>
                    <Col className="d-flex flex-direction-row gap-2 mt-4">
                      <Form.Group>
                        <Form.Check 
                        type="checkbox" 
                        name="can_pickup"
                        checked={formData.can_pickup}
                        onChange={handleInputChange}
                        label="Kan hämtas på plats" />
                      </Form.Group>
                  
                      <Form.Group>
                        <Form.Check 
                        type="checkbox" 
                        name="can_send"
                        checked={formData.can_send}
                        onChange={handleInputChange}
                        label="Kan skickas med frakt" />
                      </Form.Group>
                    </Col>
                  </Row>
          
                  <Form.Group className="mt-4">
                    <Form.Label>Adress</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Upphämtningsadress" />
                  </Form.Group>
          
                  <Row className="mt-4">
                    <Col>
                      <Form.Group>
                        <Form.Label>Postkod</Form.Label>
                        <Form.Control 
                        type="text" 
                        name="postcode"
                        value={formData.postcode}
                        onChange={handleInputChange}
                        placeholder="Postkod för upphämtning" />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Postort</Form.Label>
                        <Form.Control 
                        type="text" 
                        name="post_city"
                        value={formData.post_city}
                        onChange={handleInputChange}
                        placeholder="Ort för upphämtning" />
                      </Form.Group>
                    </Col>
                  </Row>
          
                  <Form.Group className="mt-4">
                    <Form.Label>Kommentar</Form.Label>
                    <Form.Control 
                    as="textarea" 
                    name="comment"
                    value={formData.comment}
                    onChange={handleInputChange}
                    rows={3} 
                    placeholder="Ange kompletterande information och eventuella garantier, tex om kostnader tillkommer för demontering och frakt, samt möjliga betalningsmetoder såsom faktura eller andra betalsätt." />
                  </Form.Group>
          
                  <Form.Group className="mt-4">
                    <Form.Label>Kontaktperson</Form.Label>
                    <Form.Control as="select"
                    name="contact_person"
                    value={formData.contact_person}
                    onChange={handleInputChange}
                    placeholder="Kontaktperson"
                    >
                      <option>Välj kontaktperson</option>
                      <option>John Doe</option>
                      <option>Doe John</option>
                    </Form.Control>
                  </Form.Group>
          
                  <h2 className="mt-4">Produktinformation</h2>
                  <Form.Group>
                    <Form.Label>Tillverkare/leverantör</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="manufacturer"
                    value={formData.manufacturer}
                    onChange={handleInputChange}
                    placeholder="Ange tillverkare eller leverantör" />
                  </Form.Group>
          
                  <Form.Group className="mt-4">
                    <Form.Label>Artikelnummer</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="article_number"
                    value={formData.article_number}
                    onChange={handleInputChange}
                    placeholder="Ange tillverkarens/leverantörens artikelnummer" />
                  </Form.Group>
          
                  <Row className="mt-4">
                    <Col>
                      <Form.Group>
                        <Form.Label>Tillverkningsår</Form.Label>
                        <Form.Control 
                        type="number" 
                        name="manufacturing"
                        value={formData.manufacturing}
                        onChange={handleInputChange}
                        placeholder="Ange uppskattat tillverkningsår" />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Inköpsår</Form.Label>
                        <Form.Control 
                        type="number" 
                        name="purchase_year"
                        value={formData.purchase_year}
                        onChange={handleInputChange}
                        placeholder="Uppskatta inköpsår" />
                      </Form.Group>
                    </Col>
                  </Row>
          
                  <Form.Group className="mt-4">
                    <Form.Label>GTIN</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="gtin"
                    value={formData.gtin}
                    onChange={handleInputChange}
                    placeholder="Ange GTIN om GTIN finns/är känt" />
                  </Form.Group>
          
                  <Row className="mt-4">
                    <Col>
                      <Form.Group>
                        <Form.Label>RSK</Form.Label>
                        <Form.Control 
                        type="text" 
                        name="rsk"
                        value={formData.rsk}
                        onChange={handleInputChange}
                        placeholder="Relevant för elektronik och VVS" />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>E-NR</Form.Label>
                        <Form.Control 
                        type="text" 
                        name="enr"
                        value={formData.enr}
                        onChange={handleInputChange}
                        placeholder="Relevant för elektronik och VVS" />
                      </Form.Group>
                    </Col>
                  </Row>
          
                  <Row className="mt-4">
                    <Col>
                      <Form.Group>
                        <Form.Label>BSAB</Form.Label>
                        <Form.Control 
                        type="text"
                        name="bsab"
                        value={formData.bsab}
                        onChange={handleInputChange}
                        placeholder="Ange BSAB-kod om känt/relevant. Används för att underlätta klass" />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>BK04</Form.Label>
                        <Form.Control 
                        type="text" 
                        name="bkfour"
                        value={formData.bkfour}
                        onChange={handleInputChange}
                        placeholder="Ange BSAB-kod om känt/relevant. Används för att underlätta klass" />
                      </Form.Group>
                    </Col>
                  </Row>
          
              </Container>
            )}
        </>
    )
}