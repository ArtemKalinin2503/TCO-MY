import React, {Component} from "react";
import {Link} from "react-router-dom";
import './Divices.scss'

class Divices extends Component {

    state = {
        buttons: [
            {name: 'Перезагрузка купюроприемника', link: 'divices'},
            {name: 'Перезагрузка Терминала 3 в 1', link: 'divices'},
            {name: 'Перезагрузка принтера', link: 'divices'},
        ],
    }

    render() {

        const {buttons} = this.state;

        return (
            <div className='Divices__wrapper'>
                <div className="Divices">
                    <h3>Перезагрузка устройств</h3>
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

export default Divices;