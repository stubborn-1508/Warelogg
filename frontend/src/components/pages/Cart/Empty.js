import React from "react";
import blah from "./emptyCart.svg"
import "./Cart.css"

export default function Empty(){
        return (
                <>
                        <div className="empty-image">
                                <img src={blah} className="cart-image"/>
                                <span className="fw-bold empty-text">Your Cart is Empty!</span>
                        </div>
                </>
        )
}