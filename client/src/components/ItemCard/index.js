import React, { useState } from "react";
import { Button, Modal } from "react-materialize";
import API from "../../utils/API";
import DeleteIcon from "@material-ui/icons/Delete";
import ReactTooltip from "react-tooltip";
import "./style.css";

const ItemCard = (props) => {

  const [openDeleteModal, setOpenDeleteModal ] = useState(false)

  return (
    <div>
    {/* <CollectionItem>
      <Row className="valign-wrapper">
        <Col m={4} s={12} className="left-align">
          <img
            alt=""
            className="circle"
            style={{ height: "150px", width: "150px" }}
            src={props.imageURL}
          />
        </Col>
        <Col m={6} s={12}>
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
            <Col m={1} s={12}>
     
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
                <ReactTooltip place="bottom" type="light" effect="float" />
              </a>
            </Col>
            <Col m={1} s={6}>
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
      </Row>
    </CollectionItem> */}
    <div class="card itemCard">
        <div class="card-image">
          <img src={props.imageURL} className="itemCardImage" draggable="false" />
          <span class="card-title itemCardTitle"  style={{
              height: "70px",
              lineHeight: "70px",
              paddingLeft: "0px",
              fontFamily: "proxima-nova, sans-serif",
              fontWeight: "700",
              fontStyle: "normal",
              fontSize: "20px",
              color: "#025159",
            }}>{props.itemName}</span>
        </div>
        <div class="card-content">
          <a className="secondary-content cardSwapButton" href={`/swipping/${props.id}/${props.userData.googleId}`}>
            <img
              src="/img/S-logoBtn-vector.png"
              onClick={() => API.handleUseItem(props.id)}
              style={{ height: "65px" }}
              alt="swap logo"
              data-tip="Swap your Item"
            />
            <ReactTooltip place="bottom" type="light" effect="float" />
          </a>
          <Button
            className="btn-floating btn-large cardDeleteButton"
            onClick={() => setOpenDeleteModal(true)}
            style={{ backgroundColor: "#F20505" }}
            data-tip="Delete Item"
          >
            <i className="material-icons">delete</i>
          </Button>
        </div>
    </div>
    <Modal
        open={openDeleteModal}
        className='center-align modal'
        actions={[]}
        >
        <h3>Are you sure you want to do that?</h3>
        <br></br>
        <div>If you delete this item it will be gone forever!</div>
        <br></br><br></br>
        <a>
          <Button id="modalBtn" modal="close" onClick={() => {
              API.deleteItem(props.id).then((results) => {
                props.loadItems();
              });
            }}
          >Delete</Button>
        </a>
        <br></br><br></br>
        <a>
          <Button id="modalBtn" onClick={() => setOpenDeleteModal(false)} modal="close" >Cancel</Button>
        </a>
        <br></br>
    </Modal>
    </div>

            
  );
};
export default ItemCard;
