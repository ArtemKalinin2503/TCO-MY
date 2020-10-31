import React, {Component} from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import CountDownRedirect from "../CountDownRedirect/CountDownRedirect";
import FormRequisitesCheck from "../Forms/FormRequisitesCheck/FormRequisitesCheck";
import {resetFindCheck, startFindCheck, stopFindCheck, waitFindCheck, getFindCheck} from "../../actions/actionsFindCheck";
import "./findCheck.scss";

class FindCheck extends Component {

    state = {
        id: null,
        scanCheck: true,
        inProgress: false,
        error: false,
        scannedId: null,
        waitScannedError: null,
        foundId: null,
        searchError: null
    }

    componentDidMount() {
        console.log('FindCheck.componentDidMount');
        this.props.startFindCheck();
    }

    static getDerivedStateFromProps(props, state) {
        if (props.inProgress !== state.inProgress) {
            return {inProgress: props.inProgress}
        }
        if (props.scannedId !== state.scannedId) {
            return {scannedId: props.scannedId}
        }
        if (props.foundId !== state.foundId) {
            return {foundId: props.foundId}
        }
        if (props.waitScannedError !== state.waitScannedError) {
            return {waitScannedError: props.waitScannedError}
        }
        if (props.searchError !== state.searchError) {
            return {searchError: props.searchError}
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.inProgress !== this.state.inProgress
            && this.state.inProgress) {
            this.props.waitFindCheck();
        }
        // scanner "events"
        if (prevState.scannedId !== this.state.scannedId) {
            if (this.state.scannedId !== null) {
                if (this.state.scanCheck) {
                    console.log('>>>>> CHECK ID = ', this.state.scannedId);
                    this.setState({id: this.state.scannedId});
                }
                else {
                    this.setState({scannedId: null});
                    this.props.waitFindCheck();
                }
            }
        }
        if (prevState.waitScannedError !== this.state.waitScannedError) {
            if (this.state.waitScannedError === 304) {
                this.setState({error: null});
                this.props.waitFindCheck();
            }
            else {
                console.log('>>>>> CHECK SEARCH ERROR ', this.state.waitScannedError);
            }
        }
        if (prevState.foundId !== this.state.foundId) {
            if (this.state.foundId !== null) {
                console.log('>>>>> CHECK ID = ', this.state.foundId);
                this.setState({id: this.state.foundId});
            }
        }
    }

    componentWillUnmount() {
        if (this.state.inProgress) {
            this.props.stopFindCheck();
        }
        else {// reset reducer
            this.props.resetFindCheck();
        }
    }

    //Кнопка Найти вручную
    handlerSearch = () => {
        this.setState({
            scanCheck: false
        })
    }

    handlerScanClick = () => {
        this.setState({
            scanCheck: true
        })
    }

    //Кнопка Продолжить
    handlerSearchClick = () => {
        this.setState({
            foundId: null,
            searchError: null
        })
        console.log(this.formCheckReqs);
        if (this.formCheckReqs) {
            let fp = this.formCheckReqs.checkId();
            console.log(fp);
            this.props.getFindCheck(fp);
        }
    }

    renderFindCheck = () => {
        if (this.state.inProgress) {
            if (this.state.id) {
                return (
                    <Redirect to={`/returnPage/process/${this.state.id}`} />
                )
            }
            else
            if (this.state.searchError) {
                return (
                    <div className="findCheck__wrapper">
                        <CountDownRedirect text={'Переход на главный экран через'} duration={10}/>
                        <div className="findCheck__title">
                            <p>
                                Чек не найден
                            </p>
                        </div>
                    </div>
                )
            }
            else
            if (this.state.scanCheck) {
                return (
                    <>
                        <CountDownRedirect text={"До окончания сессии осталось: "} />
                        <div className="findCheck__title">
                            Отсканируйте QR-код или штрих-код
                        </div>
                        <div className="findCheck__img-wrapper"/>
                        <div className="findCheck__btn-wrapper">
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
                        <FormRequisitesCheck onRef={ref => (this.formCheckReqs = ref)} />
                        <div className="findCheck__btn-wrapper">
                            <button
                                className="waves-effect waves-light btn btn-check"
                                onClick={this.handlerSearchClick}
                            >
                                Продолжить
                            </button>
                            <button
                                className="waves-effect waves-light btn btn-check"
                                onClick={this.handlerScanClick}
                            >
                                Сканировать
                            </button>
                        </div>
                    </>
                )
            }
        }
    }

    render() {
        console.log('+++> FindCheck.render');
        return (
            <div className="findCheck__wrapper">
                {this.renderFindCheck()}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    inProgress: state.FindCheckReducer.inProgress,
    error: state.FindCheckReducer.error,
    scannedId: state.FindCheckReducer.scannedId,
    waitScannedError: state.FindCheckReducer.waitScannedError,
    foundId: state.FindCheckReducer.foundId,
    searchError: state.FindCheckReducer.searchError
})

const mapDispatchToProps = (dispatch) => ({
    resetFindCheck: () => dispatch(resetFindCheck()),
    startFindCheck: () => dispatch(startFindCheck()),
    stopFindCheck: () => dispatch(stopFindCheck()),
    waitFindCheck: () => dispatch(waitFindCheck()),
    getFindCheck: (fp) => dispatch(getFindCheck(fp))
})

export default connect(mapStateToProps, mapDispatchToProps)(FindCheck);