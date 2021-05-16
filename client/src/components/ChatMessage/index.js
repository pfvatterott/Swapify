import React from 'react'
import "./style.css"

export default function ChatMessage(props) {
    const userData = JSON.parse(localStorage.getItem('userData'))
    const { text, sentFromId, sentFromPhoto } = props.message;
    const messageClass = sentFromId === userData.googleId ? 'sent' : 'received';

    return (
        <div className={`message ${messageClass}`}>
            <img className='itemPhoto' src={sentFromPhoto} />
            <p>{text}</p>
        </div>
    )
}
