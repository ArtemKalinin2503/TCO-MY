import React, {Component} from "react";
import { Link } from "react-router-dom";
import "./errorPayBankCard.scss";

class ErrorPayBankCard extends Component{

    render() {
        return (
            <div className="errorPayBankCard__wrapper">
                <div className="errorPayBankCard__title error">
                    Произошла ошибка при оплате банковской картой
                </div>
                <div className="errorPayBankCard__title">
                    Хотите повторить оплату ?
                </div>
                <div className="errorPayBankCard__btn-wrapper">
                    <Link
                        className="errorPayBankCard__btn waves-effect waves-light btn btn-yes"
                        to="/stationPage/pinPadCard/"
                    >
                        Да
                    </Link>
                    <Link
                        to="/"
                        className="errorPayBankCard__btn waves-effect waves-light btn btn-no"
                    >
                        Нет
                    </Link>
                </div>
            </div>
        )
    }
}

export default ErrorPayBankCard;