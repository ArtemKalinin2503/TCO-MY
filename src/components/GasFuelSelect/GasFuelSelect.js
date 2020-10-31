import React, { Component } from "react";
import { connect } from "react-redux";
import { getFuelPumps, lockGas, getNumberGas } from "../../actions/actionsFuelPumps";
import { stageActive } from "../../actions/actionsStageProgress";
import { getSelectDataFuel } from "../../actions/actionsOrderFuel";
import FuelItem from "../FuelItem/FuelItem";
import Preloader from "../Preloader/Preloader";
import "./gasFuelSelect.scss"

//Компонент Выбора Топлива на колонке
class GasFuelSelect extends Component {

    state = {
        intervalId: 0,
        renderPistol: 0
    }

    componentDidMount() {
        //Шаг стадия оплаты топлива
        this.props.stageActive("GasFuelSelect");

        const { numberGas } = this.props.match.params;
        //Для получения данных о статусе колонок (нужно все время опрашивать api)
        let intervalId = setInterval(function () {
            this.props.actionGetFuelPumps(true);
        }.bind(this), 3000);

        this.setState({
            intervalId: intervalId,
        });

        //Для блокировки колонки после того как выбрали колонку
        this.props.lockGas(numberGas);

        //Запишем номер выбранной колонки в store
        this.props.getNumberGas(numberGas);
    }

    //Очищение interval - после удаления данного компонента
    componentWillUnmount() {
        clearInterval(this.state.intervalId)
    }

    //Метод который проверяет данные - если они не изменились то не производить render компонента повторно
     shouldComponentUpdate(nextProps, nextState) {
         if (this.props.FuelPumps.pumps !== nextProps.FuelPumps.pumps) {
             return true;
         }
         return false;
     }

    //Получим номер выбранной колонки и название топлива
    handlerGetFuelOrder = (nameFuel) => {
        const { numberGas } = this.props.match.params;
        this.props.getSelectDataFuel(numberGas, nameFuel);
    }

    //Проверка на поднятый пистолет
    checkedUpPistol = () => {
        const { numberGas } = this.props.match.params;
        let numberGasNumber= Number( numberGas );
        let selectArr = this.props.FuelPumps.grades;
        //Массив с данными о колонке где поднят пистолет
        this.props.arrGasPistolUp.map((item) => {
            //Данные о пистолетах в отдельном массиве nozzles
            item.nozzles.map((itemNozzle) => {
                //Если номер поднятого пистолета равен номеру пистолета в массиве nozzles
                if (item.nozzleNumber === itemNozzle.number) {
                    this.props.FuelPumps.grades.map((itemGrades) => {
                        //Если id из массива топлива равен gradeId пистолета который поднят и номер выбраной колокни совпали с параметром number (данный параметр это номер колонки)
                        if (itemGrades.id === itemNozzle.gradeId && item.number === numberGasNumber) {
                            //console.log(itemGrades);
                            selectArr = itemGrades;
                        }
                    })
                }
            })
        })

        return selectArr
    }

    //Вывод топлива (так как если пистолет не снят на ТРК, приходит массив, а если снят то объект)
    renderFuelItem = (pistolArr) => {
        const { numberGas } = this.props.match.params;
        if (pistolArr.length) {
            return (
                pistolArr.map((item) => {
                    return (
                        <FuelItem
                            key={item.id}
                            numberGas={numberGas}
                            fuelId={item.id}
                            fuelName={item.fuelName}
                            fuelPrice={item.price}
                            fuelColor={item.color}
                            disabled={item.isDisabled}
                            selectFuel={(nameFuel) => this.handlerGetFuelOrder(nameFuel)}
                            pistolUp={item.pistolUp}
                            numberGasPistolUp={item.numberGasPistolUp}
                        />
                    )
                })
            )
        } else {
           return (
               <FuelItem
                   key={pistolArr.id}
                   numberGas={numberGas}
                   fuelId={pistolArr.id}
                   fuelName={pistolArr.fuelName}
                   fuelPrice={pistolArr.price}
                   fuelColor={pistolArr.color}
                   disabled={pistolArr.isDisabled}
                   selectFuel={(nameFuel) => this.handlerGetFuelOrder(nameFuel)}
                   pistolUp={pistolArr.pistolUp}
                   numberGasPistolUp={pistolArr.numberGasPistolUp}
               />
           )
        }
    }

    renderGrades() {
        this.checkedUpPistol();
        if (this.props.FuelPumps.grades) {
            return (
                <div>
                    <div className="gasFuelSelect__head">Выберите вид топлива</div>
                    <div className="gasFuelSelect__fuels">
                        {this.renderFuelItem(this.checkedUpPistol())}
                    </div>
                </div>
            )
        } else {
            return (
                <Preloader />
            )
        }
    }

    render() {
        return (
            <div className="gasFuelSelect__wrapper">
                {this.renderGrades()}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    FuelPumps: state.FuelPumpsReducer.fuelPumps,
    arrGasPistolUp: state.FuelPumpsReducer.arrGasPistolUp,
    numberGasPistolUp: state.FuelPumpsReducer.numberGasPistolUp,
})

const mapDispatchToProps = (dispatch) => ({
    actionGetFuelPumps: (payload) => dispatch(getFuelPumps(payload)),
    stageActive: (payload) => dispatch(stageActive(payload)),
    getSelectDataFuel: (numberGas, nameFuel) => dispatch(getSelectDataFuel(numberGas, nameFuel)),
    lockGas: (numberGas) => dispatch(lockGas(numberGas)),
    getNumberGas: (payload) => dispatch(getNumberGas(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(GasFuelSelect)