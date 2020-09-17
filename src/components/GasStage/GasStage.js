import React, {Component} from "react";
import "./gasStage.scss"

//Компонент который показывает Стадии заправки
class GasStage extends Component {
    render() {
        console.log(this.props.stageActive);
        return (
            <div>
                <div className="gasStage__selectStage-wrapper">
                    <ul className="gasStage__selectStage-list">
                        <li className="gasStage__selectStage-item selectGas" />
                        <li className={this.props.stageActive.selectFuel ? "gasStage__selectStage-item selectFuel completedStep" : "gasStage__selectStage-item selectFuel"} />
                        <li className={this.props.stageActive.card ? "gasStage__selectStage-item card completedStep" : "gasStage__selectStage-item card"} />
                        <li className={this.props.stageActive.pay ? "gasStage__selectStage-item pay completedStep" : "gasStage__selectStage-item pay"}/>
                        <li className="gasStage__selectStage-item cheque" />
                    </ul>
                </div>
            </div>
        )
    }
}

export default GasStage