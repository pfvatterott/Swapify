import React from "react";
import {Button} from 'react-materialize';
import Reward from 'react-rewards';

// This file exports the Input, TextArea, and FormBtn components

export function Input(props) {
  return (
    <div className="form-group">
      <input className="form-control" {...props} />
    </div>
  );
}

export function TextArea(props) {
  return (
    <div className="form-group">
      <textarea className="form-control materialize-textarea" rows="20" {...props} />
    </div>
  );
}

export function FormBtn(props) {
  return (
  
    <button {...props} style={{display: "block", width: "100%", marginBottom: 10, backgroundColor: "#F28705", height: "50px" }} className="btn btn-success">
      {props.children}
    </button>
    
  );
}
