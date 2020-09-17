import React, {Component} from 'react';

//Компоненет выводит ошибку в случае ошибки в компоненте
class ErrorIndicator extends Component {
    render() {
        return (
            <div className="errorIndicator__wrapper">
                <h3>Произошла ошибка загрузки данных..</h3>
            </div>
        );
    }

}

export default ErrorIndicator;