import React, {Component} from "react";
import { connect } from "react-redux";
import {getParamsGasFuel} from "../../actions/actionsSelectFuel";
import {getDataDeviceStatus} from "../../actions/actionsStatusDevice";
import BtnTypePay from "../BtnTypePay/BtnTypePay";
import "./selectTypePay.scss";

//Компонент выбора способа оплаты
class SelectTypePay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fuelCard: false,
        }
    }

    componentDidMount() {
        const {idGas} = this.props.match.params; //id выбранной колонки
        const {numberPistol} = this.props.match.params; //Получим id выбраного топлива из url
        const {idGradePistol} = this.props.match.params; //Получим id выбраного топлива из url
        this.props.getParamsGasFuel(idGas, numberPistol, idGradePistol);

        //Проверка на доступность оборудование
        this.props.actionGetDataDeviceStatus();
    }

    checkedDeviceStatus() {
        if (this.props.statusDevice) {
            return (
                this.props.statusDevice.map((item, index) => {
                    return (
                        <BtnTypePay
                            key={index}
                            name={item.name}
                            type={item.type}
                            isEnable={item.isEnable}
                            paramsGasFuel={this.props.paramsGasFuel}
                        />
                    )
                })
            )
        }
    }

    render() {
        console.log(this.props.statusDevice)
        return (
            <div className="selectTypePay__wrapper">
                <div className={this.state.fuelCard ? 'selectTypePay__section no-visible' : 'selectTypePay__section'}>
                    <h3 className="selectTypePay__title">Выбирите тип оплаты</h3>
                    {this.checkedDeviceStatus()}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        statusDevice: state.StatusDeviceReducer.statusDevice,
        paramsGasFuel: state.SelectFuelReducer.paramsGasFuel,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getParamsGasFuel: (numberGas, numberFuel, idGradePistol) => dispatch(getParamsGasFuel(numberGas, numberFuel, idGradePistol)),
        actionGetDataDeviceStatus: () => dispatch(getDataDeviceStatus()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectTypePay);