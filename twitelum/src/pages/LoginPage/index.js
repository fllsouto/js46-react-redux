import React, { Component, Fragment } from 'react'
import Cabecalho from '../../components/Cabecalho'
import Widget from '../../components/Widget'

import './loginPage.css'

class LoginPage extends Component {
    /* handleSubmit = (evento) => {
        evento.preventDefault();

        // console.log(this.refs.username.value);
        // console.log(this.umtrem.value);

        // IE 6 -> axios

        // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        fetch('http://twitelum-api.herokuapp.com/login', {
            method: 'POST',
            body: JSON.stringify({
                login: this.refs.username.value,
                senha: this.refs.password.value
            })
        }).then(resposta => {
            // Esse cara pode demorar alguns tempo, e por decisão da API ela retorna uma promisse
            return resposta.json();
        }).then(dados => {
            console.log(dados);
            // Opções para salvar o token
            // Usar um cookie não seria muito correto, por que o token diz respeito a algo do usuário, 
            // e o cookie deveria ser usado para guarda coisas associadas a página
            // sessionStorage acaba sendo morto quando fechamos a página
            // localStorage mantem até o usuário fazer um hardreset
            
            localStorage.setItem('token', dados.token);
            this.props.history.push('/');
        }).catch(mensagem => {

        })
    } */

    state = {
        erro: ''
    }

    handleSubmit = async (evento) => {
        evento.persist();
        evento.preventDefault();

        const resposta = await fetch('http://twitelum-api.herokuapp.com/login', {
            method: 'POST',
            body: JSON.stringify({
                login: this.refs.username.value,
                senha: this.refs.password.value
            })
        });

        console.log("deu erro!");
        const dados = await resposta.json();

        if (dados.code) {
            this.setState({
                erro: dados.message
            });

            return;
        }

        localStorage.setItem('token', dados.token);
        this.props.history.push('/');
    }

    render() {
        return (
            <Fragment>
                <Cabecalho />
                <div className="loginPage">
                    <div className="container">
                        <Widget>
                            <h2 className="loginPage__title">Seja bem vindo!</h2>
                            <form className="loginPage__form" action="/" onSubmit={ this.handleSubmit } >
                                <div className="loginPage__inputWrap">
                                    <label className="loginPage__label" htmlFor="login">Login</label> 
                                    <input 
                                        ref="username"
                                        className="loginPage__input" 
                                        type="text" 
                                        id="login" 
                                        name="login"/>
                                </div>
                                <div className="loginPage__inputWrap">
                                    <label className="loginPage__label" htmlFor="senha">Senha</label> 
                                    <input
                                        ref="password" 
                                        className="loginPage__input" 
                                        type="password" 
                                        id="senha" 
                                        name="senha"/>
                                </div>
                                { this.state.erro &&  (<div className="loginPage__errorBox">
                                    Mensagem de erro!
                                </div>) }
                                <div className="loginPage__inputWrap">
                                    <button className="loginPage__btnLogin" type="submit">
                                        Logar
                                    </button>
                                </div>
                            </form>
                        </Widget>
                    </div>
                </div>
            </Fragment>
        )
    }
}


export default LoginPage