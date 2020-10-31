import React, { Component } from "react";
import './TechnicalServicePage.scss'
import { Link } from "react-router-dom";

class TechnicalServicePage extends Component {

    state = {
        buttons: [
            { name: 'Смены', link: 'technicalServicePage/smeni' },
            //{name: 'Message', link: 'technicalServicePage/smenimessage' },
            { name: 'Отчеты', link: 'technicalServicePage/reports' },
            { name: 'ТРК', link: '/' },
            { name: 'Обслуживание', link: 'technicalServicePage/service' },
            { name: 'Инкассация', link: '/' },
        ],
    }
    render() {
        const { buttons } = this.state;
        return (
            <div className='TechnicalService__wrapper'>
                <div className="TechnicalService">
                    <h3>Главное меню технического обслуживания</h3>
                    <h3>Выберите действие</h3>
                    <div className='buttons'>
                        {
                            buttons.map((button, i) => (
                                <div key={i} className='button'>
                                    <div className='shadow' />
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
export default TechnicalServicePage;