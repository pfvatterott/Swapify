import React from "react";
import 'materialize-css';
import { Navbar, Icon, NavItem } from "react-materialize";
import "./style.css";


const CustomNavbar = (props) => {
    return (
        <div className="section">
            <Navbar
                alignLinks="right"
                brand={
                    <a className="brand-logo" href="/">
                        <img src="./../img/swapifyLogoTop-vector.png" height="200" />
                    </a>
                }
                centerLogo
                className="navbar"
                id="mobile-nav"
                menuIcon={<Icon>menu</Icon>}
                options={{
                    draggable: true,
                    edge: "left",
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
                <NavItem href="chat" className="swapIcon">
                    <Icon>all_inclusive</Icon>
                </NavItem>
            </Navbar>
        </div>
    );
};

export default CustomNavbar;
