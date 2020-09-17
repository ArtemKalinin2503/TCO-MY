import React, {Component} from "react";
import "./btnBack.scss"

class BtnBack extends Component {
    render() {
        return (
            <div className="btnBack__wrapper">
                <button className="waves-effect waves-light btn #2979ff blue accent-3 btnBack" onClick={this.props.history.goBack}>Назад</button>
            </div>
        )
    }
}

export default BtnBack;