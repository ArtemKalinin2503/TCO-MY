import React, {Component} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import BtnBack from "../../BtnBack/BtnBack";
import MakeReturn from "../../MakeReturn/MakeReturn";
import './MakeReturnPage.scss';

class MakeReturnPage extends Component {
    render() {
        const { history } = this.props
        const {id} = this.props.match.params;
        return (
            <div className="makeReturnPage__wrapper">
                <MakeReturn id={id}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(MakeReturnPage)