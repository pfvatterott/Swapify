
import React, { useContext, useEffect, useState } from "react";
import { Button, CollectionItem } from 'react-materialize';
import "./style.css"
import chatContext from "../../utils/chatContext"
import API from "../../utils/API";

const MatchCard = (props) => {
    const itemIds = {
        matchId: props.matchData.matchId
    }
    const { setChat, chatId } = useContext(chatContext)
    const [ currentChatStyle, setCurrentChatStyle ] = useState(false)
    const [ userRating, setUserRating ] = useState(0)

    useEffect(() => {
       setChat({matchId: props.allMatches.data[0]._id})
       API.getUser(props.matchData.otherUser).then((res) => {
           if (res.data[0].rating.length === 0) {
               setUserRating(0)
           }
           else {
               let ratingCount = 0
               for (let i = 0; i < res.data[0].rating.length; i++) {
                   ratingCount = ratingCount + res.data[0].rating[i]
               }
               setUserRating(Math.round(ratingCount / res.data[0].rating.length))
           }
       })
    }, [])

    useEffect(() => {
        if (chatId.matchId === props.matchData.matchId) {
            setCurrentChatStyle(true)
        }
        else {
            setCurrentChatStyle(false)
        }
    }, [chatId])

    return (
        <div>
            {/* highlights currently selected chat */}
            {currentChatStyle ? (
                <CollectionItem className="avatar valign-wrapper collection" style={{backgroundColor:"#D3EEE3"}}>
                <a className="noHover"><img
                    alt=""
                    className="circle userItemPicture"
                    src={props.yourImageUrl}
                /></a>
                <a className="noHover"><i className="material-icons swapSymbol noHover">autorenew</i></a>
                <a className="noHover"><img
                    alt=""
                    className="circle itemPicture noHover"
                    src={props.imageURL}
                /><i className="material-icons ratingStar noHover">star</i><p className="ratingNumber noHover">{userRating}</p></a>
                <a className="secondary-content">
                    {props.matchData.newText ? (<a className="btn-floating btn-large chatButton pulse" style= {{backgroundColor:"#F28705"}} onClick={() => {setChat(itemIds)}} ><i className="material-icons">chat</i></a>) : (<a className="btn-floating btn-large chatButton" style= {{backgroundColor:"#F28705"}} onClick={() => {setChat(itemIds)}} ><i className="material-icons">chat</i></a>)}
                    
                </a>
            </CollectionItem>
            ) : (
                <CollectionItem className="avatar valign-wrapper">
                <a className="noHover"><img
                    alt=""
                    className="circle userItemPicture "
                    src={props.yourImageUrl}
                /></a>
                <a className="noHover"><i className="material-icons swapSymbol noHover">autorenew</i></a>
                <a className="noHover"><img
                    alt=""
                    className="circle itemPicture noHover"
                    src={props.imageURL}
                /><i className="material-icons ratingStar noHover">star</i><p className="ratingNumber">{userRating}</p></a>
                <a className="secondary-content">
                    {props.matchData.newText ? (<a className="btn-floating btn-large chatButton pulse" style= {{backgroundColor:"#F28705"}} onClick={() => {setChat(itemIds)}} ><i className="material-icons">chat</i></a>) : (<a className="btn-floating btn-large chatButton" style= {{backgroundColor:"#F28705"}} onClick={() => {setChat(itemIds)}} ><i className="material-icons">chat</i></a>)}
                    
                </a>
            </CollectionItem>
            )}
        </div>
    )
}
export default MatchCard;