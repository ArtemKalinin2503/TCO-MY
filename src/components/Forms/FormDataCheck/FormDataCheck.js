import React, {Component} from "react";
import "./formDataCheck.scss"
import KeyboardVirtual from "../../KeyboardVirtual/KeyboardVirtual";

//Форма для указания контактов для отправки чека
class FormDataCheck extends Component {

    //Получим Email и Phone
    getContact(email, phone, ) {
        this.props.getDataUser(email, phone)
    }

    render() {
        return(
            <div className="formDataCheck__wrapper">
                <div className="row">
                    <KeyboardVirtual
                        activeComponent="formDataCheck"
                        getContact={(phone, email) => this.getContact(phone, email)}
                        type="TwoInput"
                        keyboardType="full"
                    />
                </div>
            </div>
        )
    }
}

export default FormDataCheck;