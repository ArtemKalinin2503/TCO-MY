import React, { Component } from "react";
import {Route, Switch} from "react-router-dom";
import BtnHome from "../../BtnHome/BtnHome";
import FormLogin from "../../Forms/FormLogin/FormLogin";
import BtnBack from "../../BtnBack/BtnBack";
import TechnicalServicePage from "../TechnicalServicePage/TechnicalServicePage";
import Smeni from "../../Smeni/Smeni";
import SmeniChange from "../../SmeniChange/SmeniChange";
import Reports from "../../Report/Reports";
import ReportPrint from "../../ReportPrint/ReportPrint";
import Service from "../../Service/Service";
import StateSystem from "../../StateSystem/StateSystem";
import Divices from "../../Divices/Divices";
import ManagingLocks from "../../ManagingLocks/ManagingLocks";
import Parameterization from "../../Parameterization/Parameterization";
import './informationPage.scss';

class InformationPage extends Component {
    render() {
        const { history } = this.props;
        return (
            <div className="informationPage__wrapper">
                <Switch>
                    <Route history={history}  path="/informationPage" component={FormLogin} exact />
                    <Route history={history}  path="/informationPage/technicalServicePage" component={TechnicalServicePage} exact />
                    <Route history={history}  path="/informationPage/technicalServicePage/smeni" component={Smeni} exact />
                    <Route history={history}  path="/informationPage/technicalServicePage/smeni/smenichange" component={SmeniChange} exact />
                    <Route history={history}  path="/informationPage/technicalServicePage/reports" component={Reports} exact />
                    <Route history={history}  path="/informationPage/technicalServicePage/reports/print" component={ReportPrint} exact />
                    <Route history={history}  path="/informationPage/technicalServicePage/service" component={Service} exact />
                    <Route history={history}  path="/informationPage/technicalServicePage/service/statesystem" component={StateSystem} exact />
                    <Route history={history}  path="/informationPage/technicalServicePage/service/divices" component={Divices} exact />
                    <Route history={history}  path="/informationPage/technicalServicePage/service/managinglocks" component={ManagingLocks} exact />
                    <Route history={history}  path="/informationPage/technicalServicePage/service/parameterization" component={Parameterization} exact />
                </Switch>
                <BtnHome/>
                <BtnBack history={history}/>
            </div>
        )
    }
}

export default InformationPage;