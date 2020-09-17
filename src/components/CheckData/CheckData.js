import React, {Component} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import FormDataCheck from "../Forms/FormDataCheck/FormDataCheck";
import { getEmailCheck, getPhoneCheck } from "../../actions/actionsPayOrder/";
import "./checkData.scss";

//Компонент Для ввода данных для получения чека
class CheckData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            typePay: "BANK",
            email: "",
            phone: ""
        }
    }

    componentDidMount() {
        console.log(this.props.paramsGasFuel);
    }

    getDataUserOrder = (email, phone) => {
        this.setState({
            email: email,
            phone: phone
        })
    }

    handlerDismiss = () => {
        console.log('handlerDismiss')
    }

    //Кнопка Отправить
    handlerSubmit = () => {
        this.props.getEmailCheck(this.state.email);
        this.props.getPhoneCheck(this.state.phone);
    }

    render() {
        return(
            <div className="checkData__wrapper">
                <h3 className="checkData__title">Введите данные для получения электронной копии чека</h3>
                <FormDataCheck
                    getDataUser={(email, phone) => this.getDataUserOrder(email, phone)}
                />
                <div className="checkData__btn-wrapper">
                    <Link to={`/stationPage/quantityFuel/${this.props.paramsGasFuel.numberGasParams}/${this.props.paramsGasFuel.numberFuelParams}/${this.props.paramsGasFuel.idGradesFuel}/${this.state.typePay}`}
                          className="waves-effect waves-light btn btn-dismiss"
                          onClick={this.handlerDismiss}
                    >
                        Пропустить
                    </Link>
                    <Link to={`/stationPage/quantityFuel/${this.props.paramsGasFuel.numberGasParams}/${this.props.paramsGasFuel.numberFuelParams}/${this.props.paramsGasFuel.idGradesFuel}/${this.state.typePay}`}
                          className="waves-effect waves-light btn btn-submit"
                          onClick={this.handlerSubmit}
                    >
                        Отправить
                    </Link>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        paramsGasFuel: state.SelectFuelReducer.paramsGasFuel,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getEmailCheck: (payload) => dispatch(getEmailCheck(payload)),
        getPhoneCheck: (payload) => dispatch(getPhoneCheck(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckData);