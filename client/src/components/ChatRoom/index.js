import React, { useState, useRef } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { firebase, firestore } from "../../utils/firebase"
import ChatMessage from "../ChatMessage"

export default function ChatRoom() {
    const userData = JSON.parse(localStorage.getItem('userData'))
    const messagesRef = firestore.collection('messages')
    const query = messagesRef.orderBy('createdAt').limit(25)
    const [messages] = useCollectionData(query, {idField: 'id'})
    const [formValue, setFormValue] = useState('')
    const photoURL = userData.image
    const uid = userData.googleId

    const dummy = useRef()


    const sendMessage = async(e) => {
        e.preventDefault();
        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        })
        setFormValue('')
        dummy.current.scrollIntoView({ behavior: 'smooth' })


    }

    return (
        <div>
            <div>
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
                <div ref={dummy}></div>
            </div>
            <form onSubmit={sendMessage}>
                <input value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
                <button type="submit">submit</button>
            </form>
        </div>
    )
}
