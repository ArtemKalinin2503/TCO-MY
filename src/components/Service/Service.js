import React, {Component} from "react";
import {Link} from "react-router-dom";
import './Service.scss';

class Service extends Component {

    state = {
        buttons: [
            {name: 'Состояние системы', link: 'service/statesystem'},
            {name: 'Устройства', link: 'service/divices'},
            {name: 'Управление замками', link: 'service/managinglocks'},
            {name: 'Параметризация', link: 'service/parameterization'},
            {name: 'Перезагрузка ТСО', link: 'service'},
            {name: 'Перезагрузка ОС', link: 'service'},
            {name: 'Выключение ОС', link: 'service'},
        ],
    }

    render() {

        const {buttons} = this.state;

        return (
            <div className='Service__wrapper'>
                <div className="Service">
                    <h3>Обслуживание</h3>
                        <div className='buttons'>
                            {
                                buttons.map((button,i) => (
                                    <div key={i} className='button'>
                                        <div className='shadow'></div>
                                        <Link to={button.link}>
                                            <div className='message'>
                                                <p>{button.name}</p>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            }
                        </div>
                </div>
            </div>
        )
    }
}

export default Service;