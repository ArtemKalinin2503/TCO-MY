import React, {Component} from "react";
import {connect} from "react-redux";
import { Redirect } from "react-router-dom";
import {getDataSelectFuel, getParamsGasFuel} from "../../actions/actionsSelectFuel";
import { getDataFuelOrder, getOrderFuel } from "../../actions/actionsOrderFuel";
import Preloader from "../Preloader/Preloader";
import KeyboardVirtual from "../KeyboardVirtual/KeyboardVirtual";
import {stageActive} from "../../actions/actionsStageProgress";
import {
    actionNewTransaction,
    actionClearCart,
    getCartFuel,
    getWidgetId,
    clearPayment,
    getWidgetClear
} from "../../actions/actionsPayOrder";
//RxJs
import {interval} from "rxjs";
import {takeWhile} from 'rxjs/operators';
//Styles
import "./quantityFuel.scss";


//Компонент выбора количества топлива выбранного для покупки
class QuantityFuel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            startPayment: false,
            maxVolume: false,
            maxMoney: false
        }
    }

    componentDidMount() {
        const {idGas} = this.props.match.params; //id выбранной колонки
        const {numberPistol} = this.props.match.params; //Получим id выбраного топлива из url
        const {idGradePistol} = this.props.match.params;
        const {typePay} = this.props.match.params; //Получим выбранный тип оплаты

        this.props.getParamsGasFuel(idGas, numberPistol, idGradePistol, typePay); //Перададим их в store

        this.props.actionGetDataSelectFuel(
            idGas,
            idGradePistol,
            this.props.FuelPumps.grades,
            numberPistol
        );

        this.props.actionClearCart();
        this.props.getWidgetClear();
        this.props.actionStageActive("card", true);
        this.props.actionStageActive("pay", false);

        //Если widgetId.id есть - значит пользователь вернулся на шаг назад (значит удаляем заказ)
        if (this.props.widgetId.id) {
            this.props.clearPayment(this.props.widgetId.id);
        }

        this.setState({
            startPayment: false,
            redirect: false,
        })

        //Выставим фокус на input Сумма
        let inputSum = document.getElementById('sum');
        if(inputSum) {
            inputSum.focus()
        }
    }

    //Получаем данные введенные в поле Сумма и Литры
    updateDataFuel = (sum, litres) => {
        const {idFuel} = this.props.match.params; //Получим id выбраного топлива из url
        this.props.actionGetOrderFuel(sum, litres); //Передадим в store количество топлива и количество литров которые ввел пользователь
        let valueOrderFuel =  this.props.orderFuel.sum * 100; //Сумма в копейках
        let valueOrderFuelMath = Math.round(valueOrderFuel) //округление до целого числа
        let priceFuel = this.props.dataFuel.fuelPrice * 100; //Цена в копейках (требование api)
        //Если пользователь ввел Сумму или Литры меняеться запрос к api
        let changeOrder;
        let litresSan;
        //По требованию api нужно подставить или сумму или литры
        if (sum) {
            let numSum = Number(sum)
            changeOrder = this.props.orderFuel.sum;

            //Для ограничения ввода количества Сумма
            if (numSum >= this.props.dataOrder.maxMoney) {
                this.setState({
                    maxMoney: true
                })
            } else {
                this.setState({
                    maxMoney: false
                })
            }
        }
        if (litres) {
            let numLitres = Number(litres)
            changeOrder = this.props.orderFuel.litres;
            litresSan = this.props.orderFuel.litres * 100; //Так как данные необходимо передать на api в сантилитрах

            //Для ограничения ввода количества литров
            if (numLitres >= this.props.dataOrder.maxVolume) {
                this.setState({
                    maxVolume: true
                })
            } else {
                this.setState({
                    maxVolume: false
                })
            }
        }

        //Action который получает данные о сумме или литрах топлива исходя из введеных значений пользователем
        this.props.actionGetDataFuelOrder(
            changeOrder, //valueSum
            litresSan, //valueLitres
            this.props.dataFuel.fuelCode, //gradeId
            idFuel, //nozzle
            priceFuel, //price
            "VOLUME", //calculation,
            valueOrderFuelMath //valueOrderFuel
        );


    }

    //Функция которая вызывает метод widget до тех пор пока данный метод не вернет type="PAYMENT"
    getTypePayment() {
        this.props.getWidgetId();
        const stream$ = interval(1000)
            .pipe(
                takeWhile(v => this.props.widgetId.type !== "PAYMENT") //takeWhile - это условие по которому вызываеться стрим
            )
        //Данный стрим будет выполняться пока не сработает takeWhile
        stream$.subscribe({
            next: v => this.props.getWidgetId()
        })
    }

    //Оплатить
    handlerPayFuel = () => {
        const {idGas} = this.props.match.params; //id выбранной колонки
        const {idGradePistol} = this.props.match.params; //Получим id выбраного топлива из url
        const {numberPistol} = this.props.match.params; //Номер выбранного писталета
        let inputAmount = this.props.orderFuel.sum / 100 * 100; //Сумма введенная пользователем
        let inputAmountFixed = inputAmount.toFixed(2);
        let inputVolume = this.props.orderFuel.litres; //Количетво литров введенные пользователем
        let volume = this.props.dataOrder.volume / 100; //Количество литров (в сантимлитрах) которые отдал сервер на основание введенных данных пользовоталем
        let amount = this.props.dataOrder.amount / 100; //Сумма к оплате (в копейках) за топлива которую отдал сервер на основание введенных данных пользователем
        let amountFixed = amount.toFixed(2);
        let email = "";
        let phone = "";

        //Если не заполнили поле email
        if (this.props.emailCheck) {
            email = this.props.emailCheck;
        } else {
            email = "не указан"
        }
        //Если не заполнили поле phone
        if (this.props.phoneCheck) {
            phone = this.props.phoneCheck;
        } else {
            phone = "не указан"
        }

        this.props.actionNewTransaction(idGas, idGradePistol, numberPistol, amountFixed, inputAmountFixed, volume, inputVolume, this.props.widgetId,  phone, email,);
        this.props.getCartFuel();
        this.getTypePayment();

        this.setState({
            redirect: true,
            startPayment: true
        })
    }

    //Вывод разметки
    renderQuantityFuel() {
        if (this.props.dataFuel) {
            let fuelColor = this.props.dataFuel.fuelColor.toString();
            return (
                <div className="quantityFuel__section-left">
                    <div className="quantityFuel__numberGas-wrapper">
                        <p className="quantityFuel__numberGas">{this.props.dataFuel.numberGas}</p>
                    </div>
                    <div className="quantityFuel__description" style={{backgroundColor: `#${fuelColor}`}}>
                        <p className="quantityFuel__fuelName">{this.props.dataFuel.fuelName}</p>
                        <p className="quantityFuel__fuelid">{this.props.dataFuel.numberPistol}</p>
                    </div>
                    <div className="quantityFuel__price-wrapper">
                        <p className="quantityFuel__price">{this.props.dataFuel.fuelPrice} <span>&#8381;</span></p>
                    </div>
                </div>
            )
        } else {
            return <Preloader/>
        }
    }

    renderSection() {
        if (this.state.startPayment && this.props.widgetId.type !== "PAYMENT") {
            return (
                <div className="preloader__wrapper-quantity">
                    <Preloader/>
                </div>
            )
        } else {
            if (this.props.dataFuel) {
                let price;
                //Подставляю разные значения в зависимости, что ввел пользователь (сумму или литры)
                if (this.props.dataOrder.totalPrice > 0) {
                    price = this.props.dataOrder.totalPrice;
                } else {
                    price = this.props.dataOrder.amount / 100;
                }
                return (
                    <>
                        <div className="quantityFuel__info">
                            <p>Минимальная сумма заказа {this.props.dataFuel.fuelPrice} <span>&#8381;</span></p>
                            <div className={this.state.maxMoney ? "quantityFuel__messages-error visible" : "quantityFuel__messages-error"}>
                               Внимание Вы ввели максимально возможную сумму заказа: {this.props.dataOrder.maxMoney} <span>&#8381;</span>
                            </div>
                            <div className={this.state.maxVolume ? "quantityFuel__messages-error visible" : "quantityFuel__messages-error"}>
                                Внимание Вы ввели максимально возможное количество литров: {this.props.dataOrder.maxVolume}
                            </div>
                        </div>
                        <div className="quantityFuel__wrapper">
                            {this.renderQuantityFuel()}
                            <KeyboardVirtual
                                selectLitres={(sum, litres) => this.updateDataFuel(sum, litres)}
                                activeComponent={"quantityFuel"}
                                totalLitres={this.props.dataOrder.totalLitres}
                                totalPrice={price}
                                type="TwoInput"
                                keyboardType="number"
                                maxVolume={this.state.maxVolume}
                                maxMoney={this.state.maxMoney}
                            />
                            <div className="quantityFuel__pay-wrapper">
                                <button className="waves-effect waves-light btn #2979ff blue accent-3 btnPay" onClick={this.handlerPayFuel}>Оплатить</button>
                            </div>
                        </div>
                    </>
                )
            }

        }
    }

    render() {
        const {typePay} = this.props.match.params; //Получим выбранный тип оплаты
        if (this.props.widgetId.type === "PAYMENT" && this.state.redirect && typePay !== "FLEET"){
            return <Redirect to="/stationPage/cardLoyalties/"/>
        }
        //Если выбран тип оплаты Топливная карта - не показываем карту Лояльности
        if (this.props.widgetId.type === "PAYMENT" && this.state.redirect && typePay === "FLEET"){
            return <Redirect to={`/stationPage/pinPadCard/${typePay}`}/>
        }
        return (
            <div>
                {this.renderSection()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        FuelPumps: state.FuelPumpsReducer.fuelPumps,
        dataFuel: state.SelectFuelReducer.selectFuel,
        orderFuel: state.OrderFuelReducer.orderFuel,
        dataOrder: state.OrderFuelReducer.responseDataOrder,
        paramsGasFuel: state.SelectFuelReducer.paramsGasFuel,
        widgetId: state.PayOrderReducer.widgetId,
        emailCheck: state.PayOrderReducer.emailCheck,
        phoneCheck: state.PayOrderReducer.phoneCheck
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actionGetDataSelectFuel: (numberGas, fuelId, grades, numberPistol) => dispatch(getDataSelectFuel(numberGas, fuelId, grades, numberPistol)),
        actionGetOrderFuel: (valueSum, valueLitres) => dispatch(getOrderFuel(valueSum, valueLitres)),
        actionGetDataFuelOrder: (valueSum, valueLitres, gradeId, nozzle, price, calculation, valueOrderFuel) =>
            dispatch(getDataFuelOrder(valueSum, valueLitres, gradeId, nozzle, price, calculation, valueOrderFuel)),
        actionNewTransaction: (idGas, gradeId, nozzle, amount, InputAmount, volume, inputVolume, widgetId, emailCheck, phoneCheck) =>
            dispatch(actionNewTransaction(idGas, gradeId, nozzle, amount, InputAmount, volume, inputVolume, widgetId, emailCheck, phoneCheck)),
        actionClearCart: () => dispatch(actionClearCart()),
        getCartFuel: () => dispatch(getCartFuel()),
        getParamsGasFuel: (numberGas, numberFuel, idGradePistol, typePay) => dispatch(getParamsGasFuel(numberGas, numberFuel, idGradePistol, typePay)),
        getWidgetId: () => dispatch(getWidgetId()),
        actionStageActive: (nameStage, payload) => dispatch(stageActive(nameStage, payload)),
        clearPayment: (payload) => dispatch(clearPayment(payload)),
        getWidgetClear: () => dispatch(getWidgetClear())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuantityFuel)