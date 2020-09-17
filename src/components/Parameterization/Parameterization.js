import React, {Component} from "react";
import {Link} from "react-router-dom";
import './Parameterization.scss';

class Parameterization extends Component {

    state = {
        buttons: [
            {name: 'FUCO', link: 'parameterization'},
            {name: 'INTFACE', link: 'parameterization'},
            {name: 'LISENCE', link: 'parameterization'},
            {name: 'OFD', link: 'parameterization'},
            {name: 'TSO', link: 'parameterization'},
            {name: 'UFO2', link: 'parameterization'},
        ],
    }

    render() {

        const {buttons} = this.state;

        return (
            <div className='Parameterization__wrapper'>
                <div className="Parameterization">
                    <h3>Параметризация</h3>
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
                        <Link to="/">
                            <div className="greenButton">
                                Добавить
                            </div>
                        </Link>
                </div>
            </div>
        )
    }
}

export default Parameterization;