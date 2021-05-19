
import React, { useContext, useEffect} from "react";
import { Button, CollectionItem } from 'react-materialize';
import "./style.css"
import chatContext from "../../utils/chatContext"

const MatchCard = (props) => {
    const itemIds = {
        matchId: props.matchData.matchId
    }
    const { setChat } = useContext(chatContext)

    useEffect(() => {
       setChat({matchId: props.allMatches.data[0]._id}) 
    }, [])

    return (
        <CollectionItem className="avatar valign-wrapper">
            <a><img
                alt=""
                className="circle userItemPicture "
                src={props.yourImageUrl}
            /></a>
            <a><i className="material-icons swapSymbol">autorenew</i></a>
            <a><img
                alt=""
                className="circle itemPicture"
                src={props.imageURL}
            /></a>
            <a className="secondary-content">
                <Button onClick={() => {setChat(itemIds)}} style= {{backgroundColor:"#F28705"}}>Chat</Button>
            </a>
        </CollectionItem>
    )
}
export default MatchCard;