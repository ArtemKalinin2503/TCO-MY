import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import BtnFuel from "../BtnFuel/BtnFuel.js";
import "./fuelItem.scss";

//Компонент визуализации данных по доступному топливу на выбранной колонке АЗС
class FuelItem extends Component {
    //Функция которая вычесляет номер пистолета
    getNumberPistol() {
        let selectNumberPistol = null;
        let selectIdGradePistol = null;
        this.props.FuelPumps.pumps.map((pumps) => {
            return (
                // eslint-disable-next-line array-callback-return
                pumps.nozzles.map((pistol) => {
                    //Так как данные из api приходят в разных массивах (grades и pumps)
                    if (this.props.fuelId === pistol.gradeId) {
                        selectNumberPistol = pistol.number;
                        selectIdGradePistol = pistol.gradeId;
                    }
                })
            )
        })
        return [selectNumberPistol, selectIdGradePistol]
    }
    selectFuelHandler = () => {
        this.props.selectFuel(this.props.fuelName);
    }
    renderFuelItem = () => {
        //Если проверка (if) в функции getNumberPistol не прошла - значит топлива (вида) нет на выбранной колонке и покажем топливо только то которое доступно
        if (this.getNumberPistol()[1]) {
            return (
                <div className="fuelItem__wrapper">
                    <Link className="fuelItem__link" to={`/stationPage/selectTypePay/${this.props.numberGas}/${this.getNumberPistol()[0]}/${this.getNumberPistol()[1]}`} onClick={() => this.selectFuelHandler()}>
                        <div className={this.props.disabled ? 'fuelItem__wrapper inVisible-fuel' : 'fuelItem__wrapper visible-fuel'}>
                            <BtnFuel isSelect={false} isEnable={true} fuelId={this.props.fuelId}
                                gun={this.getNumberPistol()[0]} price={this.props.fuelPrice} />
                        </div>
                    </Link>
                </div>
            )
        }
    }
    render() {
        return (
            <>
                {this.renderFuelItem()}
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    FuelPumps: state.FuelPumpsReducer.fuelPumps,
})

export default connect(mapStateToProps, null)(FuelItem)