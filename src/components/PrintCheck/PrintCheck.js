import React, {Component} from "react";
import {connect} from "react-redux";
import { Redirect } from "react-router-dom";
import {getCartFuel, paymentFinish} from "../../actions/actionsPayOrder";
import {stageActive} from "../../actions/actionsStageProgress";
import './printCheck.scss';
//RxJs
import {interval, Subject} from "rxjs";
import {takeWhile, takeUntil} from 'rxjs/operators';

class PrintCheck extends Component{
    constructor(props) {
        super(props);
        this.state = {
            statusCheck: {
                begin: false,
                approve: false,
                error: false
            },
            startPrintCheck: false,
        }
    }

    componentDidMount() {
        this.setState({
            startPrintCheck: true,
        })
        this.props.actionStageActive("check", true)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.startPrintCheck !== this.state.startPrintCheck) {
            console.log('componentDidUpdate')
            //Вызов action для окончания оплаты
            this.props.paymentFinish(this.props.widgetId.id);
            this.getStatusCart();
        }
    }

    componentWillUnmount() {
        let changeStatusCheck = this.state.statusCheck;
        changeStatusCheck.begin = false;
        changeStatusCheck.approve = false;
        changeStatusCheck.error = false;
        this.setState({
            statusCheck: changeStatusCheck,
            startPrintCheck: false,
        })
        this.props.actionStageActive("check", false)
    }

    //Вызываем action getCartFuel пока статус корзины не прейдет VIEW - значит чек напечатан
    getStatusCart() {
        this.props.getCartFuel();
        const stopSignal$ = new Subject(); //Для остановки stream
        const interval1$ = interval(1000);
        const stream$ = interval1$
            .pipe(
                takeWhile(v => this.props.infoCart.status !== "VIEW"),
                takeUntil(stopSignal$)
            )
        stream$.subscribe({
            next: v => this.props.getCartFuel(),
            complete: () => console.log('stream complete'),
            error: () => console.log('Error  notification'),
        })
        //Остановим stream если нет ответа от сервера
        setTimeout(() => {
            stopSignal$.next()
        }, 8000);

        if (this.props.infoCart) {
            let newStatusCheck = this.state.statusCheck;

            if (this.props.infoCart.status === "PRN") {
                console.log('PRN')
                newStatusCheck.begin = true
                this.setState({
                    statusCheck: newStatusCheck
                })
            }
            if (this.props.infoCart.status === "VIEW") {
                console.log('VIEW')
                newStatusCheck.approve = true
                this.setState({
                    statusCheck: newStatusCheck
                })
            }
            if (this.props.infoCart.status === "ERR") {
                console.log('ERR')
                newStatusCheck.error = true
                this.setState({
                    statusCheck: newStatusCheck
                })
            }
        }
    }

    render() {
        if (this.props.infoCart.status === "VIEW") {
            return <Redirect to="/" />
        }
        return (
            <div className="printCheck__wrapper">
                <div className={this.props.infoCart.status === "PRN" ? "printCheck__status visible" : "printCheck__status"}>
                    <p className="printCheck__text">Печать чека</p>
                </div>
                <div className={this.props.infoCart.status === "VIEW" ? "printCheck__status visible" : "printCheck__status"}>
                    <p className="printCheck__text">Оплата прошла успешно</p>
                    <p className="printCheck__text">Возьмите чек</p>
                </div>
                <div className={this.props.infoCart.status === "ERR" ? "printCheck__status visible" : "printCheck__status"}>
                    <p className="printCheck__text">Сбой печати чека!</p>
                    <p className="printCheck__text">Заказ отменен</p>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        widgetId: state.PayOrderReducer.widgetId,
        infoCart: state.PayOrderReducer.cart,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        paymentFinish: (widgetId) => dispatch(paymentFinish(widgetId)),
        getCartFuel: () => dispatch(getCartFuel()),
        actionStageActive: (nameStage, payload) => dispatch(stageActive(nameStage, payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrintCheck);