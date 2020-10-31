import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { stageActive } from "../../actions/actionsStageProgress";
import { getPaymentInfo, getPaymentChoosePay, paymentPay, paymentPayClear } from "../../actions/actionsPayOrder";
import "./pinPadCard.scss";
//RxJs
import { interval } from "rxjs";
import { takeWhile } from 'rxjs/operators';

class PinPadCard extends Component {

    state = {
        typePay: "",
        getSubscription: null
    }

    //Вызываем action getPaymentInfo пока сервер не вернет allowClosing = true (значит оплата прошла)
    getStatusPayment() {
        this.props.getPaymentInfo(this.props.widgetId.id);
        const stream$ = interval(3000)
            .pipe(
                takeWhile(v => this.props.paymentInfo.allowClosing !== true)
            )
        const subscription = stream$.subscribe({
            next: v => this.props.getPaymentInfo(this.props.widgetId.id)
        })

        this.setState({
            getSubscription: subscription
        })
    }

    componentDidMount() {
        //Шаг стадия оплаты топлива
        this.props.stageActive("PinPadCard");

        const { typePay } = this.props.match.params;

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
        this.props.paymentPayClear();
        //Отписка (прекращение stream getStatusPayment)
        if (this.state.getSubscription) {
            this.state.getSubscription.unsubscribe()
        }
    }

    render() {
        //Если allowClosingStatus = true (значит, что можно продолжпть оплату)
        if (this.props.paymentInfo.allowClosing === true) {
            return <Redirect to="/stationPage/printCheck/" />
        }

        //Проверка ответа метода payment /api-v01/payment/${idWidget}/pay/${type}/0?amount=${sum}
        if (this.props.errorPay) {
            return <Redirect to="/stationPage/errorPayBank/" />
        }

        return (
            <div className="pinPadCard__wrapper">
                <div className="pinPadCard__head">
                    {this.state.typePay}
                </div>
                <div className="pinPadCard__tet">
                    <div className="pinPadCard__title">
                        Следуйте инструкции на ПИН-паде
                </div>
                    <div className="pinPadCard__information" />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    widgetId: state.PayOrderReducer.widgetId,
    dataOrder: state.OrderFuelReducer.responseDataOrder,
    paymentInfo: state.PayOrderReducer.paymentInfo,
    payStatus: state.PayOrderReducer.payStatus,
    paramsGasFuel: state.SelectFuelReducer.paramsGasFuel,
    responsePay: state.PayOrderReducer.responsePay,
    errorPay: state.PayOrderReducer.errorPay
})

const mapDispatchToProps = (dispatch) => ({
    stageActive: (payload) => dispatch(stageActive(payload)),
    getPaymentInfo: (widgetId) => dispatch(getPaymentInfo(widgetId)),
    getPaymentChoosePay: (widgetId, type) => dispatch(getPaymentChoosePay(widgetId, type)),
    paymentPay: (widgetId, type, amount) => dispatch(paymentPay(widgetId, type, amount)),
    paymentPayClear: () => dispatch(paymentPayClear()),
})

export default connect(mapStateToProps, mapDispatchToProps)(PinPadCard);