import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import FormDataCheck from "../Forms/FormDataCheck/FormDataCheck";
import { getEmailCheck, getPhoneCheck } from "../../actions/actionsPayOrder/";
import { stageActive } from "../../actions/actionsStageProgress";

import "./checkData.scss";

//Компонент Для ввода данных для получения чека
class CheckData extends Component {

    state = {
        typePay: "BANK",
        email: "",
        phone: "",
        validEmail: false,
        validPhone: false,
        toSend: false
    }

    componentDidMount() {
        //Шаг стадия оплаты топлива
        this.props.stageActive("CheckData");

        //Выставим фокус на input Телефон
        let inputPhone = document.getElementById('phone');
        if (inputPhone) {
            inputPhone.focus()
        }
    }

    //Получаем данные с формы Почта и Телефон
    getDataUserOrder = (email, phone) => {
        //Одно поле из двух должно быть заполнено
        if (email || phone) {
            this.setState({
                email: email,
                phone: phone,
                validEmail: this.validateEmail(email),
                validPhone: this.validatePhone(phone)
            })
        }
    }

    //Валидация Email
    validateEmail = (email) => {
        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(email);
    }

    //Валидация телефона
    validatePhone = (phone) => {
        let reg = /^\d[\d() -]{4,14}\d$/;
        return reg.test(phone);
    }

    //Вывод ошибок
    errorRender = () => {
        let TextMessage = "";
        //Если почта не волидна
        if (!this.state.validEmail && this.state.email) {
            TextMessage = "Email указан не верно"
        }
        //Если телефон не валиден
        else if (!this.state.validPhone && this.state.phone) {
            TextMessage = "Телефон указан не верно"
        }
        return (
            <div className="noValid-form">{TextMessage}</div>
        )
    }

    //Если проверка на валидность email или телефона не прошла
    renderBtnSubmit = () => {
        if (this.state.validEmail || this.state.validPhone) {
            return (
                <button
                    onClick={this.handlerSubmit}
                    className="btn_forward"
                />
            )
        } else return null
    }

    //Кнопка Отправить
    handlerSubmit = () => {
        this.props.getEmailCheck(this.state.email);
        this.props.getPhoneCheck(this.state.phone);
        this.setState({
            toSend: true
        })
    }

    render() {
        if (this.state.toSend) {
            return <Redirect to={`/stationPage/quantityFuel/${this.props.paramsGasFuel.numberGasParams}/${this.props.paramsGasFuel.numberFuelParams}/${this.props.paramsGasFuel.idGradesFuel}/${this.state.typePay}`} />
        }
        return (
            <div className="checkData__wrapper">
                <div className="checkData__head">Введите данные для получения электронной копии чека</div>
                <div className="checkData__pays" />
                <div className="checkData__body">
                    {this.errorRender()}
                    <FormDataCheck
                        getDataUser={(email, phone) => this.getDataUserOrder(email, phone)}
                    />
                    <Link
                        to={`/stationPage/quantityFuel/${this.props.paramsGasFuel.numberGasParams}/${this.props.paramsGasFuel.numberFuelParams}/${this.props.paramsGasFuel.idGradesFuel}/${this.state.typePay}`}
                        className="checkData__dismiss" onClick={this.handlerSubmit}
                    >
                        <div className="checkData__textbtn">Пропустить</div>
                    </Link>
                </div>
                {this.renderBtnSubmit()}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    paramsGasFuel: state.SelectFuelReducer.paramsGasFuel,
})

const mapDispatchToProps = (dispatch) => ({
    getEmailCheck: (payload) => dispatch(getEmailCheck(payload)),
    getPhoneCheck: (payload) => dispatch(getPhoneCheck(payload)),
    stageActive: (payload) => dispatch(stageActive(payload)),

})

export default connect(mapStateToProps, mapDispatchToProps)(CheckData);