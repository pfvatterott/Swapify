import React from 'react'

export default function ChatMessage(props) {
    const userData = JSON.parse(localStorage.getItem('userData'))
    const { text, uid} = props.message;
    const messageClass = uid === userData.googleId ? 'sent' : 'received';
    const photoURL = userData.image

    return (
        <div className={`message ${messageClass}`}>
            <img src={photoURL} />
            <p>{text}</p>
        </div>
    )
}
