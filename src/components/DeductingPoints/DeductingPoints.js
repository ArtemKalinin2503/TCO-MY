import React, {Component} from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import FormDeductingPoints from "../Forms/FormDeductingPoints/FormDeductingPoints";
import { getTypePay } from "../../actions/actionsSelectFuel";
import "./deductingPoints.scss";

class DeductingPoints extends Component {

    constructor(props) {
        super(props);
        this.state = {
            deductPoints: false,
            skipPoints: false
        }
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

    render() {
        if (this.state.deductPoints) {
            return <Redirect to="/stationPage/pinPadCard/"/>
        }
        if (this.state.skipPoints) {
            return <Redirect to="/stationPage/pinPadCard/"/>
        }
        return (
            <div className="deductingPoints__wrapper">
                <div className="deductingPoints__title">
                    Введите сумму баллов к списанию
                </div>
                <div className="deductingPoints__infoOrder-wrapper">
                    <div className="deductingPoints__infoOrder-item">
                        <p>Колонка</p>
                        <span className="deductingPoints__infoOrder-gas">{this.props.selectFuel.numberGas}</span>
                    </div>
                    <div className="deductingPoints__infoOrder-item">
                        <p>Топливо</p>
                        <span className="deductingPoints__infoOrder-fuel">{this.props.selectFuel.nameFuel}</span>
                    </div>
                </div>
                <FormDeductingPoints />
                <div className="deductingPoints__btn-wrapper">
                    <button
                        className="deductingPoints__btnAddBall"
                        onClick={this.handleSkip}
                    >
                        Пропустить (начислить баллы)
                    </button>
                    <button
                        className="deductingPoints__btnWriteBall"
                        onClick={this.handlerDeductPoints}
                    >
                        Списать
                    </button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        selectFuel: state.OrderFuelReducer.selectFuel,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getTypePay: (typePay) => dispatch(getTypePay(typePay))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeductingPoints);