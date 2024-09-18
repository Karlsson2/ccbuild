import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import { supabase } from "../utils/supabase";
import {
  statuses,
  marketPlaces,
  demountabilities,
  accessibilities,
} from "../utils/constants";

function Items({ itemId, productId, setShowItems }) {
  const [itemData, setItemData] = useState([]);
  const [itemAmount, setItemAmount] = useState(0);
  const [itemStatus, setItemStatus] = useState("");
  const [itemMarketPlace, setItemMarketPlace] = useState("");
  const [itemDateAvailable, setItemDateAvailable] = useState("");
  const [itemDateDelivery, setItemDateDelivery] = useState("");
  const [itemDemountability, setItemDemountability] = useState("");
  const [itemAccessibility, setItemAccessibility] = useState("");
  const [itemDemountabilityComment, setItemDemountabilityComment] =
    useState("");
  const [itemAccessibilityComment, setItemAccessibilityComment] = useState("");
  const [itemLocation1, setItemLocation1] = useState("");
  const [itemLocation2, setItemLocation2] = useState("");
  const [itemLocation3, setItemLocation3] = useState("");
  const [itemLocation4, setItemLocation4] = useState("");
  const [itemDesignation1, setItemDesignation1] = useState("");
  const [itemDesignation2, setItemDesignation2] = useState("");
  const [itemDesignation3, setItemDesignation3] = useState("");
  const [itemDesignation4, setItemDesignation4] = useState("");

  const handleAmountChange = (e) => setItemAmount(e.target.value);
  const handleStatusChange = (e) => setItemStatus(e.target.value);
  const handleMarketPlaceChange = (e) => setItemMarketPlace(e.target.value);
  const handleDateAvailableChange = (e) => setItemDateAvailable(e.target.value);
  const handleDateDeliveryChange = (e) => setItemDateDelivery(e.target.value);
  const handleDemountabilityChange = (e) =>
    setItemDemountability(e.target.value);
  const handleAccessibilityChange = (e) => setItemAccessibility(e.target.value);
  const handleDemountabilityCommentChange = (e) =>
    setItemDemountabilityComment(e.target.value);
  const handleAccessibilityCommentChange = (e) =>
    setItemAccessibilityComment(e.target.value);
  const handleLocation1Change = (e) => setItemLocation1(e.target.value);
  const handleLocation2Change = (e) => setItemLocation2(e.target.value);
  const handleLocation3Change = (e) => setItemLocation3(e.target.value);
  const handleLocation4Change = (e) => setItemLocation4(e.target.value);
  const handleDesignation1Change = (e) => setItemDesignation1(e.target.value);
  const handleDesignation2Change = (e) => setItemDesignation2(e.target.value);
  const handleDesignation3Change = (e) => setItemDesignation3(e.target.value);
  const handleDesignation4Change = (e) => setItemDesignation4(e.target.value);

  const closeItems = () => {
    setShowItems(null);
  };

  // Fetch item data from Supabase for item with itemId
  const fetchItem = async () => {
    const { data, error } = await supabase
      .from("items")
      .select("*")
      .eq("id", itemId);
    if (error) console.log("error", error);
    else setItemData(data);

    if (data && data.length > 0) {
      // Set item data to state only if data is not empty
      setItemData(data);
      setItemAmount(data[0].amount);
      setItemStatus(data[0].status);
      setItemMarketPlace(data[0].market_place);
      setItemDateAvailable(data[0].date_available);
      setItemDateDelivery(data[0].date_delivery);
      setItemDemountability(data[0].demountability);
      setItemAccessibility(data[0].accessibility);
      setItemDemountabilityComment(data[0].demountability_comment);
      setItemAccessibilityComment(data[0].accessibility_comment);
      setItemLocation1(data[0].location_1);
      setItemLocation2(data[0].location_2);
      setItemLocation3(data[0].location_3);
      setItemLocation4(data[0].location_4);
      setItemDesignation1(data[0].designation_1);
      setItemDesignation2(data[0].designation_2);
      setItemDesignation3(data[0].designation_3);
      setItemDesignation4(data[0].designation_4);
    } else {
      console.log("No item data found");
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // If itemId is "new", create a new item, else use itemId to update the existing item
    if (itemId === "new") {
      const { data, error } = await supabase.from("items").upsert([
        {
          product_id: productId,
          amount: itemAmount,
          status: itemStatus,
          market_place: itemMarketPlace,
          date_available: itemDateAvailable,
          date_delivery: itemDateDelivery,
          demountability: itemDemountability,
          accessibility: itemAccessibility,
          demountability_comment: itemDemountabilityComment,
          accessibility_comment: itemAccessibilityComment,
          location_1: itemLocation1,
          location_2: itemLocation2,
          location_3: itemLocation3,
          location_4: itemLocation4,
          designation_1: itemDesignation1,
          designation_2: itemDesignation2,
          designation_3: itemDesignation3,
          designation_4: itemDesignation4,
        },
      ]);
      if (error) console.log("error", error);
      else console.log("Item created successfully");
    } else {
      const { data, error } = await supabase
        .from("items")
        .update({
          amount: itemAmount,
          status: itemStatus,
          market_place: itemMarketPlace,
          date_available: itemDateAvailable,
          date_delivery: itemDateDelivery,
          demountability: itemDemountability,
          accessibility: itemAccessibility,
          demountability_comment: itemDemountabilityComment,
          accessibility_comment: itemAccessibilityComment,
          location_1: itemLocation1,
          location_2: itemLocation2,
          location_3: itemLocation3,
          location_4: itemLocation4,
          designation_1: itemDesignation1,
          designation_2: itemDesignation2,
          designation_3: itemDesignation3,
          designation_4: itemDesignation4,
        })
        .eq("id", itemId);
      if (error) console.log("error", error);
      else console.log("Item updated successfully");
    }
    setShowItems(null);
  };

  return (
    <Container>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formAmount">
            <Form.Label>Antal</Form.Label>
            <Form.Control
              type="number"
              value={itemAmount}
              onChange={handleAmountChange}
            />
          </Form.Group>

          <Form.Group as={Col}></Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Select value={itemStatus} onChange={handleStatusChange}>
              {statuses.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="formMarketPlace">
            <Form.Label>Marknadsplats</Form.Label>
            <Form.Select
              value={itemMarketPlace}
              onChange={handleMarketPlaceChange}
            >
              {marketPlaces.map((marketPlace) => (
                <option key={marketPlace}>{marketPlace}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formDateAvailable">
            <Form.Label>Datum tillgänglig</Form.Label>
            <Form.Control
              type="date"
              value={itemDateAvailable}
              onChange={handleDateAvailableChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formDateDelivery">
            <Form.Label>Datum första möjliga leverans</Form.Label>
            <Form.Control
              type="date"
              value={itemDateDelivery}
              onChange={handleDateDeliveryChange}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formDemountability">
            <Form.Label>Demonterbarhet</Form.Label>
            <Form.Select
              value={itemDemountability}
              onChange={handleDemountabilityChange}
            >
              {demountabilities.map((demountability) => (
                <option key={demountability}>{demountability}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="formAccessibility">
            <Form.Label>Åtkomlighet</Form.Label>
            <Form.Select
              value={itemAccessibility}
              onChange={handleAccessibilityChange}
            >
              {accessibilities.map((accessibility) => (
                <option key={accessibility}>{accessibility}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formDemountabilityComment">
            <Form.Label>Demonterbarhet kommentar</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="Demonterbarhet kommentar"
              value={itemDemountabilityComment}
              onChange={handleDemountabilityCommentChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formAccessibilityComment">
            <Form.Label>Åtkomlighet kommentar</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="Åtkomlighet kommentar"
              value={itemAccessibilityComment}
              onChange={handleAccessibilityCommentChange}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formLocation1">
            <Form.Label>Placering #1</Form.Label>
            <Form.Control
              value={itemLocation1 || ""}
              onChange={handleLocation1Change}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formLocation2">
            <Form.Label>Placering #2</Form.Label>
            <Form.Control
              value={itemLocation2 || ""}
              onChange={handleLocation2Change}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formLocation3">
            <Form.Label>Placering #3</Form.Label>
            <Form.Control
              value={itemLocation3 || ""}
              onChange={handleLocation3Change}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formLocation4">
            <Form.Label>Placering #4</Form.Label>
            <Form.Control
              value={itemLocation4 || ""}
              onChange={handleLocation4Change}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formDesignation1">
            <Form.Label>Beslutsbenämning #1</Form.Label>
            <Form.Control
              value={itemDesignation1 || ""}
              onChange={handleDesignation1Change}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formDesignation2">
            <Form.Label>Beslutsbenämning #2</Form.Label>
            <Form.Control
              value={itemDesignation2 || ""}
              onChange={handleDesignation2Change}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formDesignation3">
            <Form.Label>Beslutsbenämning #3</Form.Label>
            <Form.Control
              value={itemDesignation3 || ""}
              onChange={handleDesignation3Change}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formDesignation4">
            <Form.Label>Beslutsbenämning #4</Form.Label>
            <Form.Control
              value={itemDesignation4 || ""}
              onChange={handleDesignation4Change}
            />
          </Form.Group>
        </Row>

        <Button variant="primary" onClick={closeItems}>
          Stäng
        </Button>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Spara
        </Button>
      </Form>
    </Container>
  );
}

export default Items;
