import React, { Component } from "react";
import { connect } from "react-redux";
import { getParamsGasFuel } from "../../actions/actionsSelectFuel";
import { getDataDeviceStatus } from "../../actions/actionsStatusDevice";
import BtnTypePay from "../BtnTypePay/BtnTypePay";
import { stageActive } from "../../actions/actionsStageProgress";
import "./selectTypePay.scss";

//Компонент выбора способа оплаты
class SelectTypePay extends Component {

    state = {
        fuelCard: false,
    }

    componentDidMount() {
        //Шаг стадия оплаты топлива
        this.props.stageActive("SelectTypePay");

        const { idGas } = this.props.match.params; //id выбранной колонки
        const { numberPistol } = this.props.match.params; //Получим id выбраного топлива из url
        const { idGradePistol } = this.props.match.params; //Получим id выбраного топлива из url
        this.props.getParamsGasFuel(idGas, numberPistol, idGradePistol);

        //Проверка на доступность оборудование
        this.props.actionGetDataDeviceStatus();
    }

    checkedDeviceStatus() {
        if (this.props.statusDevice) {
            return (
                <div className={this.state.fuelCard ? 'selectTypePay__section no-visible' : 'selectTypePay__section'}>
                    <div className="selectTypePay__head">Выберите тип оплаты</div>
                    <div className="selectTypePay__pays"></div>
                    {this.props.statusDevice.map((item, index) => {
                        return (
                            <BtnTypePay
                                key={index}
                                name={item.name}
                                type={item.type}
                                isEnable={item.isEnable}
                                paramsGasFuel={this.props.paramsGasFuel}
                            />
                        )
                    })}
                </div>
            )
        }
    }

    render() {
        return (
            <div className="selectTypePay__wrapper">
                {this.checkedDeviceStatus()}
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    statusDevice: state.StatusDeviceReducer.statusDevice,
    paramsGasFuel: state.SelectFuelReducer.paramsGasFuel,
})

const mapDispatchToProps = (dispatch) => ({
    getParamsGasFuel: (numberGas, numberFuel, idGradePistol) => dispatch(getParamsGasFuel(numberGas, numberFuel, idGradePistol)),
    actionGetDataDeviceStatus: () => dispatch(getDataDeviceStatus()),
    stageActive: (payload) => dispatch(stageActive(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectTypePay);