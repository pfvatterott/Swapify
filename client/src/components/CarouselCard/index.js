
import React from "react";
import { Button, Card, Row, Col, CardTitle, Icon } from 'react-materialize';
import API from "../../utils/API"

const CarouselCard = (props) => {
    return (
        <div className="carousel-item">
            <Card
                actions={[
                    <a key="1" href="#">Delete</a>
                ]}
                closeIcon={<Icon>close</Icon>}
                header={<CardTitle image={props.imageURL}>{props.itemName}</CardTitle>}
                revealIcon={<Icon>more_vert</Icon>}
            >
                {props.itemDescription}
            </Card>
        </div>

        // <CollectionItem className=" valign-wrapper">


        //     <span className="description" style={{height: "70px", lineHeight: "70px",paddingLeft: "20px", fontFamily: "proxima-nova, sans-serif",fontWeight: "100",fontStyle: "normal", color:"#025159"}}>   
        //         {props.itemDescription}
        //     </span>

    )
}
export default CarouselCard;