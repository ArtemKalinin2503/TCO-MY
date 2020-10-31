import React, {Component} from "react";
import { connect } from "react-redux";
import Preloader from "../Preloader/Preloader";
import CountDownRedirect from "../CountDownRedirect/CountDownRedirect";
import {makeReturn} from "../../actions/actionsMakeReturn"
import "./makeReturn.scss";

class MakeReturn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inProgress: false,
            statusReturn: {
                printCheck: false,
                returnApproved: false,
                returnError: false
            },
            message: "Проведение возврата"
        }
        this.messages = {
            initial: "Проведение возврата",
            startPrint: "Печать чека...",
            checkApproved: "Возврат прошел успешно. Возьмите чек.",
            errorCheck: "По техническим причинам возврат не прошел\nОбратитесь в службу поддержки 8 (800) 000-00-00"
        }
        this.statusMessages = {
            'NOFILLING': "Налива небыло.",
            'REFUNDED': "Возврат проведён. Возьмите чек.",
            'COPYWASPRINTED': "Возврат уже проведён. Возьмите копию чека.",
            'COPYALREADYPRINTED': "Возврат уже проведён. Копия чека уже была распечатана.",
            'FULLYFILLED': "По этому чеку был полный налив."
        }
    }

    componentDidMount() {
        this.setState({inProgress: true, message: this.messages.initial});
    }

    static getDerivedStateFromProps(props, state) {
        if (props.success !== state.success) {
            return {success: props.success}
        }
        if (props.error !== state.error) {
            return {error: props.error}
        }
        if (props.timeout !== state.timeout) {
            return {timeout: props.timeout}
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {

        if (prevState.inProgress !== this.state.inProgress
            && this.state.inProgress) {

                const {id} = this.props.match.params;
                if (id) {
                    console.log('--- START REFUND, ID =', id);
                    this.props.makeReturn(id, false);
                }
                return;
        }
        if (prevState.error !== this.state.error
            && this.state.error) {
            console.log('--- REFUND ERROR:', this.props.message);
            this.setState({inProgress: false, message: this.messages.errorCheck});
        }
        if (prevState.success !== this.state.success
            && this.state.success) {
             this.setState({inProgress: false, message: (this.statusMessages[this.props.status] || "???")});
        }
        if (prevState.timeout !== this.state.timeout
            && this.state.timeout) {
            this.props.makeReturn(this.props.id, true);
        }
    }

    render() {
        if (this.state.inProgress) {
            return (
                <>
                    <CountDownRedirect text={'Переход на главный экран через'} duration={10}/>
                    <div className="makeReturn__wrapper">
                        <div className="makeReturn__title">
                            <p>
                                {this.state.message}
                            </p>
                        </div>
                    </div>
                    <div className="makeReturn__wrapper">
                        <div className="makeReturn__preloader">
                            <Preloader/>
                        </div>
                    </div>
                </>
            )
        }
        else
        {
            if (this.state.error) {
                return (
                    <div className="makeReturn__wrapper">
                        <div className="makeReturn__title">
                            <p>
                                {this.state.message}
                            </p>
                        </div>
                    </div>
                )
            }
            if (this.state.success) {
                return (
                    <div className="makeReturn__wrapper">
                        <CountDownRedirect text={'Переход на главный экран через'} duration={10}/>
                        <div className="makeReturn__title">
                            <p>
                                {this.state.message}
                            </p>
                        </div>
                        <div className="makeReturn__img"/>
                    </div>
                )
            }
            return null;
        }
    }
}

const mapStateToProps = (state) => ({
    success: state.MakeReturnReducer.success,
    error: state.MakeReturnReducer.error,
    timeout: state.MakeReturnReducer.timeout,
    status: state.MakeReturnReducer.status
})

const mapDispatchToProps = (dispatch) => ({
    makeReturn: (id, continue_) => dispatch(makeReturn(id, continue_)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MakeReturn);