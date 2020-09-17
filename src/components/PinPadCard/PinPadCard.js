import React, {Component} from "react";
import {connect} from "react-redux";
import { Redirect } from "react-router-dom";
import { stageActive } from "../../actions/actionsStageProgress";
import {getPaymentInfo, getPaymentChoosePay, paymentPay} from "../../actions/actionsPayOrder";
import "./pinPadCard.scss";
//RxJs
import {interval} from "rxjs";
import {takeWhile} from 'rxjs/operators';

class PinPadCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startPay: false, //Чтобы детектить загрузку
            allowClosingStatus: false,
            typePay: ""
        }
    }

    //Вызываем action getPaymentInfo пока сервер не вернет allowClosing = true (значит оплата прошла)
    getStatusPayment() {
        this.props.getPaymentInfo(this.props.widgetId.id);
        const stream$ = interval(1000)
            .pipe(
                takeWhile(v => this.props.paymentInfo.allowClosing !== true)
            )
        stream$.subscribe({
            next: v => this.props.getPaymentInfo(this.props.widgetId.id)
        })
    }

    componentDidMount() {
        const {typePay} = this.props.match.params;
        this.setState({
            startPay: true
        })
        this.props.actionStageActive("pay", true);
        this.getStatusPayment();
        let amountFloat = this.props.dataOrder.amount / 100;
        this.props.getPaymentChoosePay(this.props.widgetId.id, this.props.paramsGasFuel.typePay);
        this.props.paymentPay(this.props.widgetId.id, this.props.paramsGasFuel.typePay, amountFloat);
        this.props.getPaymentInfo(this.props.widgetId.id);
        if (typePay === "FLEET") {
            this.setState({
                typePay: "Приготовьте топливную карту"
            })
        } else {
            this.setState({
                typePay: "Приготовьте банковскую карту"
            })
        }
    }

    componentWillUnmount() {
        this.setState({
            startPay: false,
            allowClosingStatus: false
        })
    }

    render() {
        setTimeout(function() {
            if (this.props.paymentInfo.allowClosing === true) {
                this.setState({
                    allowClosingStatus: true
                })
            } else {
                console.log("Оплата не прошла")
            }
        }.bind(this), 3000)

        //Если allowClosingStatus = true (значит allowClosing = true, что значит, можно продолжпть оплату)
        if (this.state.allowClosingStatus) {
            return <Redirect to="/stationPage/printCheck/"/>
        }

        //Проверка ответа метода payment /api-v01/payment/${idWidget}/pay/${type}/0?amount=${sum}
        if (this.props.responsePay === 500) {
            return <Redirect to="/stationPage/errorPayBank/"/>
        }

        return (
            <div className="pinPadCard__wrapper">
                <p className="pinPadCard__text">
                    {this.state.typePay}
                </p>
                <p className="pinPadCard__text">
                    Следуете инструкции на ПИН-паде
                </p>
                <div className="pinPadCard__information"/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        widgetId: state.PayOrderReducer.widgetId,
        dataOrder: state.OrderFuelReducer.responseDataOrder,
        paymentInfo: state.PayOrderReducer.paymentInfo,
        payStatus: state.PayOrderReducer.payStatus,
        paramsGasFuel: state.SelectFuelReducer.paramsGasFuel,
        responsePay: state.PayOrderReducer.responsePay
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actionStageActive: (nameStage, payload) => dispatch(stageActive(nameStage, payload)),
        getPaymentInfo: (widgetId) => dispatch(getPaymentInfo(widgetId)),
        getPaymentChoosePay: (widgetId, type) => dispatch(getPaymentChoosePay(widgetId, type)),
        paymentPay: (widgetId, type, amount) => dispatch(paymentPay(widgetId, type, amount)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PinPadCard);