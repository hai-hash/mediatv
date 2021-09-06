
import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";

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
