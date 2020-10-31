import React, { Component } from "react";
import "./gasStage.scss"

//Компонент который показывает Стадии заправки
class GasStage extends Component {
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
                case "gasFuelSelect".toUpperCase(): {
                    return 1;
                }
                case "selectTypePay".toUpperCase():
                case "CheckData".toUpperCase(): {
                    return 2;
                }
                case "quantityFuel".toUpperCase():
                case "cardLoyalties".toUpperCase():
                case "deductingPoints".toUpperCase():
                case "errorPayBank".toUpperCase():
                case "ErrorPayCard".toUpperCase():
                case "errorLoyaltiesCard".toUpperCase():
                case "FormCardLoyalties_CardReal".toUpperCase():
                case "FormCardLoyalties_CardVirtual".toUpperCase():
                case "pinPadCard".toUpperCase(): {
                    return 3;
                }
                case "printCheck".toUpperCase(): {
                    return 4;
                }
                default: return 0;
            }
        } else {
            return 0;
        }
    }

    render() {
        return (
            <div>
                <div className="gasStage__selectStage-wrapper">
                    <ul className="gasStage__selectStage-list">
                        <li className="gasStage__selectStage-item selectGas" />
                        <hr className="gasStage__selectSatge_line" />
                        <li className={this.state.currentStep >= 1 ? "gasStage__selectStage-item selectFuel completedStep" : "gasStage__selectStage-item selectFuel"} />
                        <hr className="gasStage__selectSatge_line" />
                        <li className={this.state.currentStep >= 2 ? "gasStage__selectStage-item card completedStep" : "gasStage__selectStage-item card"} />
                        <hr className="gasStage__selectSatge_line" />
                        <li className={this.state.currentStep >= 3 ? "gasStage__selectStage-item pay completedStep" : "gasStage__selectStage-item pay"} />
                        <hr className="gasStage__selectSatge_line" />
                        <li className={this.state.currentStep >= 4 ? "gasStage__selectStage-item check completedStep" : "gasStage__selectStage-item check"} />
                    </ul>
                </div>
            </div>
        )
    }
}

export default GasStage