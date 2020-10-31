import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import GasSelect from "../../GasSelect/GasSelect";
import GasStage from "../../GasStage/GasStage";
import GasFuelSelect from "../../GasFuelSelect/GasFuelSelect";
import QuantityFuel from "../../QuantityFuel/QuantityFuel";
import BtnBack from "../../BtnBack/BtnBack";
import CardLoyalties from "../../CardLoyality/CardLoyalties";
import SelectTypePay from "../../SelectTypePay/SelectTypePay";
import CheckData from "../../CheckData/CheckData";
import TimerWork from "../../TimerWork/TimerWork";
import { getDataDeviceStatus } from "../../../actions/actionsStatusDevice";
import PinPadCard from "../../PinPadCard/PinPadCard";
import PrintCheck from "../../PrintCheck/PrintCheck";
import DeductingPoints from "../../DeductingPoints/DeductingPoints";
import ErrorPayCard from "../../ErrorPayCard/ErrorPayCard";
import BtnHome from "../../BtnHome/BtnHome";
import './stationPage.scss';
import ErrorLoyaltiesCard from "../../ErrorLoyaltiesCard/ErrorLoyaltiesCard";


class StationPage extends Component {

    componentDidMount() {
        //Опрашиваем статус устройств (принтер, сканер и так далее)
        this.props.actionGetDataDeviceStatus();
    }

    render() {
        const { history } = this.props;
        return (
            <div className="stationPage__wrapper">
                <TimerWork />
                <GasStage currentPage={this.props.currentPage} />
                <Switch>
                    <Route history={history} path="/stationPage" component={GasSelect} exact />
                    <Route history={history} path="/stationPage/gasFuelSelect" component={GasFuelSelect} exact />
                    <Route history={history} path="/stationPage/gasFuelSelect/:numberGas" component={GasFuelSelect} exact />
                    <Route history={history} path="/stationPage/cardLoyalties/" component={CardLoyalties} exact />
                    <Route history={history} path="/stationPage/deductingPoints/" component={DeductingPoints} exact />
                    <Route history={history} path="/stationPage/selectTypePay/" component={SelectTypePay} exact />
                    <Route history={history} path="/stationPage/selectTypePay/:idGas/:numberPistol/:idGradePistol/" component={SelectTypePay} exact />
                    <Route history={history} path="/stationPage/checkDat/" component={CheckData} exact />
                    <Route history={history} path="/stationPage/quantityFuel/" component={QuantityFuel} exact />
                    <Route history={history} path="/stationPage/quantityFuel/:idGas/:numberPistol/:idGradePistol/:typePay" component={QuantityFuel} exact />
                    <Route history={history} path="/stationPage/pinPadCard/" component={PinPadCard} exact />
                    <Route history={history} path="/stationPage/pinPadCard/:typePay" component={PinPadCard} exact />
                    <Route history={history} path="/stationPage/printCheck/" component={PrintCheck} exact />
                    <Route history={history} path="/stationPage/errorPayBank/" component={ErrorPayCard} exact />
                    <Route history={history} path="/stationPage/errorLoyaltiesCard/" component={ErrorLoyaltiesCard} exact />
                </Switch>
                <BtnHome  currentPage={this.props.currentPage}/>
                <BtnBack history={history}  currentPage={this.props.currentPage}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currentPage: state.ReducerStageProgress.currentPage,
})

const mapDispatchToProps = (dispatch) => ({
    actionGetDataDeviceStatus: () => dispatch(getDataDeviceStatus()),
})

export default connect(mapStateToProps, mapDispatchToProps)(StationPage);