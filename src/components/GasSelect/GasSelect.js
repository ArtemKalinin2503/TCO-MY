import React, { Component } from "react";
import { connect } from "react-redux";
import { getFuelPumps, unlockGas } from "../../actions/actionsFuelPumps";
import { stageActive } from "../../actions/actionsStageProgress"
import Preloader from "../Preloader/Preloader";
import GasStationStatus from "../GasStationStatus/GasStationStatus";
import "./gasSelect.scss";

//Компонент вывода всех доступных колонок на АЗС
class GasSelect extends Component {


    componentDidMount() {
        //Шаг стадия оплаты топлива
        this.props.stageActive("GasSelect");

        //Так как статус колонок может измениться опрашиваем каждую 3 секунды
        this.setStatusGas();
        this.interval = setInterval(this.setStatusGas, 3000);

        //Если вернулись назад и колонку которую выбрали ранее нужно вывести из режима налива
        if (this.props.numberSelectGas) {
            this.props.unlockGas(this.props.numberSelectGas)
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    //Опрашиваем статус колонок
    setStatusGas = () => {
        this.props.actionGetFuelPumps(true);
    }

    //Рендер всех колонок на АЗС со статусами
    renderGasStation = () => {
        if (this.props.FuelPumps.pumps) {
            return (
                <div>
                    <div className="gasSelect__head">Выберите номер колонки</div>
                    <div className="gasSelect__trks">
                        {this.props.FuelPumps.pumps.map((item, index) => {
                            return (
                                <GasStationStatus
                                    key={index}
                                    numberGasStation={item.number}
                                    gasStationStatus={item.status}
                                    posOwner={item.posOwner}
                                    typeConfig={item.typeConfig}
                                />
                            )
                        })}
                    </div>
                </div>
            )
        } else {
            return (
                <div className="gasSelect__error">
                    <p>Сервис недоступен</p>
                </div>
            )
        }
    }

    //Рендер всего компонента
    renderStationPage = () => {
        if (this.props.FuelPumps.pumps) {
            return (
                <div className="gasSelect__gasStation-wrapper">
                    <ul className="gasSelect__gasStation-list">
                        {this.renderGasStation()}
                    </ul>
                </div>
            )
        } else {
            return <Preloader />
        }
    }

    render() {
        return (
            <div className="gasSelect__wrapper">
                {this.renderStationPage()}
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    FuelPumps: state.FuelPumpsReducer.fuelPumps,
    numberSelectGas: state.FuelPumpsReducer.numberSelectGas
})

const mapDispatchToProps = (dispatch) => ({
    actionGetFuelPumps: (payload) => dispatch(getFuelPumps(payload)),
    stageActive: ( payload) => dispatch(stageActive(payload)),
    unlockGas: (payload) => dispatch(unlockGas(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(GasSelect)