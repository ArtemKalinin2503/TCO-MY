import React, {Component} from "react";
import {Link} from "react-router-dom";
import './StateSystem.scss'

class StateSystem extends Component {

    state = {
        buttons: [
            {name: 'Состояние системы', link: 'technicalServicePage/service/statesystem'},
            {name: 'Устройства', link: 'technicalServicePage/service'},
            {name: 'Управление замками', link: 'technicalServicePage/service'},
            {name: 'Параметризация', link: 'technicalServicePage/service'},
            {name: 'Перезагрузка ТСО', link: 'technicalServicePage/service'},
            {name: 'Перезагрузка ОС', link: 'technicalServicePage/service'},
            {name: 'Выключение ОС', link: 'technicalServicePage/service'},
        ],
    }

    render() {
        return (
            <div className='StateSystem__wrapper'>
                <div className="StateSystem">
                    <h3>Состояние системы</h3>
                    <div className="system">
                        <div className='tsobuttons'>
                            <Link to="/">
                                <button className="green">Лог запуска ТСО</button>
                            </Link>
                            <Link to="/">
                                <button>Лог работы ТСО</button>
                            </Link>
                        </div>
                        <div className="laynch">
                            <div className="text">
                                <p>11.11.11 12:45 Запуск</p>
                                <p>11.11.11 12:45 Запуск</p>
                                <p>11.11.11 12:45 Запуск</p>
                                <p>11.11.11 12:45 Запуск</p>
                                <p>11.11.11 12:45 Запуск</p>
                                <p>11.11.11 12:45 Запуск</p>
                                <p>11.11.11 12:45 Запуск</p>
                                <p>11.11.11 12:45 Запуск</p>
                                <p>11.11.11 12:45 Запуск</p>
                                <p>11.11.11 12:45 Запуск</p>
                                <p>11.11.11 12:45 Запуск</p>
                                <p>11.11.11 12:45 Запуск</p>
                                <p>11.11.11 12:45 Запуск</p>
                                <p>11.11.11 12:45 Запуск</p>
                                <p>11.11.11 12:45 Запуск</p>
                                <p>11.11.11 12:45 Запуск</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default StateSystem;