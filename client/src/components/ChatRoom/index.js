import React, { useState, useRef, useEffect } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Button, Col, Row, CollectionItem, Collection } from 'react-materialize';
import API from '../../utils/API'
import { firebase, firestore } from "../../utils/firebase"
import ChatMessage from "../ChatMessage"

export default function ChatRoom() {
    const userData = JSON.parse(localStorage.getItem('userData'))
    const chatData = JSON.parse(localStorage.getItem('chatData'))
    const messagesRef = firestore.collection(`${chatData.matchId}`)
    const query = messagesRef.orderBy('createdAt')
    const [messages] = useCollectionData(query, {idField: 'id'})
    const [formValue, setFormValue] = useState('')
    const dummy = useRef()

    const [userItem, setUserItem] = useState({})
    const [otherItem, setOtherItem] = useState({})

    useEffect(() => { 
        API.getMatch(chatData.matchId).then((matchResponse) => {
            console.log(matchResponse)
            if (matchResponse.data.item1Owner === userData.googleId) {
                setUserItem({id: matchResponse.data.item1Owner, photoURL: matchResponse.data.item1Photo})
                setOtherItem({id: matchResponse.data.item2Owner, photoURL: matchResponse.data.item2Photo})
            }
            else {
                setUserItem({id: matchResponse.data.item2Owner, photoURL: matchResponse.data.item2Photo})
                setOtherItem({id: matchResponse.data.item1Owner, photoURL: matchResponse.data.item1Photo})
            }
        })
    }, [])

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

    return (
        <div className="container">
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
        </div>
    )
}
