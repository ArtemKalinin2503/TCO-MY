import React, {Component} from "react";
import { Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import BtnBack from "../../BtnBack/BtnBack";
import ReturnScanCheck from "../../ReturnScanCheck/ReturnScanCheck";
import TimerWork from "../../TimerWork/TimerWork";
import ReturnPrintCheck from "../../ReturnPrintCheck/ReturnPrintCheck";
import BtnHome from "../../BtnHome/BtnHome";
import './returnPage.scss';

class ReturnPage extends Component{
    render() {
        const { history } = this.props
        return (
            <div className="returnPage__wrapper">
                <TimerWork/>
                <Switch>
                    <Route history={history} path="/returnPage" component={ReturnScanCheck} exact />
                    <Route history={history} path="/returnPage/printReturnCheck" component={ReturnPrintCheck} exact />
                </Switch>
                <BtnHome />
                <BtnBack history={history}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReturnPage)