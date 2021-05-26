import React from "react";
import { Button, CollectionItem, Col } from "react-materialize";
import API from "../../utils/API";
<<<<<<< Updated upstream
import ReactTooltip from 'react-tooltip'; 
=======
import DeleteIcon from "@material-ui/icons/Delete";
import ReactTooltip from 'react-tooltip';
// import "./style.css";

>>>>>>> Stashed changes

const ItemCard = (props) => {
    return (
        <CollectionItem className=" valign-wrapper">
                <Col m={2} s={2}>
                    <img
                        alt=""
                        className="circle"
                        style={{ height: "150px", width: "150px" }}
                        src={props.imageURL}
                    />
                </Col>
                <Col m={7} s={7}>
                    <span
                        className="title"
                        style={{
                            height: "70px",
                            lineHeight: "70px",
                            paddingLeft: "0px",
                            fontFamily: "proxima-nova, sans-serif",
                            fontWeight: "700",
                            fontStyle: "normal",
                            fontSize: "20px",
                            color: "#025159",
                        }}
                    >
                        {props.itemName}
                    </span>

                    <span
                        className="description"
                        style={{
                            height: "70px",
                            lineHeight: "70px",
                            paddingLeft: "20px",
                            fontFamily: "proxima-nova, sans-serif",
                            fontWeight: "100",
                            fontStyle: "normal",
                            color: "#025159",
                        }}
                    >
                        {props.itemDescription}
                    </span>
                </Col>

                <Col m={1} s={1}>
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
                        <img
                            src="/img/S-logoBtn-vector.png"
                            onClick={() => API.handleUseItem(props.id)}
                            style={{ height: "65px" }}
                            alt="swap logo"
                            data-tip="Swap your Item"
                        />
                        <ReactTooltip place="bottom" type="light" effect="float"/>

                    </a>
                </Col>
                <Col m={1} s={1}>
                    <Button
                        className="btn-floating btn-large"
                        onClick={() => {
                            API.deleteItem(props.id).then((results) => {
                                props.loadItems();
                            });
                        }}
                        style={{ backgroundColor: "#F20505" }}
                        data-tip="Delete Item"
                    >
                        <i className="material-icons">delete</i>
                    </Button>
                </Col>
        </CollectionItem>
    );
};
export default ItemCard;
