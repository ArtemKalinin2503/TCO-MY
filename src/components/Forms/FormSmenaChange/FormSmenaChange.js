import React, {Component} from "react";
import { connect } from "react-redux";
import KeyboardVirtual from "../../KeyboardVirtual/KeyboardVirtual";
import {setOpenSmena} from "../../../actions/actionsReports/index"
import './formSmenaChange.scss';

class FormSmenaChange extends Component {

    constructor(props) {
        super(props);
        this.state = {
            numberSmeny: 0,
            checkStatus: false,
            openSmena: false,
        }
    }

    //Получим введеный номер смены
    getNumberSmeny = (numberSmeny) => {
        this.setState({
            numberSmeny: numberSmeny
        })
    }

    //Кнопка Открыть/Закрыть
    handleChangeSmenu= () => {
        this.setState({
            checkStatus: true
        })
        //Открыть смену
        this.props.setOpenSmena(this.state.numberSmeny);
        this.setState({
            openSmena: true
        })
    }

    //Проверка на статус вызваного метода Открыть/Закрыть
    checkStatusSmena = () => {
        let status;
        //Если пытаемся открыть смену
        if (this.state.openSmena) {
            if (this.props.openSmenaSuccess !== "200" || this.props.openSmenaSuccess !== "202") {
                status = "Произошла ошибка просьба обратиться в службу поддержки"
            } else {
                status = "Смена открыта успешно"
            }
        }
        return status
    }

    render() {
        return (
            <div className='formSmenaChange__wrapper'>
                <h3 className="formSmenaChange__title">{this.props.title}</h3>
                <p className="formSmenaChange__messageStatus">{this.checkStatusSmena()}</p>
                <div className="mainBlock">
                    <div>
                        <KeyboardVirtual
                            activeComponent={"changeSmenu"}
                            type="OneInput"
                            keyboardType="number"
                            getNumberSmeny={(numberSmeny) => this.getNumberSmeny(numberSmeny)}
                        />
                        <button
                            className="waves-effect waves-light btn greenButton"
                            onClick={this.handleChangeSmenu}
                        >
                            {this.props.textButton}
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        openSmenaSuccess: state.ReportReducer.openSmenaSuccess,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setOpenSmena: (numberSmena) => dispatch(setOpenSmena(numberSmena)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormSmenaChange);