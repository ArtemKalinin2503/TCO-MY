import React, {Component} from "react";
import { connect } from "react-redux";
import { getFuelPumps, lockGas, getNumberGas } from "../../actions/actionsFuelPumps";
import { stageActive } from "../../actions/actionsStageProgress";
import { getSelectDataFuel } from "../../actions/actionsOrderFuel";
import FuelItem from "../FuelItem/FuelItem";
import Preloader from "../Preloader/Preloader";
import "./gasFuelSelect.scss"

//Компонент Выбора Топлива на колонке
class GasFuelSelect extends Component{

    constructor(props) {
        super(props);
        this.state = {
            intervalId: 0,
            renderPistol: 0
        }
    }

    componentDidMount() {
        const {numberGas} = this.props.match.params;
        //Для получения данных о статусе колонок (нужно все время опрашивать api)
        let intervalId = setInterval(function () {
            this.props.actionGetFuelPumps(false);
        }.bind(this), 3000);

        this.setState({
            intervalId: intervalId,
        });

        //Для компонента GasStage - активныя стадия
        this.props.actionStageActive("selectFuel", true);
        this.props.actionStageActive("card", false);

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
   /* shouldComponentUpdate(nextProps, nextState) {
        // eslint-disable-next-line no-self-compare
        return this.props.FuelPumps !== this.props.FuelPumps
    }*/

    //Получим номер выбранной колонки и название топлива
    handlerGetFuelOrder = (nameFuel) => {
        const {numberGas} = this.props.match.params;
        this.props.getSelectDataFuel(numberGas, nameFuel);
    }

    checkedUpPistol = () => {
        const {numberGas} = this.props.match.params;
        let numberGasParam = Number(numberGas);
        let selectArr = null;
        if (this.props.FuelPumps.grades) {
            if (numberGasParam === this.props.numberGasPistolUp) {
                selectArr = this.props.filterFuelPumps.grades
            } else {
                selectArr = this.props.FuelPumps.grades
            }
        }
        return selectArr
    }

    renderGrades() {
        console.log('renderGrades')
        if (this.props.FuelPumps.grades) {
            const {numberGas} = this.props.match.params; //Получим номер выбраной колонки из url
            return (
                this.checkedUpPistol().map((item) => {
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
                <Preloader/>
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

function mapStateToProps(state) {
    return {
        FuelPumps: state.FuelPumpsReducer.fuelPumps,
        filterFuelPumps: state.FuelPumpsReducer.filterFuelPumps,
        numberGasPistolUp: state.FuelPumpsReducer.numberGasPistolUp,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actionGetFuelPumps: (payload) => dispatch(getFuelPumps(payload)),
        actionStageActive: (nameStage, payload) => dispatch(stageActive(nameStage, payload)),
        getSelectDataFuel: (numberGas, nameFuel) => dispatch(getSelectDataFuel(numberGas, nameFuel)),
        lockGas: (numberGas) => dispatch(lockGas(numberGas)),
        getNumberGas: (paylaod) => dispatch(getNumberGas(paylaod))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GasFuelSelect)