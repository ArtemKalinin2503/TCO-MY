import React, {Component} from "react";
import './gasStationStatus.scss'

//Компонент визуализации колонки с выводом статуса колонки на АЗС
class GasStationStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusGas: "",
            returnUnlockGas: false
        }
    }

    componentDidMount() {
        this.statusGasStation();
        this.setState({
            statusGas: this.statusGasStation(),
            returnUnlockGas: true
        })

    }

    componentWillUnmount() {
        this.setState({
            returnUnlockGas: false
        })
    }

    statusGasStation() {
        let status;
        if (this.props.gasStationStatus) {
            switch(this.props.gasStationStatus) {
                case 'Non_reachable':
                case 'Inoperative':
                case 'Close':
                    status = "Не работает"
                    break;
                case 'Idle':
                case 'Calling':
                    status = "Свободно"
                    if(this.props.posOwner !== 0 || this.props.typeConfig !== "PREAUTH")
                    {
                        status = "Занята"
                    }
                    break;
                default:
                    status = "Занята"
            }
        }

        return status;

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.gasStationStatus !== this.props.gasStationStatus) {
            this.setState({
                statusGas: this.statusGasStation()
            })
        }
    }

    render() {
        return (
            <div className={this.state.statusGas === "Свободно" ? "gasStation-item__wrapper freeGas" : "gasStation-item__wrapper"}>
                <div className="gasStation-item__number-wrapper">
                    <p className="gasStation-item__number">{this.props.numberGasStation}</p>
                </div>
                <div className="gasStation-item__status-wrapper">
                    <p className="gasStation-item__status">{this.state.statusGas}</p>
                </div>
            </div>
        )
    }
}

export default GasStationStatus;