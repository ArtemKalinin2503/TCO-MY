import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { clearLoyalty } from "../../actions/actionsCardLoyalties";
import { stageActive } from "../../actions/actionsStageProgress";
import "./errorLoyaltiesCard.scss";

class ErrorLoyaltiesCard extends Component {

    state = {
        answer: null,
    }

    //Кнопка
    handlerSubmit = (_answer) => {
        this.setState({ answer: _answer })
    }
    componentDidMount() {
        //Шаг стадия оплаты топлива
        this.props.stageActive("ErrorLoyaltiesCard");
        //this.props.clearLoyalty()
    }

    render() {
        if (this.state.answer) {
            return <Redirect to={this.state.answer} />
        }
        return (
            <div className="errorLoyaltiesCard__wrapper">
                <div className="errorLoyaltiesCard__head">
                    Произошла ошибка карты лояльности
                </div>
                <div className="errorLoyaltiesCard__tet">
                    <div className="errorLoyaltiesCard__title">
                        Хотите повторить ?
                </div>
                    <div className="errorLoyaltiesCard__btn-wrapper">
                        <div onClick={() => this.handlerSubmit("/stationPage/cardLoyalties/")} className="errorLoyaltiesCard__btn-wrapper__Yes">
                            <div className="errorLoyaltiesCard__information">Да</div>
                        </div>
                        <div onClick={() => this.handlerSubmit("/stationPage/pinPadCard/")} className="errorLoyaltiesCard__btn-wrapper__No">
                            <div className="errorLoyaltiesCard__information">Нет</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clearLoyalty: () => dispatch(clearLoyalty()),
        stageActive: (payload) => dispatch(stageActive(payload)),
    }
}

export default connect(null, mapDispatchToProps)(ErrorLoyaltiesCard);