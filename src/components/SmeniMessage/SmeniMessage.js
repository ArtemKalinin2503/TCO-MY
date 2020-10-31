import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getDataNowMessages, putMessagesID, clearAnsMessages } from "../../actions/actionsAnsMessage";
import BtnMessage from '../../components/BtnMessage/BtnMessage';
import { setMessages, getDataMessages } from "../../actions/actionsStatusDevice";
import './SmeniMessage.scss';

class SmeniMessage extends Component {

    state = {
        IsRedirect: false,
        MassagesMassive: null,
        isSmeni: false,
    }

    componentDidMount() {
        if (this.props.messages !== '' && this.props.messages.messages != null) {
            this.setState({ MassagesMassive: [...this.props.messages.messages], isSmeni: true });
            this.props.setMessages([]);
        } else {
            setTimeout(function () {
                if (this.state.MassagesMassive == null && this.props.messagesNow.length === 0) {
                    this.setState({ IsRedirect: true });
                    document.location.reload();
                }
            }.bind(this), 3000)
            this.props.clearAnsMessages();
            this.props.getDataNowMessages();

        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.IsRedirect !== prevProps.IsRedirect) {
            document.location.reload();
        }
        if (this.props.answerMassive !== prevProps.answerMassive) {
            if (this.props.lengthMassive === 0 && !this.state.isSmeni) {
                this.setState({ IsRedirect: true });
                return <Redirect to="/informationPage/technicalServicePage/smeni" />
            } else {
                this.setState({ IsRedirect: false });
            }
        }
        if (this.props.answerMessage !== prevProps.answerMessage) {
            if (this.state.MassagesMassive == null && !this.state.isSmeni) {
                this.props.getDataNowMessages();
            }
        }
    }

    getSrtingMessage = (item) => {
        return `id: ${item.id}, message: ${item.message},
        description: ${item.description}`;
    }

    BtnClick = (Item, btn) => {
        if (this.state.MassagesMassive != null) {
            if (Item != null && Item.id != null && btn != null && btn !== "NONE") {
                this.props.putItem(Item, btn);
            }
            let neMassiv = [...this.state.MassagesMassive];
            let _Index = neMassiv.indexOf(Item, 0);
            neMassiv.splice(_Index, 1)
            this.setState({ MassagesMassive: [...neMassiv] });
            if (neMassiv.length === 0) {
                this.setState({ MassagesMassive: null, isSmeni: false });
                document.location.reload();
            }
        } else {
            if (Item != null && Item.id != null && btn != null && btn !== "NONE") {
                this.props.putItem(Item, btn);//Передача Item и btn
            }
        }
    }
    //Вывод ошибок
    renderError = () => {
        let Item = (this.state.MassagesMassive != null)
            ? this.state.MassagesMassive[0] : null;
        if (Item == null) {
            Item = (!this.state.IsRedirect) ? this.props.messagesNow[0] : null;
        }
        if (Item != null) {
            return (
                <div className="SmeniMessage__table_message">
                    <div className="SmeniMessage__textmessage">
                        <p>{this.getSrtingMessage(Item)}</p>
                    </div>
                    <div className="SmeniMessage__divbutton">
                        <BtnMessage Item={Item} BtnClick={this.BtnClick} />
                    </div>
                    <div className="SmeniMessage__textmessageanswer">
                        <p>{this.props.answerTextMessage}</p>
                    </div>
                </div>
            )
        } else {
            return <></>
        }
    }
    render() {
        if (this.state.IsRedirect) {//} && this.props.answerMassive && this.props.answerMessage) {
            return <Redirect to="/informationPage/technicalServicePage/smeni" />
        } else {
            return (
                <div className='SmeniMessage__wrapper'>
                    <div className="SmeniMessage">
                        <h3>Меню управления сменами</h3>
                        {/*Если есть ошибка*/}
                        {this.renderError()}
                    </div>
                </div>
            )
        }
    }
}
const mapStateToProps = (state) => ({
    messages: state.StatusDeviceReducer.messages,
    messagesNow: state.TestAnswerMessages.messages,
    answerMassive: state.TestAnswerMessages.answerMassive,
    lengthMassive: state.TestAnswerMessages.lengthMassive,
    answerTextMessage: state.TestAnswerMessages.answerTextMessage,
    answerMessage: state.TestAnswerMessages.answerMessage,
})

const mapDispatchToProps = (dispatch) => ({
    getDataNowMessages: () => dispatch(getDataNowMessages()),
    putItem: (Item, Btn) => dispatch(putMessagesID(Item, Btn)),
    clearAnsMessages: () => dispatch(clearAnsMessages()),
    setMessages: (Item) => dispatch(setMessages(Item)),
    getDataMessages: () => dispatch(getDataMessages()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SmeniMessage);