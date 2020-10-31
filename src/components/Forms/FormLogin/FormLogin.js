import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import KeyboardVirtual from "../../KeyboardVirtual/KeyboardVirtual";
import { loginAuth, passAuth, addLoginUser, userAuthExit } from '../../../actions/actionsAuth';
import './formLogin.scss';

class FormLogin extends Component {

    state = {
        checkedToken: false,
        exitAuth: false,
        messageAuth: ""
    }

    componentDidMount() {
        //Выставим фокус на input Логин
        let inputLogin = document.getElementById('login');
        if (inputLogin) {
            inputLogin.focus()
        }
    }

    //Получаем данные введенные в поле Логин и Пароль
    updateDataLogin = (login, pass) => {
        this.props.actLoginAuth(login)
        this.props.actPassAuth(pass)
    }

    //Кнопка Войти
    handlerLogin = () => {
        this.props.addLogin(this.props.loginAuth, this.props.passAuth); //Передача введенного Логина и Пароль при Авторизации
        this.setState({
            checkedToken: true,
            exitAuth: false,
        });
    }

    //Кнопка Выход
    handlerExit = () => {
        this.props.exitLogin();
        this.setState({
            exitAuth: true,
        })
    }

    componentWillUnmount() {
        this.props.exitLogin();
    }

    render() {
        //Если пришел токен - значит авторизация прошла успешно
        if (this.state.checkedToken) {
            if (this.props.tokenAutUser.accessToken) {
                return <Redirect to="/informationPage/technicalServicePage" /> // редирект на техническое обслуживание
            }
        }
        //Если нажали на Выход
        if (this.state.exitAuth) {
            return <Redirect to="/" />
        }
        return (
            <div className="formLogin__wrapper">
                <h3 className="formLogin__title">Введите данные</h3>
                <KeyboardVirtual
                    changeLogin={(login, pass) => this.updateDataLogin(login, pass)}
                    authUser={this.props.tokenAutUser.accessToken}
                    activeComponent={"formLogin"}
                    type="TwoInput"
                    keyboardType="number"
                />
                <div className="formLogin__Instruction">
                    <p className="formLogin__Instruction-text">После окончания нажмите кнопку "Войти"</p>
                    <p className="formLogin__error-auth">
                        {this.props.errorToken}
                    </p>
                    <div className="formLogin__btn-wrapper">
                        <button
                            className="waves-effect waves-light btn btn-exit"
                            onClick={this.handlerExit}
                        >
                            Выход
                        </button>
                        <button
                            className="waves-effect waves-light btn btn-enter"
                            onClick={this.handlerLogin}
                            disabled={!this.props.loginAuth && !this.props.passAuth}
                        >
                            Войти
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    loginAuth: state.AuthReducer.loginAuth,
    passAuth: state.AuthReducer.passAuth,
    errorToken: state.AuthReducer.error,
    tokenAutUser: state.AuthReducer.tokenAutUser
})

const mapDispatchToProps = (dispatch) => ({
    actLoginAuth: (payload) => dispatch(loginAuth(payload)),
    actPassAuth: (payload) => dispatch(passAuth(payload)),
    addLogin: (loginVal, passVal) => dispatch(addLoginUser(loginVal, passVal)),
    exitLogin: () => dispatch(userAuthExit())
})

export default connect(mapStateToProps, mapDispatchToProps)(FormLogin)