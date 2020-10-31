import React, { Component } from "react";
import "./btnFuel.scss";

class BtnFuel extends Component {
    render() {
        return (
            <div className={this.props.isEnable ?
                this.props.isSelect ? 'btnFuel__wrapper isSlelect' : 'btnFuel__wrapper isEnable'
                : 'btnFuel__wrapper isDisable'}>
                <img src={`/images/${this.props.fuelId}.svg`} alt="ai"
                    className={this.props.isEnable ? 'btnFuel__fuelId isEnable' : 'btnFuel__fuelId isDisable'}
                />
                <div className='btnFuel__pricediv'>
                    <div className={this.props.isEnable ? 'btnFuel__price isEnable' : 'btnFuel__price isDisable'}> {this.props.price}</div>
                    <img src={`/images/rubwhite.svg`} alt="trk" className={this.props.isEnable ? 'btnFuel__pub isEnable' : 'btnFuel__pub isDisable'} />
                </div>
            </div>
        );
    }
}
export default BtnFuel;