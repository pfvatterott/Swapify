import React, { useState, useContext, useEffect } from "react";
import { Link, Redirect } from 'react-router-dom'
import API from "../utils/API";
import ItemsList from "../components/ItemsList"

function Profile() {
    const [redirect, setRedirect] = useState(false);
    const [itemsList, setItemsList]=useState([]);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'))
        if (userData === null) {
            setRedirect(true)
        }
        const userId=userData.googleId;

        API.getItemsForId(userId)
        .then(res => setItemsList(res.data))
        .catch(err => console.log(err));
  }, [])
    
    return (
        <div>
            {/* { redirect ? (<Redirect push to="/"/>) : null } */}
            <h2>Profile Page</h2>
            <a><Link to="/createItem">Create Item</Link></a>
        
            <h3>Items</h3>
            {
                <ItemsList items = {itemsList}></ItemsList>
            
            }
       
        </div>
    )
}

export default Profile;