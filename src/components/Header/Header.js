import React, { Component } from "react";
import { Link } from "react-router-dom";
import Clock from "../Clock/Clock";
import './header.scss'

class Header extends Component {
    render() {
        return (
            <div className="header__wrapper">
                <div className="header__table">
                    <div className="header__phone">
                        8 (800) 000-00-00
                </div>
                    <div className="header__сlock">
                        <Clock />
                    </div>
                    <div className="header__address">
                        г.Москва. Дмитровское шоссе д.3\9
                    </div>
                </div>
                <div className="header__logo-wrapper">
                    <Link to="/">
                        <img src={'/images/bashneft.svg'} alt="logFirm" className="header__logo" />
                    </Link>
                </div>
            </div>
        )
    }
}
export default Header