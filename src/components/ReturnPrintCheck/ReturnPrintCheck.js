import React, {Component} from "react";
import { connect } from "react-redux";
import "./returnPrintCheck.scss";

class ReturnPrintCheck extends Component {

    constructor(props) {
        super(props);
        this.state = {
            statusReturn: {
                printCheck: false,
                returnApproved: false,
                returnError: false
            },
            message: {
                startPrint: "Печать чека...",
                checkApproved: "Возврат прошел успешно возьмите чек",
                errorCheck: "По техническим причинам возврат не прошел Обратитесь в службу поддержки 8 (800) 000-00-00"
            }
        }
    }

    render() {
        return (
            <div className="returnPrintCheck__wrapper">
                <div className="returnPrintCheck__title">
                    Печать чека...
                </div>
                <div className="returnPrintCheck__img"/>
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

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReturnPrintCheck);