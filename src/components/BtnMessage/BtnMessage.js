import React, { Component } from "react";
import "./BtnMessage.scss";

class BtnMessage extends Component {

    state = {
        Item: this.props.Item,
    }

    render() {
        switch (this.state.Item.button) {
            case "NONE": {
                return (
                    <div className="BtnMessage__rowbutton" >
                        <div className="SmeniMessage__divbutton">
                            <button className="waves-effect waves-light btn-small btn-clickmy" onClick={(Item) => this.props.BtnClick(this.props.Item, "NONE")} >
                                OK
                            </button>
                        </div>
                    </div>
                )
            }
            case "OK": {
                return (
                    <div className="BtnMessage__rowbutton" >
                        <div className="SmeniMessage__divbutton">
                            <button className="waves-effect waves-light btn-small btn-clickmy" onClick={(Item) => this.props.BtnClick(this.props.Item, "OK")} >
                                OK
                            </button>
                        </div>
                    </div>
                )
            }
            case "CANCEL": {
                return (
                    <div className="BtnMessage__rowbutton" >
                        <div className="SmeniMessage__divbutton">
                            <button className="waves-effect waves-light btn-small btn-clickmy" onClick={(Item) => this.props.BtnClick(this.props.Item, "CANCEL")} >
                                CANCEL
                            </button>
                        </div>
                    </div>
                )
            }
            case "OKCANCEL": {
                return (
                    <div className="BtnMessage__rowbutton" >
                        <div className="SmeniMessage__divbutton">
                            <button className="waves-effect waves-light btn-small btn-clickmy" onClick={(Item) => this.props.BtnClick(this.props.Item, "OK")} >
                                OK
                        </button>
                        </div>
                        <div className="SmeniMessage__divbutton">
                            <button className="waves-effect waves-light btn-small btn-clickmy" onClick={(Item) => this.props.BtnClick(this.props.Item, "CANCEL")} >
                                CANCEL
                        </button>
                        </div>
                    </div>
                )
            }
            case "YESNO": {
                return (
                    <div className="BtnMessage__rowbutton" >
                        <div className="SmeniMessage__divbutton">
                            <button className="waves-effect waves-light btn-small btn-clickmy" onClick={(Item) => this.props.BtnClick(this.props.Item, "YES")} >
                                YES
                            </button>
                        </div>
                        <div className="SmeniMessage__divbutton">
                            <button className="waves-effect waves-light btn-small btn-clickmy" onClick={(Item) => this.props.BtnClick(this.props.Item, "NO")} >
                                NO
                            </button>
                        </div>
                    </div>
                )
            }
            case "YESNOCANCEL": {
                return (
                    <div className="BtnMessage__rowbutton" >
                        <div className="SmeniMessage__divbutton">
                            <button className="waves-effect waves-light btn-small btn-clickmy" onClick={(Item) => this.props.BtnClick(this.props.Item, "YES")} >
                                YES
                            </button>
                        </div>
                        <div className="SmeniMessage__divbutton">
                            <button className="waves-effect waves-light btn-small btn-clickmy" onClick={(Item) => this.props.BtnClick(this.props.Item, "NO")} >
                                NO
                            </button>
                        </div>
                        <div className="SmeniMessage__divbutton">
                            <button className="waves-effect waves-light btn-small btn-clickmy" onClick={(Item) => this.props.BtnClick(this.props.Item, "CANCEL")} >
                                CANCEL
                            </button>
                        </div>
                    </div>
                )
            }
            case "YES": {
                return (
                    <div className="BtnMessage__rowbutton" >
                        <div className="SmeniMessage__divbutton">
                            <button className="waves-effect waves-light btn-small btn-clickmy" onClick={(Item) => this.props.BtnClick(this.props.Item, "YES")} >
                                YES
                            </button>
                        </div>
                    </div>
                )
            }
            default: {
                return (
                    <div className="BtnMessage__rowbutton" >
                        <div className="SmeniMessage__divbutton">
                            <button className="waves-effect waves-light btn-small btn-clickmy" onClick={(Item) => this.BtnClick(Item, "NO")} >
                                NO
                            </button>
                        </div>
                    </div>
                )
            }
        }
    }
}
export default BtnMessage;