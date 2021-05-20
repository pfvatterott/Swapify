import React, {useState } from "react";
import { Col, Row} from 'react-materialize';
import MatchesSideBar from "../components/MatchesSideBar"
import ChatRoom from "../components/ChatRoom"
import "./style.css"
import API from "../utils/API"
import chatContext from "../utils/chatContext";
const userData = JSON.parse(localStorage.getItem('userData'))

function ChatApp() {

    const [chatId, setChatId] = useState('empty')
    const [recentText, setRecentText] = useState('')
    const [notNewText, setNotNewText] = useState(2)

    function setChat(id) {
        setChatId(id)
        API.getMatch(id.matchId).then((res) => {
            if ((userData.googleId === res.data.item1Owner) && (res.data.item1NewText === true)) {
                const matchData = {
                    item1NewText: false
                }
                API.updateUserMatch(id.matchId, matchData)
                setNotNewText(Math.floor(Math.random() * 100000))
            }
            else if ((userData.googleId === res.data.item2Owner) && (res.data.item2NewText === true)) {
                const matchData = {
                    item2NewText: false
                }
                API.updateUserMatch(id.matchId, matchData)
                setNotNewText(Math.floor(Math.random() * 100000))
            }
        })
    }

    function setNewText(text) {
        setRecentText(text)
    }

    return (
        <chatContext.Provider value={{chatId, recentText, setChat, setNewText }}>
            <Row>
                <Col s={0} m={3}>
                    <MatchesSideBar newText={notNewText} />
                </Col>
                <Col s={12} m={9}>
                    <ChatRoom />
                </Col>
            </Row>
        </chatContext.Provider>
    )

}

export default ChatApp;