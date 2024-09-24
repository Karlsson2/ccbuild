import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { supabase } from "../utils/supabase";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal"
import ItemsLoopForm from "./ItemsLoopForm";


export default function ItemsLoop({ items, setItems, setShowItems }) {

  useEffect(() => {
    const fetchData = async () => {
      try {
        let { data: fetchedItems, error } = await supabase
          .from("items")
          .select("*");
        if (error) {
          console.error("Error fetching data:", error);
        } else {
          console.log("Fetched Items:", fetchedItems);
          setItems(fetchedItems);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    fetchData();
  }, [setItems]);

  return (
    <>
      {items.map((item) => (
        <ItemsLoopForm 
        items={item} 
        key={item.id} 
        />
      ))}
    </>
  );
}