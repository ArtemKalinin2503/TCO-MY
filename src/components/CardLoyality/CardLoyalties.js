import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import FormCardLoyalties from "../Forms/FormCardLoyality/FormCardLoyalties";
import { stageActive } from "../../actions/actionsStageProgress";
import { getWidgetId, setEmailPhoneCheck } from "../../actions/actionsPayOrder";
import { clearLoyalty } from "../../actions/actionsCardLoyalties";
import "./сardLoyalties.scss";

//Компонент выбора карты Лояльности
class CardLoyalties extends Component {

    state = {
        cardLoyaltiesReal: false,
        cardLoyaltiesVirtual: false,
    }

    componentDidMount() {
        //Шаг стадия оплаты топлива
        this.props.stageActive("CardLoyalties");

        let email = "";
        let phone = "";

        //Если не заполнили поле email
        if (this.props.emailCheck) {
            email = this.props.emailCheck;
        } else {
            email = ""
        }
        //Если не заполнили поле phone
        if (this.props.phoneCheck) {
            phone = this.props.phoneCheck;
        } else {
            phone = ""
        }

        if (this.props.widgetId.id) {
            this.props.setEmailPhoneCheck(this.props.widgetId.id, email, phone);
        }
    }

    componentWillUnmount() {
        this.setState({
            cardLoyaltiesReal: false
        })
        this.props.clearLoyalty()
    }

    //Кнопка Ввести номер карты вручную
    realCard = () => {
        this.setState({
            cardLoyaltiesReal: true,
        })
    }

    //Кнопка Отсканировать карту
    virtualCard = () => {
        this.setState({
            cardLoyaltiesVirtual: true
        })
    }

    renderFormLoyalties() {
        if (this.state.cardLoyaltiesReal || this.state.cardLoyaltiesVirtual) {
            return (
                <FormCardLoyalties
                    typeCardReal={this.state.cardLoyaltiesReal}
                    typeCardVirtual={this.state.cardLoyaltiesVirtual}
                />
            )
        } else {
            return (
                <>
                    <div className={this.state.cardLoyalties ? "cardLoyalties__head no-visible" : "cardLoyalties__head"}>Вы являетесь участником программы лояльности ?</div>
                    <div className={this.state.cardLoyalties ? "cardLoyalties__tet no-visible" : "cardLoyalties__tet"}>
                        <div className="btnCardLoyalty__wrapper" onClick={this.realCard}>
                            <img className="btnCardLoyalty__icon"
                                src={"/images/cardLoyalbf.svg"} alt="Ввести номер карты вручную" />
                            <div className="btnCardLoyalty__text"
                            > {"Пластиковая карта"}</div>
                        </div>
                        <div className="btnCardLoyalty__wrapper" onClick={this.virtualCard}>
                            <img className="btnCardLoyalty__icon"
                                src={"/images/checkQR.svg"} alt="Отсканировать карту" />
                            <div className="btnCardLoyalty__text"
                            > {"Витруальная карта"}</div>
                        </div>
                        <Link
                            to={`/stationPage/pinPadCard/`} className="btnCardLoyalty__wrapper" onClick={this.Redirect}>
                            <div className="btnCardLoyalty__textNo"
                            > {"Нет"}</div>
                        </Link>
                    </div>
                </>
            )
        }
    }

    render() {
        //Если карта не прошла авторизацию
        if (this.props.errorLoyalties) {
            return <Redirect to="/stationPage/errorLoyaltiesCard/" />
        }
        //Если карта прошла авторизацию
        if (this.props.cardLoyaltiesData === 202) {
            return <Redirect to="/stationPage/deductingPoints/" />
        }
        return (
            <div className="cardLoyalties__wrapper">
                {this.renderFormLoyalties()}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    widgetId: state.PayOrderReducer.widgetId,
    errorLoyalties: state.LoyaltiesCardReducer.errorLoyalties,
    cardLoyaltiesData: state.LoyaltiesCardReducer.cardLoyaltiesData,
    emailCheck: state.PayOrderReducer.emailCheck,
    phoneCheck: state.PayOrderReducer.phoneCheck
})

const mapDispatchToProps = (dispatch) => ({
    stageActive: (payload) => dispatch(stageActive(payload)),
    getWidgetId: () => dispatch(getWidgetId()),
    clearLoyalty: () => dispatch(clearLoyalty()),
    setEmailPhoneCheck: (widgetId, email, phone) => dispatch(setEmailPhoneCheck(widgetId, email, phone))
})

export default connect(mapStateToProps, mapDispatchToProps)(CardLoyalties);