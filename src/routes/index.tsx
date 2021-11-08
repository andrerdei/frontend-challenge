import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from "../pages/Home";
import UsersList from "../pages/UsersList";
import UserEdit from "../pages/UserEdit";

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/users' exact component={UsersList}/>
                <Route path='/users/:userId' component={UserEdit}/>
            </Switch>
        </BrowserRouter>
    )
};
