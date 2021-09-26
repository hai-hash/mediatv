import React from 'react'
import {useRouteMatch} from "react-router-dom";
const NotFound = () => {
    let url = useRouteMatch();
    console.log(url);
    return (
        <div>
           <h1>404 - Not Found</h1> 
        </div>
    )
}
export default NotFound
