import { useEffect, useState } from "react";
import { Row, Col, Form, Modal, Button, Card, Container } from "react-bootstrap";
import { supabase } from "../utils/supabase";

export default function ItemsLoopFormDropdown ({ formData, setFormData }) {
    const [isExpanded, setIsExpanded] = useState(false);


    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
      };

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

    return (
        <>
            <Container onClick={toggleExpansion}>
                <h2>
                    Hantering för marknadsplats
                </h2>
            </Container>
            {isExpanded && (
                <Container>
                    <Form>
                        <input type="text" />
                    </Form>
                </Container>
            )}
        </>
    )
}