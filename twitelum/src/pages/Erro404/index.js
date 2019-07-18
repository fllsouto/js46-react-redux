import React, { Component } from 'react';
import Cabecalho from '../../components/Cabecalho'
import Widget from '../../components/Widget'

class erro404 extends Component  {
    
    render() {
        return (
        <>
            <Cabecalho />
            <div className="error404Page">
                <div className="container">
                    <Widget />
                    <h2 className="loginPage__title">Seja bem vindo!</h2>
                    <img src="https://http.cat/404.png" alt=""/>
                </div>
            </div>
            
        </>
    )}
}

export default erro404;