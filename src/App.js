import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import './scss/app.scss';
//Components
import Header from "./components/Header/Header";
//import Footer from "./components/Footer/Footer";
import HomePage from "./components/Pages/HomePage/HomePage";
import StationPage from "./components/Pages/StationPage/StationPage";
import InformationPage from "./components/Pages/InformationPage/InformationPage";
import FindCheckPage from "./components/Pages/FindCheckPage/FindCheckPage";
import MakeReturnPage from "./components/Pages/MakeReturnPage/MakeReturnPage";
import { clearToken } from "./utils/utils";


class App extends Component {

    componentDidMount() {
        clearToken(); // сбросить токен чтобы выполнить логин
    }

    render() {
        const { history } = this.props
        return (
            <div className="App">
                <Header />
                <div className="content">
                    <Switch>
                        <Route history={history} path="/" component={HomePage} exact />
                        <Route history={history} path="/findCheckPage" component={FindCheckPage} />
                        <Route history={history} path="/makeReturnPage/:id" component={MakeReturnPage} exact />
                        <Route history={history} path="/informationPage" component={InformationPage} />
                        <Route history={history} path="/stationPage" component={StationPage} />
                        <Redirect to="/" />
                    </Switch>
                </div>
                {/*<Footer/>*/}
            </div>
        );
    }
}

export default withRouter(App)


