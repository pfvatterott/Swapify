import React, {useState } from "react";
import { Col, Row} from 'react-materialize';
import MatchesSideBar from "../components/MatchesSideBar"
import ChatRoom from "../components/ChatRoom"
import "./style.css"
import chatContext from "../utils/chatContext";

function ChatApp() {

    const [chatId, setChatId] = useState('empty')
    const [recentText, setRecentText] = useState('')

    function setChat(id) {
        setChatId(id)
    }

    function setNewText(text) {
        setRecentText(text)
    }

    return (
        <chatContext.Provider value={{chatId, recentText, setChat, setNewText }}>
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