import React, { Component } from "react";
import "./btnBack.scss"

class BtnBack extends Component {

    state = {
        currentStep: 0
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
                case "errorPayBank".toUpperCase():
                case "ErrorPayCard".toUpperCase():
                case "errorLoyaltiesCard".toUpperCase():
                case "FormCardLoyalties_CardReal".toUpperCase():
                case "pinPadCard".toUpperCase():
                case "printCheck".toUpperCase(): {
                    return 3;
                }
                default: return 0;
            }
        } else {
            return 0;
        }
    }

    render() {
        if (this.state.currentStep === 3) {
            return <></>
        } else {
            return (
                <div className="btnBack" onClick={this.props.history.goBack}></div>
            )
        }
    }
}

export default BtnBack;