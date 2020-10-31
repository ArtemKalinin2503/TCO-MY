import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getOpt } from "../../../actions/actionsOperatingMode";
import Preloader from "../../Preloader/Preloader";
import { addLoginUser } from "../../../actions/actionsAuth";
import { actionClearCart, clearPayment, getWidgetClear, getCartFuel, getWidgetId, clearCartStore, clearPaymentInfo } from "../../../actions/actionsPayOrder";
import { getFuelPumps, unlockGas } from "../../../actions/actionsFuelPumps";
import { clearToken } from "../../../utils/utils";
import { clearOrderData } from "../../../actions/actionsOrderFuel";
import { backHome } from "../../../actions/actionsBackHome";
import { getDataDeviceStatus, getDataMessages } from "../../../actions/actionsStatusDevice";
import { stageActive } from "../../../actions/actionsStageProgress";
import './homePage.scss';
import { getDataSmena } from "../../../actions/actionsReports";
//RxJs
import { interval } from "rxjs";
import { takeWhile } from 'rxjs/operators'
import ComponentWaiting from "../../ComponentWaiting/ComponentWaiting";
import BtnHomePage from "../../../components/BtnHomePage/BtnHomePage";

class HomePage extends Component {

    state = {
        checkedMessages: false,
        selectInfo: false,
        getSubscription: null,
        allGasNotWork: false,
        intervalCheckedGasStatus: 0
    }

    componentDidMount() {
        //Шаг стадия оплаты топлива
        this.props.stageActive("HomePage");

        //Сбросить токен чтобы выполнить логин
        //clearToken();

        //Запрос авторизации приложения
        this.checkedOptMode();

        this.backgroundSurvey();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.opt.state !== prevProps.opt.state) {
            this.backgroundSurvey();
        }
    }

    //Фоновые процессы
    backgroundSurvey = () => {
        console.log('backgroundSurvey')
        //Так как каждый метод реста работает только если есть авторизация (наличие токена)
        if (this.props.opt.state === "OPTMODE") {
            //Получить состояние смены
            this.props.getDataSmena();

            //Сброс шагов (стадия оплаты топлива)
            //this.props.clearStage();

            //Запрос статуса корзины
            this.props.getCartFuel();

            //Опрос доспуного оборудования для оплаты
            this.props.actionGetDataDeviceStatus();

            //Запрос widget
            this.props.getWidgetId('HomePage');

            //Запрос ТРК на АЗС
            this.props.actionGetFuelPumps(true);

            //Запус проверки на доступность ТРК
            let intervalCheckedGasStatus = setInterval(function () {
                this.checkedGasStatus();
            }.bind(this), 3000); //Данный интервал срабатывает при запуске
            this.setState({
                intervalCheckedGasStatus: intervalCheckedGasStatus,
            });

            this.checkDispState();
        }
    }

    componentWillUnmount() {
        this.props.backHome(false);
        //Отписка (прекращение stream checkedOptMode)
        if (this.state.getSubscription) {
            this.state.getSubscription.unsubscribe()
        }
        //Очистим store (результат работы метода payment) - нужно для повторной оплаты
        this.props.clearPaymentInfo();
        //Очищение в store корзины
        this.props.clearCartStore();
        clearInterval(this.state.intervalCheckedGasStatus);
        //Очищение в store widget
        this.props.getWidgetClear();
    }

    //Данная функция проверяет статус "Проверка режима работы" (если OPTMODE не приходит от api - значит делаем запрос повторно пока не получим ответ OPTMODE)
    checkedOptMode() {
        this.props.actionOpt();
        const stream$ = interval(5000)
            .pipe(
                takeWhile(v => this.props.opt.state !== "OPTMODE") //takeWhile - это условие по которому вызываеться стрим
            )
        //Данный стрим будет выполняться пока не сработает takeWhile
        const subscription = stream$.subscribe({
            next: v => this.props.actionOpt()
        })
        this.setState({
            getSubscription: subscription
        })
    }

    checkDispState() {
        this.props.getWidgetClear();
        this.props.actionClearDataOrder();

        //Если вернулись назад и колонку которую выбрали ранее нужно вывести из режима налива (потому что оплата)
        if (this.props.numberSelectGas) {
            this.props.unlockGas(this.props.numberSelectGas)
        }
    }

    //Кнопка Проверка
    checkDataMessages = () => {
        this.props.getDataMessages();
        this.setState({
            checkedMessages: true
        })
    }

    //Кнопка Информация
    selectInfo = () => {
        this.setState({
            selectInfo: true
        })
    }

    //Функция которая отрисовывает контент
    renderHomePage = () => {
        if (this.state.selectInfo) {
            return <Redirect to="/informationPage" />
        }
        if (this.state.checkedMessages && this.props.messages) {
            alert(JSON.stringify(this.props.messages.messages, "", 4));
        }
        if (this.props.opt.state === "OPTMODE" && this.props.IsCartEnabled) {
            //Про статусы написано в задаче ТСО-719
            if (this.props.isOpenSmena) {
                return (
                    <>
                        <div className="homePage__section-action">
                            <BtnHomePage btnText="Заправка" type="fuelGas" isEnable={this.props.enabledGadgetPay && !this.state.allGasNotWork} allGasNotWork={this.state.allGasNotWork} />
                            <BtnHomePage btnText="Возврат" type="Return" isEnable={true} />
                        </div>
                        <div className="homePage__action-information" onClick={this.selectInfo}>
                            Информация
                        </div>
                    </>
                )
            } else {
                //Если смена закрыта
                return (
                    <>
                        <div className="homePage__smenidiv">
                            <div className="homePage__smeniClose">
                                <p>Внимание! </p>
                                <p>Терминал временно не работает</p>
                            </div>
                        </div>
                        <div className="homePage__action-information" onClick={this.selectInfo}>
                            Информация
                        </div>
                    </>
                )
            }
        } else {
            return <Preloader />
        }
    }

    //Проверка на доступность терминала
    renderError = () => {
        if (this.props.dataSmenaSuccess != null && !this.props.dataSmenaSuccess.isClose) {
            //Если устройства для оплаты не доступны
            if (this.props.statusDevice && this.props.enabledGadgetPay === false) {
                return (
                    <div className="homePage__errorStatus">
                        <p>Внимание!</p>
                        <p>Заказ топлива временно не доступен</p>
                    </div>
                )
            }
            if (this.props.widgetId.type !== "PAYMENT" && this.props.infoCart.length) {
                return (
                    <div className="homePage__errorStatus">
                        <p>Терминал не работает!</p>
                    </div>
                )
            }
            if (this.props.infoCart.status === "RET" && this.props.infoCart.length) {
                return (
                    <div className="homePage__errorStatus">
                        <p>Терминал не работает!</p>
                    </div>
                )
            }
            if (this.state.allGasNotWork) {
                return (
                    <div className="homePage__errorStatus">
                        <p>Внимание!</p>
                        <p>Заказ топлива временно не доступен</p>
                    </div>
                )
            }
        }
    }

    //Проверка доступных колонок
    checkedGasStatus = () => {
        let arrGasDisabled = [];
        if (this.props.FuelPumps.pumps) {
            // eslint-disable-next-line array-callback-return
            this.props.FuelPumps.pumps.map((item, index) => {
                //Статус колонки Не работает
                if (item.status === 'None' || item.status === 'Error' || item.status === 'Close') {
                    console.log('Статус Не работает')
                    arrGasDisabled.push(item)
                    this.setState({
                        arrGasDisabled: arrGasDisabled
                    })
                } else {
                    arrGasDisabled.slice(index, 1)
                }
                //Статус колонки Занята
                if (item.posOwner !== 0 || item.typeConfig !== "PREAUTH") {
                    console.log('Статус Занята')
                    arrGasDisabled.push(item)
                } else {
                    arrGasDisabled.slice(index, 1)
                }
            })
            //Если количество недоступных ТРК равно общему количеству ТРК на АЗС
            if (arrGasDisabled.length >= this.props.FuelPumps.pumps.length) {
                this.setState({
                    allGasNotWork: true
                })
            } else {
                this.setState({
                    allGasNotWork: false
                })
            }
        }
    }

    render() {
        return (
            <>
                {this.props.opt.state === "OPTMODE" ? <ComponentWaiting/> : null}
                <button className="waves-effect waves-light btn btn-message" onClick={this.checkDataMessages}>
                    Проверка
                </button>
                <div className="homePage__wrapper">
                    {this.renderError()}
                    {this.renderHomePage()}
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    opt: state.OptModeReducer.optMode,
    widgetId: state.PayOrderReducer.widgetId,
    numberSelectGas: state.FuelPumpsReducer.numberSelectGas,
    infoCart: state.PayOrderReducer.cart,
    backHomeStatus: state.BackHomeReducer.backHome,
    messages: state.StatusDeviceReducer.messages,
    enabledGadgetPay: state.StatusDeviceReducer.enabledGadgetPay,
    statusDevice: state.StatusDeviceReducer.statusDevice,
    FuelPumps: state.FuelPumpsReducer.fuelPumps,
    dataSmenaSuccess: state.ReportReducer.dataSmenaSuccess,
    isOpenSmena: state.ReportReducer.isOpenSmena,
    IsCartEnabled: state.PayOrderReducer.IsCartEnabled,
})

const mapDispatchToProps = (dispatch) => ({
    getDataSmena: () => dispatch(getDataSmena()),
    actionOpt: () => dispatch(getOpt()),
    addLoginUser: () => dispatch(addLoginUser()),
    actionClearCart: () => dispatch(actionClearCart()),
    clearPayment: (payload) => dispatch(clearPayment(payload)),
    getWidgetClear: () => dispatch(getWidgetClear()),
    actionClearDataOrder: () => dispatch(clearOrderData()),
    unlockGas: (payload) => dispatch(unlockGas(payload)),
    getCartFuel: (typePage) => dispatch(getCartFuel(typePage)),
    getWidgetId: (typePage) => dispatch(getWidgetId(typePage)),
    backHome: (payload) => dispatch(backHome(payload)),
    getDataMessages: () => dispatch(getDataMessages()),
    actionGetDataDeviceStatus: () => dispatch(getDataDeviceStatus()),
    clearCartStore: () => dispatch(clearCartStore()),
    clearPaymentInfo: () => dispatch(clearPaymentInfo()),
    stageActive: (payload) => dispatch(stageActive(payload)),
    actionGetFuelPumps: (payload) => dispatch(getFuelPumps(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
