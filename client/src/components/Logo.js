import React, { Component } from "react";
import "./style/logo.css";
import credibled from "./style/image/credibled.png";

function Logo() {
    return (
        <div className="container">
            <div>
                <img src={credibled} className="image" alt="logo" />
            </div>
        </div>
    );
}

export default Logo;
