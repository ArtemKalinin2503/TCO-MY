import React, {Component} from 'react';
import ErrorIndicator from "../Error-indicator/Error-indicator";

//Компонент обертка для вывода ошибки (чтобы не ломалось все приложение, а только один компонент)
class ErrorBoundry extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError: true
        })
    }

    render() {
        //Если ошибка
        if(this.state.hasError) {
            return <ErrorIndicator/>
        }

        return this.props.children;
    }

}

export default ErrorBoundry;