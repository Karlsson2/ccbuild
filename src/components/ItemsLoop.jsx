import React, {useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

import ItemsLoopForm from "./ItemsLoopForm";


export default function ItemsLoop({ items, handleDeleteItem, productId }) {

  return (
    <>
      {items.length > 0 ? (
        items.map((item) => (
          <ItemsLoopForm items={item} key={item.id} handleDeleteItem={handleDeleteItem} />
        ))
      ) : (
        <p>No items found.</p>
      )}
    </>
  );
}