import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getDataMessages } from "../../actions/actionsStatusDevice";
import { getDataSmena, setCloseSmena } from "../../actions/actionsReports";
import './Smeni.scss';

class Smeni extends Component {

    state = {
        numberSmena: null,
        openSmena: false,
        closeSmena: false
    }

    componentDidMount() {
        this.props.getDataMessages();
        this.props.getDataSmena();
    }

    //Вывод ошибок
    renderError = () => {
        if (this.props.messages && this.props.messages.messages) {
            if (this.props.messages.messages.length > 0) {
                return <Redirect to="/informationPage/technicalServicePage/smenimessage" />
            }
            /* return (
                this.props.messages.messages.map((item, index) => {
                    return (
                        <div key={index}>
                            <p className="Smeni__messages-error">{item.message}</p>
                        </div>

                    )
                })
            ) */
        }
    }

    //Вывод номера Смены
    renderNumberSmena = () => {
        let number;
        if (this.props.dataSmenaSuccess) {
            number = this.props.dataSmenaSuccess.number
        }
        return number
    }

    //Кнопка Открыть
    handleOpenSmena = () => {
        this.props.getDataMessages();
        this.setState({
            openSmena: true
        })
    }

    //Кнопка Закрыть
    handleCloseSmena = () => {
        this.props.getDataMessages();
        this.props.setCloseSmena();
        this.setState({
            closeSmena: true
        })
    }

    //Проеерка статуса
    checkedStatusSmena = () => {
        let status;
        //Если пытаемся закрыть смену
        if (this.state.closeSmena) {
            if (this.props.closeSmenaSuccess !== "200" || this.props.closeSmenaSuccess !== "202") {
                status = "Произошла ошибка просьба обратиться в службу поддержки"
            } else {
                status = "Смена закрыта успешно"
            }
        }
        return status;
    }

    //Отрисовка даты и время
    renderDateSmena = () => {
        if (this.props.dataSmenaSuccess) {
            let d = new Date(this.props.dataSmenaSuccess.begin);
            let formatDate = ('0' + d.getDate()).slice(-2) + '.' + ('0' + (d.getMonth() + 1)).slice(-2) + '.' + d.getFullYear() + ' в ' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2) + ':' + ('0' + d.getSeconds()).slice(-2);
            return (
                <div className="smena__date">
                    смена открыта: {formatDate}
                </div>
            )
        }
    }

    //Отрисовка кнопок
    renderButtons = () => {
        if (this.props.dataSmenaSuccess) {
            return (
                <>
                    <button
                        className="waves-effect waves-light btn-large btn-report btn-report_open"
                        disabled={this.props.dataSmenaSuccess.isClose ? "" : "disabled"}
                        onClick={this.handleOpenSmena}
                    >
                        Открыть
                    </button>
                    <button
                        className="waves-effect waves-light btn-large btn-report btn-report_close"
                        disabled={this.props.dataSmenaSuccess.isClose ? "disabled" : ""}
                        onClick={this.handleCloseSmena}
                    >
                        Закрыть
                    </button>
                </>
            )
        }
    }

    render() {
        if (this.state.openSmena) {
            return <Redirect to="/informationPage/technicalServicePage/smeni/smenichange/" />
        }
        return (
            <div className='Smeni__wrapper'>
                <div className="Smeni">
                    <h3>Меню управления сменами</h3>
                    <h4>Выберите действие</h4>
                    <h2>Номер текущей смены: {this.renderNumberSmena()}</h2>
                    {this.renderDateSmena()}
                    <p className="Smeni__error-status">{this.checkedStatusSmena()}</p>
                    {/*Если есть ошибка*/}
                    {this.renderError()}
                    <div className='buttons'>
                        {this.renderButtons()}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    messages: state.StatusDeviceReducer.messages,
    dataSmenaSuccess: state.ReportReducer.dataSmenaSuccess,
    closeSmenaSuccess: state.ReportReducer.closeSmenaSuccess,
})

const mapDispatchToProps = (dispatch) => ({
    getDataMessages: () => dispatch(getDataMessages()),
    getDataSmena: () => dispatch(getDataSmena()),
    setCloseSmena: () => dispatch(setCloseSmena()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Smeni);