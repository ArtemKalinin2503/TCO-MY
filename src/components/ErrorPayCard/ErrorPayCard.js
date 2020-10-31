import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { stageActive } from "../../actions/actionsStageProgress";

import "./errorPayCard.scss";

class ErrorPayCard extends Component {

    state = {
        answer: null,
    }
    componentDidMount() {
        //Шаг стадия оплаты топлива
        this.props.stageActive("ErrorPayCard");
    }
    //Кнопка
    handlerSubmit = (_answer) => {
        this.setState({ answer: _answer })
    }
    render() {
        if (this.state.answer) {
            return <Redirect to={this.state.answer} />
        }
        return (
            <div className="errorPayCard__wrapper">
                <div className="errorPayCard__head">
                    Произошла ошибка при оплате картой
                </div>
                <div className="errorPayCard__tet">
                    <div className="errorPayCard__title">
                        Хотите повторить оплату ?
                </div>
                    <div className="errorPayCard__btn-wrapper">
                        <div onClick={() => this.handlerSubmit("/stationPage/pinPadCard/")} className="errorPayCard__btn-wrapper__Yes">
                            <div className="errorPayCard__information">Да</div>
                        </div>
                        <div onClick={() => this.handlerSubmit("/")} className="errorPayCard__btn-wrapper__No">
                            <div className="errorPayCard__information">Нет</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    paramsGasFuel: state.SelectFuelReducer.paramsGasFuel,
})
const mapDispatchToProps = (dispatch) => ({
    stageActive: (payload) => dispatch(stageActive(payload)),
})
export default connect(mapStateToProps, mapDispatchToProps)(ErrorPayCard);