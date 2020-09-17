import React, {Component} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import TimerWork from "../../TimerWork/TimerWork";
import BtnBack from "../../BtnBack/BtnBack";
import FindCheck from "../../FindCheck/FindCheck";
import './FindCheckPage.scss';

class FindCheckPage extends Component{
    render() {
        const { history } = this.props
        return (
            <div className="findCheckPage__wrapper">
                <TimerWork/>
                <FindCheck/>
                <Link to="/" className="stationPage__link-home">
                    <button className="stationPage__btn-home" />
                </Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(FindCheckPage)