import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from "./store/store";
import {BrowserRouter} from "react-router-dom";
import 'materialize-css/dist/css/materialize.min.css'
import './index.css';

//Components
import App from './App';
import ErrorBoundry from "./components/Error-boundry/Error-boundry";

ReactDOM.render(
<Provider store={store}>
    <ErrorBoundry>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </ErrorBoundry>
    </Provider>,
    document.getElementById('root')
);