import React, { useEffect, useContext } from "react";
import ArticleContext from "../utils/ArticleContext"


function Profile() {

    const {userState, handleSetUser } = useContext(ArticleContext);
    console.log(userState)
    return (
        <div>
            <h2>Profile Page</h2>
        </div>
    )

}

export default Profile;