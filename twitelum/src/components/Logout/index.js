import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
    render() {
        // if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
        // }
        return <Redirect to="/login" />
    }
}

export default Logout;