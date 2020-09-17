import React, {Component} from "react";
import KeyboardVirtual from "../../KeyboardVirtual/KeyboardVirtual";
import "./formDeductingPoints.scss";

//Форма для списывания баллов с карты Лояльности
class FormDeductingPoints extends Component {

    //Полуичм номер карты введенный пользователм
    getPointDeducting(deductingPoints) {
        console.log(deductingPoints);
    }

    render() {
        return(
            <div className="formDeductingPoints__wrapper">
                <div className="row">
                    <div className="formDeductingPoints__info-wrapper">
                        <p>Доступно баллов</p>
                        <div className="formDeductingPoints__info" />
                    </div>
                    <KeyboardVirtual
                        activeComponent="formDeductingPoints"
                        getPointDeducting={(deductingPoints) => this.getPointDeducting(deductingPoints)}
                        type="OneInput"
                        keyboardType="number"
                    />
                </div>
            </div>
        )
    }
}

export default FormDeductingPoints;