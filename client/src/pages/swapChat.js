import React from "react";
import { io } from "socket.io-client";

function SwapChat() {
    var socket = io();
    return (
        <div>
        <ul id="messages"></ul>
        <form id="form" action="">
            <input id="input" autocomplete="off" /><button>Send</button>
        </form> 
        </div>
    );
}

export default SwapChat;