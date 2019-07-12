import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/LoginPage';
import Erro404 from './pages/Erro404';
import Logout from './components/Logout';

const RotaPrivada = (props) => {
    if (localStorage.getItem('token') === null) {
        return <Redirect to="/login" />
    }

    return <Route { ...props } />
}


const routes = () => {
    return (
        <Switch>
            <RotaPrivada path="/" component={ Home } exact />
            <Route path="/login" component={ Login } />
            <Route path="*" component={ Erro404 } />
            <Route path="/logout" component={ Logout } />
        </Switch>
    )
}

export default routes
