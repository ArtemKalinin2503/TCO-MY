import React, {Component} from "react";
import { Redirect } from "react-router-dom";
import './ReportPrint.scss'

class ReportPrint extends Component {

    state = {
        interval: 0,
        printApproved: false
    }

    componentDidMount() {
        let intervalId = setInterval(function () {
            this.setState({
                printApproved: true
            })
        }.bind(this), 3000);
        this.setState({
            interval: intervalId
        })
    }

    componentWillUnmount() {
        clearInterval(this.state.interval)
    }

    render() {
        //Так как нет параметра, что печать чека окончена, просто делаем redirect через 3 секунды
        if (this.state.printApproved) {
            return <Redirect to="/informationPage/technicalServicePage/reports"/>
        }
        return (
            <div className='ReportPrint__wrapper'>
                <div className="ReportPrint">
                    <h3 className="print">Печать отчета ...</h3>
                    <div className="center">
                        <img src="/images/print-report.png" className="print-img" alt=""/>
                    </div>
                </div>
            </div>
        )
    }
}

export default ReportPrint;