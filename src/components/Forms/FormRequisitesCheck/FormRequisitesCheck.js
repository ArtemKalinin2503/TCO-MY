import React, {Component} from "react";
import KeyboardVirtual from "../../KeyboardVirtual/KeyboardVirtual";
import "./formRequisitesCheck.scss";

//Форма для Ввода id чека (возврат)
class FormRequisitesCheck extends Component {

    //Полуичм номер карты введенный пользователм
    getIdCheck(idCheck) {
        console.log(idCheck);
    }

    render() {
        return(
            <div className="formRequisitesCheck__wrapper">
                <div className="row">
                    <div className="formRequisitesCheck__title">
                        Введите id чека
                    </div>
                    <KeyboardVirtual
                        activeComponent="formRequisitesCheck"
                        getIdCheck={(idCheck) => this.getIdCheck(idCheck)}
                        type="OneInput"
                        keyboardType="number"
                    />
                </div>
            </div>
        )
    }
}

export default FormRequisitesCheck;