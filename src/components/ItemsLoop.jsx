import React, {useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import {Col, Row, Form} from "react-bootstrap"

import ItemsLoopForm from "./ItemsLoopForm";


export default function ItemsLoop({ items, handleDeleteItem, productId }) {

  return (
    <>
      <div style={{display: 'flex', flexDirection: 'row', width: 'full'}}>
        <div style={{display: 'flex', flexDirection: 'row', fontSize:'12px'}}>
          <Form.Check style={{marginLeft: '0px'}} type="checkbox" />
          <p style={{marginTop: '4px', marginLeft: '5px', marginRight:'20px'}}>Välj alla</p>
        </div>
        <div style={{width:'9%', fontWeight: 'bold'}}>
          <p>Antal (st)</p>
        </div>
        <div style={{width:'26%', fontWeight: 'bold'}}>
          <p>Status</p>
        </div>
        <div style={{width:'32%', fontWeight: 'bold'}}>
          <p>Marknadsplatsstatus</p>
        </div>
        <div style={{width:'25%', fontWeight: 'bold'}}>
          <p>Klimatbesparing</p>
        </div>

        {/* <div style={{display: 'flex', flexDirection: 'row',}}>
        <div style={{display: 'flex', flexDirection: 'row', fontSize:'12px'}}>
          <Form.Check style={{marginLeft: '0px'}} type="checkbox" />
          <p style={{marginTop: '4px', marginLeft: '5px'}}>Välj alla</p>
        </div>
        <div style={{marginLeft: '16px', fontWeight: 'bold'}}>
          <p>Antal (st)</p>
        </div>
        <div style={{marginLeft: '50px', fontWeight: 'bold'}}>
          <p>Status</p>
        </div>
        <div style={{marginLeft: '276px', fontWeight: 'bold'}}>
          <p>Marknadsplatsstatus</p>
        </div>
        <div style={{marginLeft: '256px', fontWeight: 'bold'}}>
          <p>Klimatbesparing</p>
        </div> */}

      </div>
      {items.length > 0 ? (
        items.map((item) => (
          <ItemsLoopForm items={item} key={item.id} handleDeleteItem={handleDeleteItem} />
        ))
      ) : (
        <p>Inga typer av denna produkt finns ännu!</p>
      )}
    </>
  );
}