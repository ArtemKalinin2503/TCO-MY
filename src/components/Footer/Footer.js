import React, {Component} from "react";
import { connect } from "react-redux";
import './footer.scss'

class Footer extends Component{

    //Проверка на связь с устройством
    getStatus() {
        if (!this.props.opt.state) {
            return (
                <p className="footer__status-error">Нет связи с устройством...</p>
            )
        } else {
            return (
                ""
            )
        }
    }

    render() {
        return (
            <div className="footer__wrapper">
                <div className="footer__status-wrapper">
                    <span className={this.props.opt.state === "OPTMODE" ? 'footer__status footer__status_work' : 'footer__status footer__status_not-work'}/>
                    {this.getStatus()}
                    <p className="footer__name-gadget">&copy; ПТС(Банкомат)№0001100203</p>
                </div>
                <div className="footer__address">
                    <p>&copy; Адрес Электрический пер.д3/10 стр.1</p>
                </div>
                <div className="footer__contacts">
                    <p>&copy; Телефон: (495)787-29-64</p>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        opt: state.OptModeReducer.optMode,
    }
}

export default connect(mapStateToProps)(Footer)
