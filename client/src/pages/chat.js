import React, {useState, useContext} from "react";
import { Button, Col, Row, CollectionItem, Collection } from 'react-materialize';
import MatchesSideBar from "../components/MatchesSideBar"
import ChatRoom from "../components/ChatRoom"
import "./style.css"

function ChatApp() {


    return (
        <div>
            <Row>
                <Col s={0} m={3}>
                    <MatchesSideBar />
                </Col>
                <Col s={12} m={9}>
                    <ChatRoom />
                </Col>
            </Row>
        </div>
    )

}

export default ChatApp;