import React, { Component } from "react";
import { connect } from "react-redux";
import KeyboardVirtual from "../../KeyboardVirtual/KeyboardVirtual";
import { clearLoyalty, getLoyaltyCard } from "../../../actions/actionsCardLoyalties";
import Preloader from "../../Preloader/Preloader";
import { stageActive } from "../../../actions/actionsStageProgress";

import "./formCardLoyalties.scss";

//Фррма для ввода данных карты Лояльности
class FormCardLoyalties extends Component {

    state = {
        numberCard: "",
    }

    componentDidMount() {
        //Шаг стадия оплаты топлива
        this.props.stageActive(this.props.typeCardReal ? "FormCardLoyalties_CardReal": "FormCardLoyalties_CardVirtual");

        //Выставим фокус на input Номер карты
        let inputNumberCard = document.getElementById('numberCard');
        if (inputNumberCard) {
            inputNumberCard.focus()
        }
        //Если выбрана пластиковая карта лояльности
        if (this.props.typeCardReal) {
            setTimeout(function () {
                this.props.getLoyaltyCard(this.props.widgetId.id, this.state.numberCard)
            }.bind(this), 5000)
        }
    }

    componentWillUnmount() {
        this.props.clearLoyalty();
    }

    //Полуичм номер карты введенный пользователм
    getNumberCard(numberCard) {
        this.setState({
            numberCard: numberCard
        })
    }

    //Кнопка Авторизировать
    handlerAuthorization = () => {
        this.props.getLoyaltyCard(this.props.widgetId.id, this.state.numberCard)
    }

    //Основная разметка исходя как будет авторизовываться карта Лояльности
    renderTypeCard = () => {
        //Если номер карты нужно ввести через форму
        if (this.props.typeCardVirtual) {
            return (
                <>
                    <div className="formCardLoyalties__head">
                        {"Отсканируйте QR-код или введите номер карты вручную"}
                    </div>
                    <div className="formCardLoyalties__information_qr" />
                    <div className="formCardLoyalties__tet" />

                    <div className="formCardLoyalties__keyboard">
                        <KeyboardVirtual
                            activeComponent="formCardLoyalties"
                            getNumberCard={(numberCard) => this.getNumberCard(numberCard)}
                            type="OneInput"
                            keyboardType="number"
                        />
                        <div className="formCardLoyalties__btnpay" onClick={this.handlerAuthorization}>
                            <div className="formCardLoyalties__textbtn">Авторизовать</div>
                        </div>
                    </div>
                </>
            )
        }
        //Если номер карты будет введен путем сканирования через ПинПад
        else if (this.props.typeCardReal) {
            return (
                <>
                    <div className="formCardLoyalties__head">
                        {"Приготовьте бонусную карту и следуйте инструкции на ПИН-паде"}
                    </div>
                    <div className="formCardLoyalties__tet">
                        <div className="pinPadCard__information" />
                    </div>
                </>
            )
        }
    }

    render() {
        if (this.props.loadingLoyalties) {
            return (
                <Preloader />
            )
        } else {
            return (
                <div className="formCardLoyalties__wrapper">
                    {this.renderTypeCard()}
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    widgetId: state.PayOrderReducer.widgetId,
    loadingLoyalties: state.LoyaltiesCardReducer.loadingLoyalties,
})

const mapDispatchToProps = (dispatch) => ({
    getLoyaltyCard: (widgetId, numberCard) => (dispatch(getLoyaltyCard(widgetId, numberCard))),
    clearLoyalty: () => dispatch(clearLoyalty()),
    stageActive: (payload) => dispatch(stageActive(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FormCardLoyalties);