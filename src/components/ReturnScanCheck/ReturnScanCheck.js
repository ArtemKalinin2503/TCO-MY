import React, {Component} from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import FormRequisitesCheck from "../Forms/FormRequisitesCheck/FormRequisitesCheck";
import { getStartFindCheck, getFindCheck } from "../../actions/actionsReturnCheck";
import "./returnScanCheck.scss";

class ReturnScanCheck extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchCheck: false,
            printCheck: false
        }
    }

    componentDidMount() {
        this.props.getStartFindCheck();

        setTimeout(function() {
            this.setFindCheck();
            this.interval = setInterval(this.setFindCheck, 1000);
        }.bind(this), 3000)

    }

    //Для поиска чека
    setFindCheck = () => {
        this.props.getFindCheck();
    }

    //Кнопка Найти вручную
    handlerSearch = () => {
        this.setState({
            searchCheck: true
        })
    }

    //Кнопка Продолжить
    handlerCheckPrint = () => {
        this.setState({
            printCheck: true
        })
    }

    componentWillUnmount() {
        this.setState({
            searchCheck: false,
            printCheck: false
        })
    }

    renderReturnScanCheck = () => {
        if (!this.state.searchCheck) {
            return (
                <>
                    <div className="returnScanCheck__title">
                        Отсканируйте QR-код или штрих-код
                    </div>
                    <div className="returnScanCheck__img-wrapper"/>
                    <div className="returnScanCheck__btn-wrapper">
                        <button
                            className="waves-effect waves-light btn btn-check"
                            onClick={this.handlerSearch}
                        >
                            Найти вручную
                        </button>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <FormRequisitesCheck />
                    <div className="returnScanCheck__btn-wrapper">
                        <button
                            className="waves-effect waves-light btn btn-check"
                            onClick={this.handlerCheckPrint}
                        >
                            Продолжить
                        </button>
                    </div>
                </>
            )
        }
    }

    render() {
        if (this.state.printCheck) {
            return <Redirect to="/returnPage/printReturnCheck/" />
        }
        return (
            <div className="returnScanCheck__wrapper">
                {this.renderReturnScanCheck()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {
        getStartFindCheck: () => dispatch(getStartFindCheck()),
        getFindCheck: () => dispatch(getFindCheck())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReturnScanCheck);