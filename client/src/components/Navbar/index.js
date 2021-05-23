import React, { useEffect, useState } from "react";
import 'materialize-css';
import { Navbar, Icon, NavItem } from "react-materialize";
import Badge from '@material-ui/core/Badge';
import API from "../../utils/API";
import "./style.css";

const CustomNavbar = (props) => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    const [ newText, setNewText ] = useState(false)

    useEffect(() => {
        checkForNewTexts()
        setInterval(function() {
            checkForNewTexts()
        }, 5000)
    }, [])

    function checkForNewTexts() {
        let trueCount = 0;
        if (userData) {
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
            <Navbar
                alignLinks="right"
                brand={
                    <a className="brand-logo" href="/">
                        <img src="./../img/swapifyLogoTop-vector.png" height="200" />
                    </a>
                }
                className="navbar"
                id="mobile-nav"
                menuIcon={newText ? (<Badge variant='dot' color="secondary" className="chatBadge"><Icon className="swapIcon">menu</Icon></Badge>) : (<Badge color="secondary" className="chatBadge"><Icon className="swapIcon">menu</Icon></Badge>)}
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
                <NavItem href="createItem" className="addItem" alt-text="add item" >
                    <Icon>add_circle</Icon>
                </NavItem>
                <NavItem href="profile" className="profile">
                    <Icon>person</Icon>
                </NavItem>
                <NavItem href="chat" className="swapIconWrapper">
                    {newText ? (<Badge variant='dot' color="secondary" className="chatBadge">
                        <Icon className="swapIcon">all_inclusive</Icon>
                    </Badge>) : (<Badge color="secondary" className="chatBadge">
                        <Icon className="swapIcon">all_inclusive</Icon>
                    </Badge>)}
                </NavItem>
            </Navbar>
    );
};

export default CustomNavbar;
