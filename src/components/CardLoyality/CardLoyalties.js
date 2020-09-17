import React, {Component} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FormCardLoyalties from "../Forms/FormCardLoyality/FormCardLoyalties";
import {stageActive} from "../../actions/actionsStageProgress";
import { getWidgetId } from "../../actions/actionsPayOrder";
import "./сardLoyalties.scss";

//Компонент выбора карты Лояльности
class CardLoyalties extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardLoyalties: false
        }
    }

    componentDidMount() {
        this.props.actionStageActive("card", true);
    }

    componentWillUnmount() {
        this.setState({
            cardLoyalties: false
        })
    }

    handlerApproved = () => {
        this.setState({
            cardLoyalties: true
        })
    }

    handlerDismiss = () => {
        console.log('!!!!!!');
    }

    renderFormLoyalties() {
        if (this.state.cardLoyalties) {
            return <FormCardLoyalties/>
        }
    }

    render() {
        return (
            <div className="cardLoyalties__wrapper">
                <h3 className={this.state.cardLoyalties ? "cardLoyalties__title no-visible" : "cardLoyalties__title "}>Вы являетесь участником программы лояльности ?</h3>
                <div className={this.state.cardLoyalties ? "cardLoyalties__btn-wrapper no-visible" : "cardLoyalties__btn-wrapper"}>
                    <button className="waves-effect waves-light btn btn-yes"
                            onClick={this.handlerApproved}>
                        Да
                    </button>
                    <Link
                        to={`/stationPage/pinPadCard/`}
                        onClick={this.handlerDismiss}
                        className="waves-effect waves-light btn btn-no"
                    >
                        Нет
                    </Link>
                </div>
                <div className="cardLoyalties__wrapper-form">
                    {this.renderFormLoyalties()}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        widgetId: state.PayOrderReducer.widgetId
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actionStageActive: (nameStage, payload) => dispatch(stageActive(nameStage, payload)),
        getWidgetId: () => dispatch(getWidgetId()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardLoyalties);