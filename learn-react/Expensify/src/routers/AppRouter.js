import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
import Header from '../components/Header';
import ExpensifyDashboard from "../components/ExpensifyDashboard";
import Expensifycreate from "../components/Expensifycreate";
import ExpensifyEdit from "../components/ExpensifyEdit";
import Help from "../components/Help";
import Notfoundpage from "../components/NotFound"

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
        </div>
        <Switch>
            <Route path="/" component={ExpensifyDashboard} exact/>
            <Route path='/create' component={Expensifycreate}/>
            <Route path="/edit/:id" component={ExpensifyEdit}/>
            <Route path="/help" component={Help} exact/>
            <Route path="/*" component={Notfoundpage} />
        </Switch>
    </BrowserRouter>
);

export default AppRouter;