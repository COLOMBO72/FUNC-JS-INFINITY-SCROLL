import React from "react";
import "../styles.css";

const Item = ({ object }) => {
  return (
    <div className="image__wrapper">
      <img src={object.url} alt="image__object" />
      <h2>{object.title}</h2>
    </div>
  );
};

export default Item;
