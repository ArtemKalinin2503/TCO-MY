import React, { Component } from "react";
import KeyboardVirtual from "../../KeyboardVirtual/KeyboardVirtual";
import "./formDeductingPoints.scss";

//Форма для списывания баллов с карты Лояльности
class FormDeductingPoints extends Component {

    componentDidMount() {
        //Выставим фокус на input симма баллов к списания
        let inputDeductingPoints = document.getElementById('deductingPoints');
        if (inputDeductingPoints) {
            inputDeductingPoints.focus()
        }
    }

    //Полуичм номер карты введенный пользователм
    getPointDeducting(deductingPoints) {
        console.log(deductingPoints);
    }

    renderInfoPoints() {
        let _infoPoints = "";
        return (
            <div className="formDeductingPoints__columngas">
                <div className="formDeductingPoints__columngas__text">Доступно баллов</div>
                <div className="formDeductingPoints__columngas__info" >{_infoPoints}</div>
            </div>
        )
    }
    render() {
        return (
            <div className="formDeductingPoints__wrapper">
                {this.renderInfoPoints()}
                <KeyboardVirtual
                    activeComponent="formDeductingPoints"
                    getPointDeducting={(deductingPoints) => this.getPointDeducting(deductingPoints)}
                    type="OneInput"
                    keyboardType="number"
                />
            </div>
        )
    }
}

export default FormDeductingPoints;