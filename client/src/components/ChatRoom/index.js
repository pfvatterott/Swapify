import React, { useState, useRef, useEffect } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Button, Col, Row, CollectionItem, Collection } from 'react-materialize';
import API from '../../utils/API'
import { firebase, firestore } from "../../utils/firebase"
import ChatMessage from "../ChatMessage"

export default function ChatRoom() {
    const userData = JSON.parse(localStorage.getItem('userData'))
    const chatData = JSON.parse(localStorage.getItem('chatData'))
    const messagesRef = firestore.collection('messages')
    const query = messagesRef.orderBy('createdAt').limit(25)
    const [messages] = useCollectionData(query, {idField: 'id'})
    const [formValue, setFormValue] = useState('')
    const dummy = useRef()
    let chatMessages = [];

    const [userItem, setUserItem] = useState({})
    const [otherItem, setOtherItem] = useState({})

    useEffect(() => { 
        API.getItem(chatData.item1).then((item1Response) => {
            setUserItem({id: chatData.item1, photoURL: item1Response.data.imageURL})
            API.getItem(chatData.item2).then((item2Response) => {
                setOtherItem({id: chatData.item2, photoURL: item2Response.data.imageURL})
            })
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

    if (messages) {
        console.log(messages)
        for (let i = 0; i < messages.length; i++) {
            if ((messages[i].sentFromid === userItem.id) && (messages[i].sentToid === otherItem.id)) {
                chatMessages.push(messages[i])
            }
            else if ((messages[i].sentFromid === otherItem.id) && (messages[i].sentToid === userItem.id)) {
                chatMessages.push(messages[i])
            }
        }
    }

    return (
        <div className="container">
            <Row>
                {chatMessages && chatMessages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
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
