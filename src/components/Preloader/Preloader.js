import React, {Component} from "react";
import './preloader.scss'

class Preloader extends Component{
    render() {
        return (
            <div className="preloader__wrapper">
                <img className="preloader__body" src="/images/preloader.svg" alt="Загрузка..."/>
            </div>
        )
    }
}

export default Preloader
