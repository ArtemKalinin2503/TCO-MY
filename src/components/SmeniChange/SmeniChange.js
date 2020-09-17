import React, {Component} from "react";
import FormSmenaChange from "../Forms/FormSmenaChange/FormSmenaChange";
import './SmeniChange.scss';

class SmeniChange extends Component {

    render() {
        return (
            <div className='SmeniChange__wrapper'>
                <FormSmenaChange
                    title="Введите номер смены для открытия"
                    textButton="Открыть"
                />
            </div>
        )
    }
}

export default SmeniChange;