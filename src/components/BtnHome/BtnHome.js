import React, {Component} from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { backHome } from "../../actions/actionsBackHome";
import "./btnHome.scss";

class BtnHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            returnHome: false
        }
    }

    handleClickHome = () => {
       this.props.backHome(true);
        this.setState({
            returnHome: true
        })
    }

    render() {
        if (this.state.returnHome) {
            return <Redirect to="/" />
        }
        return (
            <button
                className="btn-home"
                onClick={this.handleClickHome}
            />
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        backHome: (payload) => dispatch(backHome(payload)),
    }
}

export default connect(null, mapDispatchToProps)(BtnHome);