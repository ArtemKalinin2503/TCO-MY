import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { backHome } from "../../actions/actionsBackHome";
import "./btnHome.scss";

class BtnHome extends Component {

    state = {
        returnHome: false,
        currentStep: 0
    }

    handleClickHome = () => {
        this.props.backHome(true);
        this.setState({
            returnHome: true
        })
    }

    componentDidMount() {
        this.setState({ currentStep: this.getIsShow(this.props.currentPage) });
    }
    componentDidUpdate(prevProps) {
        if (this.props.currentPage !== prevProps.currentPage) {
            this.setState({ currentStep: this.getIsShow(this.props.currentPage) });
        }
    }
    getIsShow = (page) => {
        if (page != null) {
            switch (page.toUpperCase()) {
                case "deductingPoints".toUpperCase():
                case "FormCardLoyalties_CardReal".toUpperCase():
                case "errorLoyaltiesCard".toUpperCase():
                case "pinPadCard".toUpperCase(): {
                    return 3;
                }
                default: return 0;
            }
        } else {
            return 0;
        }
    }

    render() {
        if (this.state.returnHome) {
            return <Redirect to="/" />
        }
        if (this.state.currentStep === 3) {
            return <></>
        } else {
            return (
                <button
                    className="btn-home"
                    onClick={this.handleClickHome}
                />
            )
        }
    }
}

function mapDispatchToProps(dispatch) {
    return {
        backHome: (payload) => dispatch(backHome(payload)),
    }
}

export default connect(null, mapDispatchToProps)(BtnHome);