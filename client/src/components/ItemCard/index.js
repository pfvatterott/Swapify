
import React from "react";
import { Button, Card, CollectionItem } from 'react-materialize';
import API from "../../utils/API"
import DeleteIcon from '@material-ui/icons/Delete';

const ItemCard = (props) => {
    return (

        <CollectionItem className="avatar valign-wrapper">
            <img
                alt=""
                className="circle"
                style={{height:"56px", width: "56px"
            }}
                src={props.imageURL}
            />
            <span className="title" style={{height: "70px", lineHeight: "70px", paddingLeft: "20px", fontFamily: "proxima-nova, sans-serif", fontWeight: "700", fontStyle: "normal", fontSize: "20px"}}>
                {props.itemName}
            </span>
            <span className="description" style={{height: "70px", lineHeight: "70px",paddingLeft: "20px", fontFamily: "proxima-nova, sans-serif",fontWeight: "100",fontStyle: "normal"}}>   
                {props.itemDescription}
            </span>
            
            <a
                className="secondary-content"
                href="/swipping"
            >
            <Button className = "btn-floating btn-large" onClick={() => API.handleUseItem(props.id)} style= {{backgroundColor:"#O3A696",marginRight: "100px" }}>Swap</Button>
            </a>
            
            <Button className = "btn-floating btn-large" onClick={() => {
                
                API.deleteItem(props.id).then(results=>{
                    props.loadItems()
                })
                
                }} style= {{backgroundColor:"#F20505", }}><DeleteIcon/></Button>
            

        </CollectionItem>
    )
}
export default ItemCard;