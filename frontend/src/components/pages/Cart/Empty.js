import React from "react";
import blah from "./emptyCart.svg"

export default function Empty(){
        return (
                <>
                        <img src={blah} style={{width: "500px"}}/>
                        <span className="fw-bold"style={{fontSize:"4rem", marginLeft: "150px"}}>Your Cart is Empty!</span>
                </>
        )
}