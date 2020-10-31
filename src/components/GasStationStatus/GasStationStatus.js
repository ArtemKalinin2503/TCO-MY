import React, { Component } from "react";
import { Link } from "react-router-dom";
import './gasStationStatus.scss';

//Компонент визуализации колонки с выводом статуса колонки на АЗС
class GasStationStatus extends Component {

    state = {
        notWork: false, //Не работает
        employed: false, //Занята
        free: true, //Свободно
        intervalGasStatus: 0
    }

    componentDidMount() {
        let intervalGasStatus = setInterval(function () {
            this.checkedStatusGas();
        }.bind(this), 1000);
        this.setState({
            intervalGasStatus: intervalGasStatus
        })
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalGasStatus)
    }

    //Проверка Статуса ТРК
    checkedStatusGas = () => {
        //Статус Не работает
        if (this.props.gasStationStatus === 'None' || this.props.gasStationStatus === 'Error' || this.props.gasStationStatus === 'Close') {
            this.setState({
                notWork: true
            })
        } else {
            this.setState({
                notWork: false
            })
        }
        //Статус Занята
       if (this.props.posOwner !== 0 || this.props.typeConfig !== "PREAUTH") {
            this.setState({
                employed: true
            })
        }
        else {
           this.setState({
               employed: false
           })
        }
        //Статус Свободно
        if (!this.state.notWork && !this.state.employed) {
            this.setState({
                free: true
            })
        } else {
            this.setState({
                free: false
            })
        }
    }

    renderGasStatus = () => {
       return <div className={this.state.free ? "gasStation-item__wrapper Free" : "gasStation-item__wrapper notFree"}>
           <Link
               className="gasStation-item__link"
               to={this.state.free ? `/stationPage/gasFuelSelect/${this.props.numberGasStation}` : "/stationPage/"}
           >
               <div className="gasStation-item__number-wrapper">
                   <div className={this.state.free ? "gasStation-item__description" : "gasStation-item__description notFree"}>
                       <div className="gasStation-item__number">{this.props.numberGasStation}</div>
                   </div>
               </div>
               <div className={this.state.free ? "gasStation-item__status-wrapper" : "gasStation-item__status-wrapper notFree"}>
                   {this.state.notWork ? <p className="gasStation-item__status">Не работает</p> : null}
                   {this.state.employed ? <p className="gasStation-item__status">Занята</p> : null}
                   {this.state.free ? <p className="gasStation-item__status">Свободно</p> : null}
               </div>
           </Link>
       </div>
    }

    render() {
        return (
            <div className="item-gas__wrapper">
                {this.renderGasStatus()}
            </div>
        )
    }
}
export default GasStationStatus;