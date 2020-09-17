import React, {Component} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
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
        let fuelColor = this.props.fuelColor.toString();
        //Если проверка (if) в функции getNumberPistol не прошла - значит топлива (вида) нет на выбранной колонке и покажем топливо только то которое доступно
        if (this.getNumberPistol()[1]) {
            return (
                <div className="fuelItem__wrapper">
                    <Link to={`/stationPage/selectTypePay/${this.props.numberGas}/${this.getNumberPistol()[0]}/${this.getNumberPistol()[1]}`} onClick={() => this.selectFuelHandler()}>
                        <div className={this.props.disabled ? 'fuelItem__wrapper inVisible-fuel' : 'fuelItem__wrapper visible-fuel'}>
                            <div className="fuelItem__section" style={{backgroundColor: `#${fuelColor}`}}>
                                <div className="fuelItem__description">
                                    <p className="fuelItem__fuelName">{this.props.fuelName}</p>
                                    <p className="fuelItem__number">{this.getNumberPistol()[0]}</p>
                                </div>
                            </div>
                            <div className="fuelItem__price-wrapper">
                                <p className="fuelItem__price">{this.props.fuelPrice} <span>&#8381;</span></p>
                            </div>
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

function mapStateToProps(state) {
    return {
        FuelPumps: state.FuelPumpsReducer.fuelPumps,
    }
}

export default connect(mapStateToProps, null)(FuelItem)