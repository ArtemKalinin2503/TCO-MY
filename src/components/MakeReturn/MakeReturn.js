import React, {Component} from "react";
import { connect } from "react-redux";
import Preloader from "../Preloader/Preloader";
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
    }

    componentDidMount() {
        this.setState({inProgress: true, message: this.messages.initial});
    }

    static checkDevicesAvailable(list) {
        if (list) {
            try {
                return true;
            }
            // eslint-disable-next-line no-unreachable
            catch (e) {
                console.log('Error in MakeReturn.checkDevicesAvailable: ', e.message);
            }
        }
        return false;
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
        console.log('++++++ componentDidUpdate');

        if (prevState.inProgress !== this.state.inProgress
            && this.state.inProgress) {

            //const {id} = this.props.match.params;

                console.log('--- START REFUND, ID =', this.props.id);

                this.props.makeReturn(this.props.id, false);
                return;
        }
        if (prevState.error !== this.state.error
            && this.state.error) {
            console.log('--- REFUND ERROR:', this.props.message);
            this.setState({inProgress: false, message: this.messages.errorCheck});
        }
        if (prevState.success !== this.state.success
            && this.state.success) {
            console.log('++++++ this.state.success -> true');
             this.setState({inProgress: false, message: this.messages.checkApproved});
        }
        if (prevState.timeout !== this.state.timeout
            && this.state.timeout) {
            console.log('++++++ this.state.timeout -> true');
            this.props.makeReturn(this.props.id, true);
        }
    }

    render() {
        if (this.state.inProgress) {
            return (
                <>
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

function mapStateToProps(state) {
    return {
        success: state.MakeReturnReducer.success,
        error: state.MakeReturnReducer.error,
        timeout: state.MakeReturnReducer.timeout
    }
}

function mapDispatchToProps(dispatch) {
    return {
        makeReturn: (id, continue_) => dispatch(makeReturn(id, continue_)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MakeReturn);