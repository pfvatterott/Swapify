import React, {useEffect} from 'react'
import "./style.css"

export default function ChatMessage(props) {
    const chatData = JSON.parse(localStorage.getItem('chatData'))
    const userData = JSON.parse(localStorage.getItem('userData'))
    const { text, sentFromid, sentFromPhoto } = props.message;
    const messageClass = sentFromid === userData.googleId ? 'sent' : 'received';


    return (
        <div className={`message ${messageClass}`}>
            <img className='itemPhoto' src={sentFromPhoto} />
            <p>{text}</p>
        </div>
    )
}
