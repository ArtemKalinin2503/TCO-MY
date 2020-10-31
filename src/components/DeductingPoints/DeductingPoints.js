import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import FormDeductingPoints from "../Forms/FormDeductingPoints/FormDeductingPoints";
import { getTypePay } from "../../actions/actionsSelectFuel";
import { stageActive } from "../../actions/actionsStageProgress";
import "./deductingPoints.scss";

class DeductingPoints extends Component {

    state = {
        deductPoints: false,
        skipPoints: false
    }
    componentDidMount() {
        //Шаг стадия оплаты топлива
        this.props.stageActive("DeductingPoints");
    }
    //Кнопка списать баллы
    handlerDeductPoints = () => {
        this.props.getTypePay("LOYALTY"); //Передадим тип оплаты LOYALTY в store
        this.setState({
            deductPoints: true
        })
    }

    //Кнопка Пропустить (списать баллы) - баллы начисляються автоматически
    handleSkip = () => {
        this.setState({
            skipPoints: true
        })
    }

    componentWillUnmount() {
        this.setState({
            deductPoints: false,
            skipPoints: false
        })
    }
    renderGasFuel() {
        let _numberGas = this.props.dataFuel.numberGas;
        let _fuelId = this.props.dataFuel.fuelId ? this.props.dataFuel.fuelId : "crossedcircle";
        return (
            <>
                <div className="deductingPoints__head">Введите сумму баллов к списанию</div>
                <div className="deductingPoints__pagefuel">
                    <div className="deductingPoints__columngas">
                        <div className="deductingPoints__columngas__text">Колонка</div>
                        <div className="deductingPoints__columngas__num">{_numberGas}</div>
                    </div>
                    <div className="deductingPoints__choosefuel">
                        <div className="deductingPoints__choosefuel__text">Топливо</div>
                        <img src={`/images/${_fuelId}.svg`} alt="топливо"
                            className="deductingPoints__choosefuel__fuelId" />
                    </div>
                </div>
            </>
        )
    }

    render() {
        if (this.state.deductPoints) {
            return <Redirect to="/stationPage/pinPadCard/" />
        }
        if (this.state.skipPoints) {
            return <Redirect to="/stationPage/pinPadCard/" />
        }
        return (
            <div className="deductingPoints__wrapper">
                {this.renderGasFuel()}
                <div className="deductingPoints__keyboard">
                    <FormDeductingPoints />
                    <div className="deductingPoints__btn_wrapper" >
                        <div className="deductingPoints__btnAddBall" onClick={this.handleSkip}>
                            <div className="deductingPoints__textbtnf">Пропустить</div>
                            <div className="deductingPoints__textbtns">(начислить баллы)</div>
                        </div>
                        <div className="deductingPoints__btnWriteBall" onClick={this.handlerDeductPoints}>
                            <div className="deductingPoints__textbtn">Списать</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    selectFuel: state.OrderFuelReducer.selectFuel,
    dataFuel: state.SelectFuelReducer.selectFuel,
})

const mapDispatchToProps = (dispatch) => ({
    getTypePay: (typePay) => dispatch(getTypePay(typePay)),
    stageActive: (payload) => dispatch(stageActive(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DeductingPoints);