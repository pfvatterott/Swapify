import React, { useState, useRef, useEffect, useContext } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Col, Row, Button, Modal } from 'react-materialize';
import API from '../../utils/API'
import { firebase, firestore } from "../../utils/firebase"
import ChatMessage from "../ChatMessage"
import chatContext from "../../utils/chatContext"
import "./style.css"

export default function ChatRoom() {
    const userData = JSON.parse(localStorage.getItem('userData'))
    const { chatId } = useContext(chatContext)
    const [messagesRef, setMessagesRef] = useState(firestore.collection('empty'))
    const query = messagesRef.orderBy('createdAt')
    const [messages] = useCollectionData(query, {idField: 'id'})
    const [formValue, setFormValue] = useState('')
    const dummy = useRef()
    const [userItem, setUserItem] = useState({})
    const [otherItem, setOtherItem] = useState({})

    useEffect(() => {
        setMessagesRef(firestore.collection(chatId.matchId || 'empty'))
        API.getMatch(chatId.matchId).then((matchResponse) => {
            if (matchResponse.data.item1Owner === userData.googleId) {
                setUserItem({id: matchResponse.data.item1Owner, photoURL: matchResponse.data.item1Photo})
                setOtherItem({id: matchResponse.data.item2Owner, photoURL: matchResponse.data.item2Photo})
            }
            else {
                setUserItem({id: matchResponse.data.item2Owner, photoURL: matchResponse.data.item2Photo})
                setOtherItem({id: matchResponse.data.item1Owner, photoURL: matchResponse.data.item1Photo})
            }
        })
    }, [chatId])

    const sendMessage = async(e) => {
        e.preventDefault();
        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            sentFromid: userItem.id,
            sentToid: otherItem.id,
            sentFromPhoto: userItem.photoURL,
            setToPhoto: otherItem.photoURL
        })
        setFormValue('')
        dummy.current.scrollIntoView({ behavior: 'smooth' })
    }

    function swapItems() {
        API.getMatch(chatId.matchId).then((matchResponse) => {
            console.log(matchResponse)
            if (matchResponse.data.item1Owner === userData.googleId) {
                API.deleteMatchesForItem(matchResponse.data.item1Id).then((res) => {
                    API.deleteItem(matchResponse.data.item1Id).then((delResponse) => {
                        API.updateItem(matchResponse.data.item2Id, {deleteItem: true}).then((updateRes) => {
                            window.location.reload();
                        })
                    })
                })
            }
            else {
                API.deleteMatchesForItem(matchResponse.data.item2Id).then((res) => {
                    API.deleteItem(matchResponse.data.item2Id).then((delResponse) => {
                        API.updateItem(matchResponse.data.item1Id, {deleteItem: true}).then((updateRes) => {
                            window.location.reload();
                        })
                    })
                })
            }
        })
    }

    function deleteMatch() {
        API.deleteMatch(chatId.matchId).then((res) => {
            window.location.reload();
        })
    }


    return (
        <div className="container chatControls">
            <Row>
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
                <div ref={dummy}></div>
            </Row>
            <Row>
                <form onSubmit={sendMessage}>
                    <Col s={10}>
                    <input value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
                    </Col>
                    <Col s={2}>
                    <button type="submit" class="btn-floating btn-large waves-effect waves-light red sendButton"><i class="material-icons">send</i></button>
                    </Col>
                </form>
            </Row>
            <Row>
                <Col s={4} className='center-align'>
                    <Button>RATE USER</Button>
                </Col>
                <Col s={4} className='center-align'>
                    <Modal
                        className="center-align"
                        id="Modal-Swap"
                        trigger={<Button node="button">SWAP ITEMS</Button>}
                    >
                        <h3>Swap Items?</h3>
                        <br></br>
                        <div>If you press confirm your item will be no longer listed on Swapify. Only do this after swapping items.</div>
                        <br></br><br></br>
                        <a><Button onClick={swapItems} modal="close">Confirm</Button></a>
                    </Modal>
                </Col>
                <Col s={4} className='center-align'>
                    <Modal
                        className="center-align"
                        id="Modal-Swap"
                        trigger={<Button node="button">DELETE MATCH</Button>}
                    >
                        <h3>Delete Match?</h3>
                        <br></br>
                        <div>If you press confirm your match will be deleted from Swapify.</div>
                        <br></br><br></br>
                        <a><Button onClick={deleteMatch} modal="close">Confirm</Button></a>
                    </Modal>
                </Col>
            </Row>

        </div>
    )
}
