import React, {Component} from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import KeyboardVirtual from "../../KeyboardVirtual/KeyboardVirtual";
import { getLoyaltyCard } from "../../../actions/actionsCardLoyalties";
import "./formCardLoyalties.scss";
//RxJs
import {interval} from "rxjs";
import {takeWhile} from 'rxjs/operators';

//Фррма для ввода данных карты Лояльности
class FormCardLoyalties extends Component {

    constructor(props) {
        super(props);
        this.state = {
            numberCard: "",
        }
    }

    componentDidMount() {
        //Выставим фокус на input Номер карты
        let inputNumberCard = document.getElementById('numberCard');
        if(inputNumberCard) {
            inputNumberCard.focus()
        }
    }

    //Полуичм номер карты введенный пользователм
    getNumberCard(numberCard) {
        this.setState({
            numberCard: numberCard
        })
    }

    //Кнопка Авторизировать
    handlerAuthorization = () => {
        //this.checkedStatusCard();
        this.props.getLoyaltyCard(this.props.widgetId.id, this.state.numberCard)
    }

    //Проверка авторизации карты Лояльности
 /*   checkedStatusCard = () => {
        this.props.getLoyaltyCard(this.props.widgetId.id, this.state.numberCard)
        const stream$ = interval(1000)
            .pipe(
                takeWhile(v => this.props.cardLoyaltiesData !== 202) //takeWhile - это условие по которому вызываеться стрим
            )
        //Данный стрим будет выполняться пока не сработает takeWhile
        stream$.subscribe({
            next: v => this.props.getLoyaltyCard(this.props.widgetId.id, this.state.numberCard)
        })
    }*/

    renderFormCardLoyalties = () => {
        return (
            <>
                <div className="formCardLoyalties__title">
                    Приготовьте бонусную карту
                </div>
                <div className="formCardLoyalties__img-wrapper">
                    <div className="formCardLoyalties__info tryCard">
                        <p>Если у Вас физическая карта, <br/> следуйте инструкции на ПИН-паде</p>
                    </div>
                    <div className="formCardLoyalties__info virtualCard">
                        <p>Если у Вас виртуальная карта, <br/> отсканируйте шрих-код</p>
                    </div>
                </div>
                <div className="row">
                    <div className="formCardLoyalties__keyboard-label">
                        Или введите номер виртуальной карты
                    </div>
                    <div className="formCardLoyalties__keyboard-wrapper">
                        <KeyboardVirtual
                            activeComponent="formCardLoyalties"
                            getNumberCard={(numberCard) => this.getNumberCard(numberCard)}
                            type="OneInput"
                            keyboardType="number"
                        />
                    </div>
                </div>
                <div className="formCardLoyalties__btn-wrapper">
                    <buttonb
                        className="waves-effect waves-light btn #45b667 formCardLoyalties__btnNext"
                        onClick={this.handlerAuthorization}
                    >
                        Авторизовать
                    </buttonb>
                </div>
            </>
        )
    }

    render() {
        if (this.props.cardLoyaltiesData === 202) {
            return <Redirect to="/stationPage/deductingPoints/"/>
        }
        return (
            <div className="formCardLoyalties__wrapper">
                {this.renderFormCardLoyalties()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        widgetId: state.PayOrderReducer.widgetId,
        cardLoyaltiesData: state.LoyaltiesCardReducer.cardLoyaltiesData,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getLoyaltyCard: (widgetId, numberCard) => (dispatch(getLoyaltyCard(widgetId, numberCard)))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormCardLoyalties);