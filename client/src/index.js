import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "filepond/dist/filepond.min.css";


ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
