import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import FindCheck from "../../FindCheck/FindCheck";
import MakeReturn from "../../MakeReturn/MakeReturn";
import BtnHome from "../../BtnHome/BtnHome";
import './returnPage.scss';

class ReturnPage extends Component {
    render() {
        return (
            <div className="returnPage__wrapper">
                <Switch>
                    <Route path="/returnPage" component={FindCheck} exact />
                    <Route path="/returnPage/process/:id" component={MakeReturn} exact />
                </Switch>
                <BtnHome />
            </div>
        )
    }
}

export default ReturnPage