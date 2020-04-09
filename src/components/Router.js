import React , { Component } from "react";
import {Switch , Route }from "react-router-dom";
import { useAuth } from '../../context/auth'
import Login from "../page/Login/Login"
import Overview from "../page/Overview/Overview"
import {PrivateRoute} from "./PrivateRoute";

const Router = props =>{

    return (
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/Overview" component={Overview} />
            {/* <PrivateRoute exact path="/Overview"  component={Overview} /> */}
        </Switch>
    )
}

export default Router