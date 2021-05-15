
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
            <a
                className="secondary-content"
                href="/swiping"
            >
            <Button onClick={() => API.handleUseItem(props.id)}/>
            </a>

        </CollectionItem>
    )
}
export default ItemCard;