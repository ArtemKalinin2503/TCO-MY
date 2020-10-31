import React, { Component } from "react";
import { connect } from "react-redux";
import {getDataDeviceStatus} from "../../actions/actionsStatusDevice";
import {getCartFuel, getWidgetId} from "../../actions/actionsPayOrder";
import {getFuelPumps} from "../../actions/actionsFuelPumps";
import "./componentWaiting.scss";
import {getDataSmena} from "../../actions/actionsReports";


//Данный компонент нужен для оптимизации так как, слишком много методов нужно опрашивать для начала заказа топлива
class ComponentWaiting extends Component {

    state = {
        currentCount: 10, //Количество секунд (через сколько показать данный компонент)
        intervalWaiting: 0,
        intervalWaitingMin: 0
    }

    componentDidMount() {
        //Запрос статуса корзины
        this.props.getCartFuel('HomePage');

        this.startTimer();
        //Для прослушки в фоновом режиме
        let intervalWaitingMin = setInterval(function () {
            this.props.actionGetDataDeviceStatus();
            //Запрос статуса корзины
            this.props.getCartFuel('HomePage');
            //Запрос ТРК на АЗС
            this.props.actionGetFuelPumps(true);
            //Получить состояние смены
            this.props.getDataSmena();
        }.bind(this), 60000); //Время через сколько будет сделан запрос в режиме ожидания
        this.setState({
            intervalWaitingMin: intervalWaitingMin,
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
        clearInterval(this.state.intervalWaiting);
        clearInterval(this.state.intervalWaitingMin);
    }

    timer = () => {
        this.setState({ currentCount: this.state.currentCount -1 });
    }

    startTimer = () => {
        let intervalId = setInterval(this.timer, 1000);
        this.setState({intervalId: intervalId});
    }

    //Клик по блоку с тенью
    handleResetWaiting = () => {
        this.startTimer();
        this.setState({
            currentCount: 10
        })

        let intervalWaiting = setInterval(function () {
            this.props.actionGetDataDeviceStatus();
            //Запрос статуса корзины
            this.props.getCartFuel('HomePage');
            //Запрос widget
            this.props.getWidgetId('HomePage');
            //Запрос ТРК на АЗС
            this.props.actionGetFuelPumps(true);
            //Получить состояние смены
            this.props.getDataSmena();
        }.bind(this), 5000);
        this.setState({
            intervalWaiting: intervalWaiting,
        });
    }

    render() {
        if (this.state.currentCount === 0) {
            clearInterval(this.state.intervalId);
            clearInterval(this.state.intervalWaiting);
            return (
                <div
                    className="componentWaiting__wrapper"
                    onClick={this.handleResetWaiting}
                />
            )
        } else {
            return null
        }
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actionGetDataDeviceStatus: () => dispatch(getDataDeviceStatus()),
        getCartFuel: (typePage) => dispatch(getCartFuel(typePage)),
        getWidgetId: (typePage) => dispatch(getWidgetId(typePage)),
        actionGetFuelPumps: (payload) => dispatch(getFuelPumps(payload)),
        getDataSmena: () => dispatch(getDataSmena()),
    }
}

export default connect(null, mapDispatchToProps)(ComponentWaiting);