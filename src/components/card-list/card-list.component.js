import React from "react";
import { Card } from "../card/card.component";
import "../Modal/modal.styles.css";
import "./card-list.styles.css";

export const CardList = (props) => (
  <div className="grid">
    {props.data.map((element, index) => (
      <Card
        key={index}
        element={element}
        parentCallback={props.parentCallback}
      />
    ))}
  </div>
);
