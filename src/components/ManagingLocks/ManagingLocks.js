import React, {Component} from "react";
import {Link} from "react-router-dom";
import './ManagingLocks.scss'

class ManagingLocks extends Component {

    state = {
        buttons: [
            {name: 'Открыть верхний замок', link: 'managinglocks'},
            {name: 'Закрыть верхний замок', link: 'managinglocks'},
            {name: 'Открыть нижний замок', link: 'managinglocks'},
            {name: 'Закрыть нижний замок', link: 'managinglocks'},
        ],
    }

    render() {

        const {buttons} = this.state;

        return (
            <div className='ManagingLocks__wrapper'>
                <div className="ManagingLocks">
                    <h3>Управление замками</h3>
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

export default ManagingLocks;