import React, {Component} from "react";
import { Redirect } from "react-router-dom";
import "./timerWork.scss";

//Таймер для работы приложения (для ограничения времени сессии)
class TimerWork extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: {},
            seconds: 599, //Время сессии в секундах
            timerEnd: false
        };
        this.timer = 0;
        this.countDown = this.countDown.bind(this);
    }

    secondsToTime(secs){
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }

    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({
            time: timeLeftVar,
            timerEnd: false
        });
        if (this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        //Когда таймер истек
        if (seconds === 0) {
            clearInterval(this.timer);
            this.setState({
                timerEnd: true
            })
        }
    }
    render() {
        //Если время сессии закончилось
        if (this.state.timerEnd){
            return <Redirect to="/" />
        }
        return (
            <div className="timerWork__wrapper">
                <span>
                    <span className="timerWork__text">До окончания сессии осталось: </span>
                </span>
                <div className="timerWork__time">
                    0{this.state.time.m}:
                    <span className={this.state.time.s === 0 ? "" : "inVisible"}>0</span>
                    <span className={this.state.time.s === 0 ? "inVisible" : ""}>
                    <span className={this.state.time.s <= 9 ? "" : "inVisible"}>0</span>
                </span>
                    <span>{this.state.time.s}</span>
                </div>

            </div>
        )
    }
}

export default TimerWork;