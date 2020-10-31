import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import './scss/app.scss';
//Components
import Header from "./components/Header/Header";
import HomePage from "./components/Pages/HomePage/HomePage";
import StationPage from "./components/Pages/StationPage/StationPage";
import InformationPage from "./components/Pages/InformationPage/InformationPage";
import ReturnPage from "./components/Pages/ReturnPage/ReturnPage";
import {getUiSettings} from './actions/actionsSettings';

class App extends Component {

    componentDidMount() {
      this.props.getUiSettings()
    }

    render() {
        const { history, theme } = this.props
        return (
            <div className={`App ${theme}`}>
                <Header />
                <div className="content">
                    <Switch>
                        <Route history={history} path="/" component={HomePage} exact />
                        <Route history={history} path="/returnPage" component={ReturnPage} />
                        <Route history={history} path="/informationPage" component={InformationPage} />
                        <Route history={history} path="/stationPage" component={StationPage} />
                        <Redirect to="/" />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
  theme: state.SettingsReducer.theme
})

const mapDispatchToProps = (dispatch) => ({
    getUiSettings: () => dispatch(getUiSettings())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
