import React, {Component} from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {getDataSmena, getReportSmena, getReportX, getReportZ, clearAllReports} from "../../actions/actionsReports";
import {getDataMessages} from "../../actions/actionsStatusDevice";
import Preloader from "../Preloader/Preloader";
import './Reports.scss'

class Reports extends Component {

    state = {
        startReportZ: false,
        startReportX: false,
        startReportSmena: false,
    }

    componentDidMount() {
        this.props.getDataSmena(); //Получить данные по смене
        this.props.getDataMessages();
        this.props.clearAllReports(); //Отчистим все отчеты из store
    }

    //Кнопка Z-отчет
    handleReportZ = () => {
        this.props.getReportZ();
        this.setState({
            startReportZ: true
        })
    }

    //Кнопка X-отчет
    handleReportX = () => {
        this.props.getReportX();
        this.setState({
            startReportX: true
        })
    }

    //Кнопка Смена-отчет
    handleReportSmenna = () => {
        if (this.props.dataSmenaSuccess.number) {
            this.props.getReportSmena(this.props.dataSmenaSuccess.number);
        }
        this.setState({
            startReportSmena: true
        })
    }

    //Вывод ошибок
    renderError = () => {
        if (this.props.messages) {
            return (
                this.props.messages.messages.map((item, index) => {
                    return (
                        <div key={index}>
                            <p className="Reports__messages-error">{item.message}</p>
                        </div>
                    )
                })
            )
        }
    }

    //Вывод  верстки
    renderReportsComponent = () => {
        if (this.props.zReportLoading || this.props.xReportLoading || this.props.smenaReportLoading) {
            return (
                <Preloader />
            )
        } else {
            return (
                <div className='buttons'>
                    <div className="button" onClick={this.handleReportZ}>
                        <div className="shadow">
                            <div className="message">
                                <p>z-отчет</p>
                            </div>
                        </div>
                    </div>
                    <div className="button" onClick={this.handleReportX}>
                        <div className="shadow">
                            <div className="message">
                                <p>x-отчет</p>
                            </div>
                        </div>
                    </div>
                    <div className="button" onClick={this.handleReportSmenna}>
                        <div className="shadow">
                            <div className="message">
                                <p>Сменный отчет</p>
                            </div>
                        </div>
                    </div>
                    <div className="Reports__error-wrapper">
                        <p className={this.props.zReportError ? "onVisible-error" : "inVisible-error"}>Ошибка Z отчета</p>
                        <p className={this.props.xReportError ? "onVisible-error" : "inVisible-error"}>Ошибка X отчета</p>
                        <p className={this.props.smenaReportError ? "onVisible-error" : "inVisible-error"}>Ошибка Сменна отчета</p>
                    </div>
                </div>
            )
        }
    }

    render() {
        console.log(this.props.zReportError)
        //Redirect на компонент печати
        if (this.state.startReportZ || this.state.startReportX || this.state.startReportSmena) {
            if (this.props.zReportSuccess && this.props.zReportSuccess.status === 202) {
                return <Redirect to="/informationPage/technicalServicePage/reports/print"/>
            }
            if (this.props.xReportSuccess && this.props.xReportSuccess.status === 202) {
                return <Redirect to="/informationPage/technicalServicePage/reports/print"/>
            }
            if (this.props.smenaReportSuccess && this.props.smenaReportSuccess.status === 202) {
                return <Redirect to="/informationPage/technicalServicePage/reports/print"/>
            }
        }
        return (
            <div className='Reports__wrapper'>
                <div className="Reports">
                    <h3>Меню управления отчетами</h3>
                    <h4>Выберите отчет</h4>
                    {/*Если есть ошибка в ответе метода messages*/}
                    {this.renderError()}
                    {this.renderReportsComponent()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    zReportSuccess: state.ReportReducer.zReportSuccess,
    xReportSuccess: state.ReportReducer.xReportSuccess,
    smenaReportSuccess: state.ReportReducer.smenaReportSuccess,
    dataSmenaSuccess: state.ReportReducer.dataSmenaSuccess,
    messages: state.StatusDeviceReducer.messages,
    //Для preloader
    zReportLoading: state.ReportReducer.zReportLoading,
    xReportLoading: state.ReportReducer.xReportLoading,
    smenaReportLoading: state.ReportReducer.smenaReportLoading,
    //Error
    zReportError: state.ReportReducer.zReportError,
    xReportError: state.ReportReducer.xReportError,
    smenaReportError: state.ReportReducer.smenaReportError,
})

const mapDispatchToProps = (dispatch) => ({
    getReportZ: () => dispatch(getReportZ()),
    getReportX: () => dispatch(getReportX()),
    getReportSmena: (id) => dispatch(getReportSmena(id)),
    getDataSmena: () => dispatch(getDataSmena()),
    getDataMessages: () => dispatch(getDataMessages()),
    clearAllReports: () => dispatch(clearAllReports()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Reports);