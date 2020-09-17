import React, {Component} from "react";
import { Link } from "react-router-dom";
import "./btnTypePay.scss";

class BtnTypePay extends Component {

    renderBtnTypePay = () => {
        let url;
        let iconBtnClass;
        switch (this.props.type) {
            case "BANK":
                url = "/stationPage/checkDat";
                iconBtnClass = "btn-bank-card";
                break;
            case "FLEET":
                url = `/stationPage/quantityFuel/${this.props.paramsGasFuel.numberGasParams}/${this.props.paramsGasFuel.numberFuelParams}/${this.props.paramsGasFuel.idGradesFuel}/"FLEET"`;
                iconBtnClass = "btn-fuel-card";
                break;
            case "CASH":
                url = "";
                iconBtnClass = "btn-cash";
                break;
            case "LOYALTY":
                url = "";
                iconBtnClass = "btn-fuel-card";
                break;
            default:
                url = ""
        }
        return [url, iconBtnClass]
    }

    render() {
        return (
            <div className={this.props.isEnable ? "btnTypePay__item isEnable" : "btnTypePay__item"}>
                <button className={`waves-effect waves-light btnTypePay ${this.renderBtnTypePay()[1]}`}>
                    <Link
                        to={this.renderBtnTypePay()[0]}
                        className="btnTypePay__link"
                    >
                        {this.props.name}
                    </Link>
                </button>
            </div>
        )
    }
}

export default BtnTypePay;