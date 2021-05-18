import React, {useState } from "react";
import { Col, Row} from 'react-materialize';
import MatchesSideBar from "../components/MatchesSideBar"
import ChatRoom from "../components/ChatRoom"
import "./style.css"
import chatContext from "../utils/chatContext";

function ChatApp() {

    const [chatId, setChatId] = useState('check')

    function setChat(id) {
        setChatId(id)
    }

    return (
        <chatContext.Provider value={{chatId, setChat }}>
            <Row>
                <Col s={0} m={3}>
                    <MatchesSideBar />
                </Col>
                <Col s={12} m={9}>
                    <ChatRoom />
                </Col>
            </Row>
        </chatContext.Provider>
    )

}

export default ChatApp;