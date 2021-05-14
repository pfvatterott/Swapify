import React from "react";


export const Item=(props)=> {
  return (
      <div>
          <h3>{props.itemName}</h3>
          <h3>{props.itemURL}</h3>
          <h3>{props.itemDescription}</h3>
      </div> 
  );
}

export default Item;