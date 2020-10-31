import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./btnHomePage.scss";

class BtnHomePage extends Component {

    state = {
        btnName: this.props.btnName,
        type: this.props.type,
        selectGas: false,
        selectReturn: false,
    }

    Redirect = () => {
        if (this.state.type === "Return" && this.props.isEnable) {
            this.setState({ selectReturn: true });
        }
        if (this.state.type === "fuelGas" && this.props.isEnable) {
            this.setState({ selectGas: true });
        }
    }
    render() {
        if (this.state.selectGas) {
            return <Redirect to="/stationPage" />
        }
        if (this.state.selectReturn) {
            return <Redirect to="/returnPage" />
        }
        let srcImage = "./images/trkgreen.svg";
        if (this.state.type === "Return") {
            srcImage = "./images/checkgreen.svg";
        }
        return (
            <button
                onClick={this.Redirect}
                disabled={this.props.allGasNotWork ? "disabled" : ""}
                className="btnHomePage__wrapper__btn"
            >
                <div className={this.props.isEnable ? 'btnHomePage__wrapper isEnable' : 'btnHomePage__wrapper isDisable'}>
                    <img
                        className={this.props.isEnable ? 'btnHomePage__icon isEnable' : 'btnHomePage__icon isDisable'}
                        src={srcImage} alt="action"
                    />
                    <div className={this.props.isEnable ? 'btnHomePage__back isEnable' : 'btnHomePage__back isDisable'}>
                        <div className={this.props.isEnable ? 'btnHomePage__text isEnable' : 'btnHomePage__text isDisable'}>
                            {this.props.btnText}
                        </div>
                    </div>
                </div>
            </button>
        );
    }
}

export default BtnHomePage;