import React, {Component} from "react";

class Clock extends Component{

    state = {
        time: new Date().toLocaleString(),
    };

    componentDidMount() {
        this.intervalID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    tick() {
        this.setState({
            time: new Date().toLocaleString(),
        });
    }

    render() {
        return (
            <div className="clock__wrapper">
                <p className="clock__time">{this.state.time}</p>
            </div>
        )
    }
}

export default Clock