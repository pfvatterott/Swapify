import React, {useEffect} from 'react'
import "./style.css"

export default function ChatMessage(props) {
    const chatData = JSON.parse(localStorage.getItem('chatData'))
    const { text, sentFromid, sentFromPhoto } = props.message;
    const messageClass = sentFromid === chatData.item1 ? 'sent' : 'received';


    return (
        <div className={`message ${messageClass}`}>
            <img className='itemPhoto' src={sentFromPhoto} />
            <p>{text}</p>
        </div>
    )
}
