import React, { Component } from "react";
import {Redirect } from "react-router-dom";
import "./btnTypePay.scss";

class BtnTypePay extends Component {

    state = {
        cardLoyalties: false,
        urlRedirect: null
    }

    componentDidMount() {
        //Попросили убрать карту лояльности из типа оплаты (бекенд возвращает, что данный тип оплаты доступен)
        if (this.props.type === "LOYALTY" && this.props.isEnable) {
            this.setState({
                cardLoyalties: true
            })
        } else {
            this.setState({
                cardLoyalties: false
            })
        }
    }

    renderBtnTypePay = () => {
        let url;
        let iconBtnClass;
        let img;
        switch (this.props.type) {
            case "BANK":
                url = "/stationPage/checkDat";
                iconBtnClass = "btn-bank-card";
                img = "/images/creditCard.svg";
                break;
            case "FLEET":
                url = `/stationPage/quantityFuel/${this.props.paramsGasFuel.numberGasParams}/${this.props.paramsGasFuel.numberFuelParams}/${this.props.paramsGasFuel.idGradesFuel}/FLEET`;
                iconBtnClass = "btn-fuel-card";
                img = "/images/fuelCard.svg";
                break;
            case "CASH":
                url = "";
                iconBtnClass = "btn-cash";
                img = "/images/paygreen.svg";
                break;
            case "LOYALTY":
                url = "";
                iconBtnClass = "btn-fuel-card";
                img = "/images/fuelCard.svg";
                break;
            default:
                url = ""
        }
        return [url, iconBtnClass, img]
    }
    setUrlRedirect = (url) => {
        this.setState({ urlRedirect: url });
    }
    render() {
        if (this.state.urlRedirect) {
            return <Redirect to={this.state.urlRedirect} />
        }
        return (
            <div className={this.state.cardLoyalties ? "btnTypePay__wrapper inVisibleTypePay" : "btnTypePay__wrapper"}>
                <div className={this.props.isEnable ? "btnTypePay__item isEnable" : "btnTypePay__item"}>
                    <div onClick={() => this.setUrlRedirect(this.renderBtnTypePay()[0])}
                        className={`btnTypePayDiv__wrapper`}>
                        <div className={"btnTypePayDiv__icon"}>
                            <img className={`btnTypePayDiv__icon__${this.renderBtnTypePay()[1]}`}
                                src={this.renderBtnTypePay()[2]} alt="тип_оплаты" />
                        </div>
                        <div className={'btnTypePayDiv__text'}>
                            {this.props.name}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default BtnTypePay;