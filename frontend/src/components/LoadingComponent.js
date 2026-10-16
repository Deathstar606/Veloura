import React from "react";
import loading from "../images/Untitled (Instagram Post (45)).gif"

export const Loading = () => {
    return(
        <div className="col-12 text-center d-flex justify-content-center align-items-center" /* style={{height: "100vh", width: "100vw"}} */>
            <img src={loading}/>
        </div>
    )
}