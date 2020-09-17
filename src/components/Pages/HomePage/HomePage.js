import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { getOpt } from "../../../actions/actionsOperatingMode";
import Preloader from "../../Preloader/Preloader";
import { addLoginUser } from "../../../actions/actionsAuth";
import {actionClearCart, clearPayment, getWidgetClear, getCartFuel, getWidgetId} from "../../../actions/actionsPayOrder";
import {unlockGas} from "../../../actions/actionsFuelPumps";
import {clearToken} from "../../../utils/utils";
import {clearOrderData} from "../../../actions/actionsOrderFuel";
import {backHome} from "../../../actions/actionsBackHome";
import {getDataDeviceStatus, getDataMessages} from "../../../actions/actionsStatusDevice";
import './homePage.scss';
//RxJs
import { interval } from "rxjs";
import { takeWhile } from 'rxjs/operators'

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checkedMessages: false,
            intervalId: 0,
            selectGas: false,
            //Для определния статусу оборудования
            cashDisabled: false,
            fuelCardDisabled: false,
            bankCardDisabled: false,
            statusGadgetPayError: false,
        }
    }

    componentDidMount() {
        //Сбросить токен чтобы выполнить логин
        clearToken();

        //Для искуственой задержки
        setTimeout(function () {
            this.checkedOptMode();
        }.bind(this), 1500)

        this.checkedOptMode();


        setTimeout(function () {
            this.props.getCartFuel();
        }.bind(this), 5000)

        //Опрос доспуного оборудования для оплаты
        let intervalId = setInterval(function () {
            this.props.actionGetDataDeviceStatus();
        }.bind(this), 3000);
        this.setState({
            intervalId: intervalId,
        });

        setTimeout(function() {
            this.checkedStatusGadget();
        }.bind(this), 5000)

    }

    componentWillUnmount() {
        this.props.backHome(false);
        clearInterval(this.state.intervalId)
    }

    //Данная функция проверяет статус "Проверка режима работы" (если OPTMODE не приходит от api - значит делаем запрос повторно пока не получим ответ OPTMODE)
    checkedOptMode() {
        this.props.actionOpt();
        const stream$ = interval(1000)
            .pipe(
                takeWhile(v => this.props.opt.state !== "OPTMODE") //takeWhile - это условие по которому вызываеться стрим
            )
        //Данный стрим будет выполняться пока не сработает takeWhile
        stream$.subscribe({
            next: v => this.props.actionOpt()
        })

        this.checkDispState();
    }

    checkDispState() {
        this.props.getWidgetClear();
        this.props.actionClearDataOrder();

        //Если вернулись назад и колонку которую выбрали ранее нужно вывести из режима налива (потому что оплата)
        if (this.props.numberSelectGas) {
            this.props.unlockGas(this.props.numberSelectGas)
        }

        //Если в корзине есть объект items - значит в корзине есть товар
        if (this.props.infoCart.items) {
            this.props.clearPayment(this.props.widgetId);
            this.props.actionClearCart();
        }
    }

    //Кнопка Проверка
    checkDataMessages = () => {
        this.props.getDataMessages();
        this.setState({
            checkedMessages: true
        })
    }

    //Кнопка Заправка
    handleGetFuel = () => {
        this.setState({
            selectGas: true
        })
    }

    //Функция которая отрисовывает контент
    renderHomePage() {
        if (this.state.selectGas) {
            return <Redirect to="/stationPage"/>
        }
        if (this.state.checkedMessages && this.props.messages) {
            alert(JSON.stringify(this.props.messages.messages, "", 4));
        }
        if (this.props.opt.state === "OPTMODE" && this.props.infoCart.status !== "PRN") {
            if (this.props.infoCart.status === "NONE" || this.props.infoCart.status === "VIEW" || this.props.infoCart.length === 0) { //Про статусы написано в задаче ТСО-719
                return (
                    <>
                        <div className="homePage__section-action">
                            <button
                                className="homePage__button-menu"
                                disabled={this.state.statusGadgetPayError ? "disabled" : ""}
                                onClick={this.handleGetFuel}
                            >
                                <div className="homePage__action homePage__action_fuel">
                                    <img src={"./images/trkgreen.svg"} className="homePage__icon" alt="trk" />
                                    <div className="homePage__back">
                                        Заправка
                                    </div>
                                </div>
                            </button>
                            <button className="homePage__button-menu">
                                <Link to="/findCheckPage" className="link__wrapper">
                                    <div className="homePage__action homePage__action_check">
                                        <img src={"./images/checkgreen.svg"} className="homePage__icon" alt="trk" />
                                        <div className="homePage__back">
                                            Возврат
                                        </div>
                                    </div>
                                </Link>
                            </button>
                        </div>
                        <button className="homePage__button-menu">
                            <Link to="/informationPage" className="link__wrapper">
                                <div className="homePage__action-information">
                                    Информация
                                </div>
                            </Link>
                        </button>
                    </>
                )
            } else {
                return <Preloader />
            }
        } else {
            return <Preloader />
        }
    }

    //Проверка статуса корзины
    getStatusCart = () => {
        //Если вернулись на главный экран по нажатию на кнопку Домой
        if (this.props.backHomeStatus) {
            //В состоянии FILL,то надо проверить ключ Items, если массив содержит хоть один элемент,то корзина не пуста
            if (this.props.infoCart.status === "FILL" && this.props.infoCart.items.length) {
                this.props.actionClearCart();
            }
            //если корзина status в состоянии PAY, ERR
            if (this.props.infoCart.status === "PAY" || this.props.infoCart.status === "ERR") {
                this.props.getWidgetId();
            }
            //если Type находится в состоянии PAYMENT, тогда, мы должны отменить
            if (this.props.widgetId.type === "PAYMENT") {
                this.props.clearPayment(this.props.widgetId.id);
                this.props.actionClearCart();
            }
            if (this.props.widgetId.type !== "PAYMENT" && this.props.infoCart.length) {
                return (
                    <div className="homePage__message">
                        Терминал не работает
                    </div>
                )
            }
            if (this.props.infoCart.status === "RET" && this.props.infoCart.length) {
                return (
                    <div className="homePage__message">
                        Терминал не работает
                    </div>
                )
            }
            if (this.props.infoCart.status === "PRN") {
                this.props.getWidgetId();
            }
        }
    }

    //Проверка статуса оборудования
    checkedStatusGadget = () => {
        if (this.props.statusDevice) {
            for (let i = 0; i < this.props.statusDevice.length; i++) {
                if (this.props.statusDevice[i].type === "CASH" && this.props.statusDevice[i].isEnable === false) {
                    this.setState({
                        cashDisabled: true
                    })
                } else {
                    this.setState({
                        cashDisabled: false
                    })
                }
                if (this.props.statusDevice[i].type === "FLEET" && this.props.statusDevice[i].isEnable === false) {
                    this.setState({
                        fuelCardDisabled: true
                    })
                } else {
                    this.setState({
                        fuelCardDisabled: false
                    })
                }
                if (this.props.statusDevice[i].type === "BANK" && this.props.statusDevice[i].isEnable === false) {
                    this.setState({
                        bankCardDisabled: true
                    })
                } else {
                    this.setState({
                        bankCardDisabled: false
                    })
                }
            }
        }
        //Если не один метод оплаты не доступен
        if (this.state.cashDisabled && this.state.fuelCardDisabled && this.state.bankCardDisabled) {
            this.setState({
                statusGadgetPayError: true
            })
        } else {
            this.setState({
                statusGadgetPayError: false
            })
        }
    }
/*
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.statusGadgetPayError !== nextState.statusGadgetPayError) {
            return true;
        }
        if (this.props.infoCart !== nextProps.infoCart) {
            return true;
        }
        return false;
    }*/

    render() {
        return (
            <>
                <button className="waves-effect waves-light btn btn-message" onClick={this.checkDataMessages}>
                    Проверка
                </button>
                <div className="homePage__wrapper">
                    <div className={this.state.statusGadgetPayError ? "homePage__errorStatusGadget visible" : "homePage__errorStatusGadget "}>
                        <p>Внимание!</p>
                        <p>Заказ топлива временно не доступен</p>
                    </div>
                    {this.getStatusCart()}
                    {this.renderHomePage()}
                </div>
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        opt: state.OptModeReducer.optMode,
        widgetId: state.PayOrderReducer.widgetId,
        numberSelectGas: state.FuelPumpsReducer.numberSelectGas,
        infoCart: state.PayOrderReducer.cart,
        backHomeStatus: state.BackHomeReducer.backHome,
        messages: state.StatusDeviceReducer.messages,
        statusDevice: state.StatusDeviceReducer.statusDevice,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actionOpt: () => dispatch(getOpt()),
        addLoginUser: () => dispatch(addLoginUser()),
        actionClearCart: () => dispatch(actionClearCart()),
        clearPayment: (payload) => dispatch(clearPayment(payload)),
        getWidgetClear: () => dispatch(getWidgetClear()),
        actionClearDataOrder: () => dispatch(clearOrderData()),
        unlockGas: (payload) => dispatch(unlockGas(payload)),
        getCartFuel: () => dispatch(getCartFuel()),
        getWidgetId: () => dispatch(getWidgetId()),
        backHome: (payload) => dispatch(backHome(payload)),
        getDataMessages: () => dispatch(getDataMessages()),
        actionGetDataDeviceStatus: () => dispatch(getDataDeviceStatus()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
