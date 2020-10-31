import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getCartFuel, paymentFinish, getWidgetId } from "../../actions/actionsPayOrder";
import { stageActive } from "../../actions/actionsStageProgress";
import './printCheck.scss';
//RxJs
import { interval, Subject } from "rxjs";
import { takeWhile, takeUntil } from 'rxjs/operators';

class PrintCheck extends Component {

    state = {
        getSubscription: null,
        getSubscriptionWidget: null,

        seconds: 10, //Время сессии в секундах
        imerEnd: false,
    }
    timer = 0;
    temerStart = false;

    componentDidMount() {
        this.setState({ imerEnd: false });
        this.temerStart = false;
        //Шаг стадия оплаты топлива
        this.props.stageActive("PrintCheck");

        this.getStatusCart();
        this.props.paymentFinish(this.props.widgetId.id);
        this.getTypePayment();
    }

    componentWillUnmount() {
        //Отписка (прекращение stream getStatusCart)
        if (this.state.getSubscription) {
            this.state.getSubscription.unsubscribe()
        }
        //Отписка (прекращение stream getTypePayment)
        if (this.state.getSubscriptionWidget) {
            this.state.getSubscriptionWidget.unsubscribe()
        }
        clearInterval(this.timer);
    }

    //Вызываем action getCartFuel пока статус корзины не прейдет VIEW - значит чек  не напечатан
    getStatusCart = () => {
        this.props.getCartFuel();
        const stopSignal$ = new Subject(); //Для остановки stream
        const interval1$ = interval(1000);
        const stream$ = interval1$
            .pipe(
                takeWhile(v => this.props.infoCart.status !== "VIEW"),
                takeUntil(stopSignal$)
            )
        const subscription = stream$.subscribe({
            next: v => this.props.getCartFuel(),
            complete: () => console.log('stream complete'),
            error: () => console.log('Error  notification'),
        })
        this.setState({
            getSubscription: subscription
        })
        //Остановим stream если нет ответа от сервера
        setTimeout(() => {
            stopSignal$.next()
        }, 8000);
    }

    //Вызываем action getWidgetId пока статус type не вернет NONE
    getTypePayment = () => {
        this.props.getWidgetId();
        const stream$ = interval(1000)
            .pipe(
                takeWhile(v => this.props.widgetId.type !== "NONE") //takeWhile - это условие по которому вызываеться стрим
            )
        //Данный стрим будет выполняться пока не сработает takeWhile
        const subscriptionWidget = stream$.subscribe({
            next: v => this.props.getWidgetId()
        })
        this.setState({
            getSubscriptionWidget: subscriptionWidget
        })
    }

    //Timer КОСТЫЛЬ
    countDown = () => {
        let seconds = this.state.seconds - 1;
        this.setState({ seconds: seconds, });
        //Когда таймер истек
        if (seconds === 0) {
            clearInterval(this.timer);
            this.setState({ timerEnd: true })
        }
    }
    //Последний экран
    showGetCheck = () => {
        if (!this.temerStart) {
            this.timer = setInterval(this.countDown, 1000);
            this.temerStart = true;
        }
        return (
            <div className={this.props.infoCart.status === "VIEW" ? "printCheck__status visible" : "printCheck__status"}>
                <div className="printCheck__text">Оплата прошла успешно</div>
                <div className="printCheck__text">Возьмите чек</div>
                <img src={"/images/checkWork.svg"} alt="VIEW" className="printCheck__check" />
            </div>
        );
    }
    //Timer

    render() {
        if (this.props.infoCart.status === "VIEW" && this.props.widgetId.type === "NONE") {
            this.showGetCheck()
        }
        if (this.state.timerEnd) {
            return <Redirect to="/" />
        }
        /* if (this.props.infoCart.status === "VIEW" && this.props.widgetId.type === "NONE") {
            return <Redirect to="/" />
        } */
        return (
            <div className="printCheck__wrapper" >
                <div className={this.props.infoCart.status === "PRN" ? "printCheck__status visible" : "printCheck__status"}>
                    <div className="printCheck__text">Печать чека</div>
                    <div className="printCheck__tet" />
                    <img src={"/images/checkWork.svg"} alt="PRN" className="printCheck__check" />
                </div>

                <div className={this.props.infoCart.status === "VIEW" ? "printCheck__status visible" : "printCheck__status"}>
                    <div className="printCheck__text">Оплата прошла успешно</div>
                    <div className="printCheck__text">Возьмите чек</div>
                    <img src={"/images/checkWork.svg"} alt="VIEW" className="printCheck__check" />
                </div>

                <div className={this.props.infoCart.status === "ERR" ? "printCheck__status visible" : "printCheck__status"}>
                    <div className="printCheck__text error">Сбой печати чека!</div>
                    <div className="printCheck__text error">Заказ отменен</div>
                    <img src={"/images/checkWork.svg"} alt="ERR" className="printCheck__check" />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    widgetId: state.PayOrderReducer.widgetId,
    infoCart: state.PayOrderReducer.cart,
})

const mapDispatchToProps = (dispatch) => ({
    paymentFinish: (widgetId) => dispatch(paymentFinish(widgetId)),
    getCartFuel: () => dispatch(getCartFuel()),
    stageActive: (nameStage, payload) => dispatch(stageActive(nameStage, payload)),
    getWidgetId: () => dispatch(getWidgetId())
})

export default connect(mapStateToProps, mapDispatchToProps)(PrintCheck);