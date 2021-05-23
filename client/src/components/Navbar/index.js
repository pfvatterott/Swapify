import React, { useEffect, useState } from "react";
import 'materialize-css';
import { useLocation } from 'react-router-dom'
import { Navbar, Icon, NavItem } from "react-materialize";
import Badge from '@material-ui/core/Badge';
import API from "../../utils/API";
import "./style.css";

const CustomNavbar = (props) => {
const [ newText, setNewText ] = useState(false)
const [userData, setUserData] = useState({
    email: "",
    firstName: "",
    googleId: "",
    image: "",
    lastName: "",
    listedItems: [],
    rating: []}
)
const { pathname } = useLocation();
const pathway = pathname.split("/")
const id = pathway[pathway.length - 1]

useEffect(() => {
    checkForNewTexts()
    setInterval(function() {
        checkForNewTexts()
    }, 5000)
}, [userData])

useEffect(() => {
    API.getUser(id).then((res) => {
        console.log(res)
        const newUser = {
            email: res.data[0].email,
            firstName: res.data[0].firstName,
            googleId: res.data[0].googleId,
            image: res.data[0].image,
            lastName: res.data[0].lastName,
            listedItems: res.data[0].listedItems,
            rating: res.data[0].rating
        }
        console.log(newUser)
        setUserData(newUser)
    })
}, [])

function checkForNewTexts() {
    let trueCount = 0;
    if (userData) {
        console.log(userData)
        API.getUserMatches(userData.googleId).then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                if ((response.data[i].item1Owner === userData.googleId) && (response.data[i].item1NewText === true)) {
                    trueCount++
                }
                else if ((response.data[i].item2Owner === userData.googleId) && (response.data[i].item2NewText === true)) {
                    trueCount++
                }
            }
            if (trueCount === 0) {
                setNewText(false)
            }
            else {
                setNewText(true)
            }
        })
    }
}

  return (
    // <div className="container">
    <Navbar
      alignLinks="right"
      brand={
        <a className="brand-logo" href="/">
          <img src="./../img/swapifyLogoTopAllDark-vector.png" height="125" />
        </a>
      }
      centerChildren
      className="navbar transparent z-depth-0"
      id="mobile-nav"
      menuIcon={
        newText ? (
          <Badge variant="dot" color="secondary" className="chatBadge">
            <Icon className="swapIcon">menu</Icon>
          </Badge>
        ) : (
          <Badge color="secondary" className="chatBadge">
            <Icon className="swapIcon">menu</Icon>
          </Badge>
        )
      }
      options={{
        draggable: true,
        edge: "right",
        inDuration: 250,
        onCloseEnd: null,
        onCloseStart: null,
        onOpenEnd: null,
        onOpenStart: null,
        outDuration: 200,
        preventScrolling: true,
      }}
    >
      <NavItem
        tooltip="Add Item"
        href={`/createItem/${userData.googleId}`}
        className="addItem"
        alt-text="add item"
        node="button"
      >
        <Icon tooltip="Add Item" node="button">
          add_circle
        </Icon>
      </NavItem>
      <NavItem href={`/profile/${userData.googleId}`} className="profile">
        <Icon>person</Icon>
      </NavItem>
      <NavItem href={`/chat/${userData.googleId}`} className="swapIconWrapper">
        {newText ? (
          <Badge variant="dot" color="secondary" className="chatBadge">
            <Icon className="swapIcon">all_inclusive</Icon>
          </Badge>
        ) : (
          <Badge color="secondary" className="chatBadge">
            <Icon className="swapIcon">all_inclusive</Icon>
          </Badge>
        )}
      </NavItem>
    </Navbar>
    // </div>
  );
};

export default CustomNavbar;
