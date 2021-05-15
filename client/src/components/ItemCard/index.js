
import React from "react";
import { Button, Card, CollectionItem } from 'react-materialize';
import API from "../../utils/API"

const ItemCard = (props) => {
    return (

        <CollectionItem className="avatar">
            <img
                alt=""
                className="circle"
                src={props.imageURL}
            />
            <span className="title">
                {props.itemName}
            </span>
            <span className="title">
                {props.itemDescription}
            </span>
            <a
                className="secondary-content"
                href="/swipping"
            >
            <Button onClick={() => API.handleUseItem(props.id)} style= {{backgroundColor:"#F28705"}}>Swap</Button>
            </a>

        </CollectionItem>
    )
}
export default ItemCard;