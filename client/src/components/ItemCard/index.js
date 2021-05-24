
import React from "react";
import { Button, Card, CollectionItem, Col } from 'react-materialize';
import API from "../../utils/API"
import DeleteIcon from '@material-ui/icons/Delete';

const ItemCard = (props) => {
    return (

        <CollectionItem className=" valign-wrapper">
        <Col m={2} s={2}>
            <img
                alt=""
                className="circle"
                style={{height:"60px", width: "60px"
            }}
                src={props.imageURL}
            />
            </Col>
            <Col m={7} s={7}>
            <span className="title" style={{height: "70px", lineHeight: "70px", paddingLeft: "0px", fontFamily: "proxima-nova, sans-serif", fontWeight: "700", fontStyle: "normal", fontSize: "20px", color:"#025159"}}>
                {props.itemName}
            </span>
            
            <span className="description" style={{height: "70px", lineHeight: "70px",paddingLeft: "20px", fontFamily: "proxima-nova, sans-serif",fontWeight: "100",fontStyle: "normal", color:"#025159"}}>   
                {props.itemDescription}
            </span>
            </Col>
            
            <Col m={2} s={2}>
            {/* <a
                className="secondary-content"
                href={`/swipping/${props.id}/${props.userData.googleId}`}
            >
            <Button className = "btn-floating btn-large" onClick={() => API.handleUseItem(props.id)} style= {{backgroundColor:"#O3A696" }}>  <img src="/img/swapifyLogoS-vector.png" style={{height: "30px"}} /></Button>
            </a> */}
            <a
                className="secondary-content"
                href={`/swipping/${props.id}/${props.userData.googleId}`}
            >
            <img src="/img/S-logoBtn.png" onClick={() => API.handleUseItem(props.id)} style={{height:"65px"}}/>
            </a>


            <Button className = "btn-floating btn-large" onClick={() => {
                
                API.deleteItem(props.id).then(results=>{
                    props.loadItems()
                })
                
                }} style= {{backgroundColor:"#F20505", }}><i className="material-icons">delete</i></Button>
            
                </Col>
        </CollectionItem>
    )
}
export default ItemCard;