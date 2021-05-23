import React, { useState, useContext, useEffect } from "react";
import { Link, Redirect, useParams } from 'react-router-dom'
import API from "../utils/API";
import ItemCard from "../components/ItemCard"
import CarouselCard from "../components/CarouselCard"
import MatchCard from '../components/MatchCard'
import { Button, Col, Row, CollectionItem, Collection, Carousel, Card, Icon, CardTitle } from 'react-materialize';
import AddIcon from '@material-ui/icons/Add';


//document.body.style = "background: -webkit-gradient(linear, top, bottom, from(#003399), to(#6699cc));background: -webkit-linear-gradient(#025159, #03A696);background: linear-gradient(#025159, #03A696);zoom: 1;margin: 0;padding-top: 2%;padding-bottom: 3%;background-attachment: fixed;"

function Profile() {
    const [redirect, setRedirect] = useState(false);
    const [redirectToSwipping, setRedirectToSwipping] = useState(false);
    const [usersItemList, setUsersItemList] = useState([]);
    const [matchList, setMatchList] = useState([])
    const [userData, setUserData] = useState({
        email: "",
        firstName: "",
        googleId: "",
        image: "",
        lastName: "",
        listedItems: [],
        rating: []}
    )
    const [imageArray, setImageArray] = useState([""]);
    const [rating, setRating] = useState();
    const { id } = useParams()

    let matchArray = []

    useEffect(() => {
        loadItems();
        API.getUser(id).then((res) => {
            const newUser = {
                email: res.data[0].email,
                firstName: res.data[0].firstName,
                googleId: res.data[0].googleId,
                image: res.data[0].image,
                lastName: res.data[0].lastName,
                listedItems: res.data[0].listedItems,
                rating: res.data[0].rating
            }
            setUserData(newUser)
        })
    }, [])

    useEffect(() => {
        loadImages()

    }, [usersItemList])

    function loadImages() {

        let tempArray = [];
        usersItemList.forEach((item, i) => {
            tempArray.push(item.imageURL);

        })
        if (usersItemList.length == 0) {
            return
        }
        console.log(tempArray);
        setImageArray(tempArray);
    }
    function loadItems() {
        if (userData === null) {
            //   setRedirect(true)
        }
        API.getUserItems(userData.googleId).then((response) => {

            setUsersItemList(response.data)

        })
        API.getUserMatches(userData.googleId).then((matchResponse) => {
            matchResponse.data.forEach(item => {
                if (item.item1Owner === userData.googleId) {
                    const itemInfo = {
                        userItemId: item.item1Id,
                        userId: item.item1Owner,
                        userItemPhoto: item.item1Photo,
                        userItemName: item.item1Name,
                        otherItemId: item.item2Id,
                        otherUser: item.item2Owner,
                        otherItemImage: item.item2Photo,
                        otherItemName: item.item2Name,
                    }
                    matchArray.push(itemInfo)
                    if (matchResponse.data.length === matchArray.length) {
                        setMatchList(matchArray)
                    }
                }
                else {
                    const itemInfo = {
                        userItemId: item.item2Id,
                        userId: item.item2Owner,
                        userItemPhoto: item.item2Photo,
                        userItemName: item.item2Name,
                        otherItemId: item.item1Id,
                        otherUser: item.item1Owner,
                        otherItemImage: item.item1Photo,
                        otherItemName: item.item1Name,
                    }
                    matchArray.push(itemInfo)
                    if (matchResponse.data.length === matchArray.length) {
                        setMatchList(matchArray)
                    }
                }
            });
        })

    }

    function getRating() {
        console.log(userData.rating);
        let ratingsArr = userData.rating;
        if (userData.rating) {
            let avg = 0
            ratingsArr.forEach((rating, i) => {
                avg += rating;
            })
            return (avg / ratingsArr.length)
        }
        else {

            return 0
        }
    }

    function handleUseItem(id) {
        console.log(id)
        localStorage.setItem('itemData', JSON.stringify(id))
        //  setRedirectToSwipping(true)
    }

    //backgroundImage: "radial-gradient(circle, #03A696, white)"
    return (
        <div style={{ backgroundImage: "url(/img/waves.png)", backgroundSize: "cover" }}>
            {/* {redirect ? (<Redirect push to="/" />) : null} */}

            <div className="container center-align" style={{ marginTop: "20px" }}>
        
                <Row>
                    <Col
                        m={12}
                        s={12}>
                        <img
                            alt=""
                            className="circle"
                            style={{
                                height: "150px", width: "150px", marginTop: "50px"
                            }}
                            src={userData.image}
                        />
                        <h2 style={{ color: "#025159" }}>{userData.firstName} {userData.lastName}</h2>
                    </Col>
                </Row>

                <Row className="left-align valign-wrapper">
                    <Col m={3} s={3}><h4 style={{ color: "#025159" }}>Your Rating</h4></Col>
                    <Col m={9} s={9} className="left-align">
                        {/* {Array(getRating()).fill().map((el, i) =>
                            <i className="material-icons" key={i} style={{ color: "#025159" }}>star</i>
                        )}
                        {Array(5 - getRating()).fill().map((el, i) =>
                            <i className="material-icons" key={i} style={{ color: "#025159" }}>star_border</i>
                        )} */}
                    </Col>

                </Row>
                <Row className="left-align">
                    <Col m={1} s={1}>
                        <Button floating={true} large={true} style={{ backgroundColor: "#F28705" }}><Link to={`/createItem/${userData.googleId}`}>
<                           i className="material-icons">add</i></Link></Button></Col>
                    <Col m={11} s={11} className="valign-wrapper">
                        <h4 style={{ color: "#025159" }}>Add Item</h4>
                    </Col>

                </Row>
                <Row style={{ paddingTop: "10px" }}>
                    <h3 style={{ fontFamily: "lemon", color: "#F28705" , paddingBottom: "20px" }}>Your Items</h3>


                    <Collection style={{ maxHeight: "500px", overflow: "scroll" }} >
                        {usersItemList.map((item, index) => (

                            <ItemCard key={index} loadItems={loadItems} imageURL={item.imageURL} itemName={item.itemName} id={item._id} itemDescription={item.itemDescription} />

                            // <a href="/swipping" ><button onClick={() => handleUseItem(item._id)} itemId={item._id}>{item.itemName}</button></a>
                        ))}

                    </Collection>

                </Row>

            <Row style={{height:"400px"}}></Row>
            </div>

            {/* <Carousel>
                {usersItemList.map((item, index) => (

                    <CarouselCard key={index} loadItems={loadItems} imageURL={item.imageURL} itemName={item.itemName} id={item._id} itemDescription={item.itemDescription} />
                ))}

            </Carousel> */}

        </div>
    )
}

export default Profile;