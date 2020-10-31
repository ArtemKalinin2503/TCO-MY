import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./CountDownRedirect.scss";

// Редирект по таймеру обратного отсчёта
class CountDownRedirect extends Component {
    static defaultProps = {
        duration: 600,
        redirect: "/"
    };

    constructor(props) {
        super(props);
        this.state = {
            time: {}
        };
        this.timer = 0;
        this.seconds = this.props.duration - 1;
        this.countDown = this.countDown.bind(this);
    }

    secondsToTime(secs) {
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        return {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
    }

    componentDidMount() {
        if (this.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
        this.setState({
            time: this.secondsToTime(this.seconds)
        });
    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    countDown() {
        this.seconds = this.seconds - 1;
        if (this.seconds === 0) {
            clearInterval(this.timer);
            this.timer = null;
        }
        this.setState({
            time: this.secondsToTime(this.seconds)
        });
    }

    render() {
        if (this.seconds > 0) {
            return (
                <div className="timerWork__wrapper">
                    <span>
                        <span className="timerWork__text">{this.props.text}</span>
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
        return <Redirect to={this.props.redirect} />
    }
}

export default CountDownRedirect;