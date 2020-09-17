import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from "./store/store";
import {BrowserRouter as Router} from "react-router-dom";
import './index.css';

//Components
import App from './App';
import ErrorBoundry from "./components/Error-boundry/Error-boundry";

ReactDOM.render(
<Provider store={store}>
    <ErrorBoundry>
        <Router>
            <App/>
        </Router>
    </ErrorBoundry>
    </Provider>,
    document.getElementById('root')
);