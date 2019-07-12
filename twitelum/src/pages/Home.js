import React, { Component, Fragment } from 'react';
import Cabecalho from './../components/Cabecalho'
import NavMenu from './../components/NavMenu'
import Dashboard from './../components/Dashboard'
import Widget from './../components/Widget'
import TrendsArea from './../components/TrendsArea'
import Tweet from './../components/Tweet'

class App extends Component {
/*     constructor() {
        super()
        this.state = {
            novoTweet: '',
            tweets: []
        }
    } */

    state = {
        novoTweet: '',
        tweets: []
    }

    handleSubmit = async (evento) => {
        evento.preventDefault();

        const { novoTweet, tweets } = this.state;
        const resposta = away fetch(
            `http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('token')}`,
            {
                method: 'POST',
                body: JSON.stringify({
                    conteudo: novoTweet
                })
            }
        );

        const tweetCriado = await resposta.json();

        this.setState({
            tweets: [tweetCriado, ...tweets],
            novoTweet: ''
        });
    }

/*     adicionaTweet = (infosDoEvento) => {
        infosDoEvento.preventDefault()
        if() {
            this.setState({
                tweets: [this.state.novoTweet, ...this.state.tweets],
                novoTweet: ''
            })
        }
    } */

    novoTweetValido = () => {
        return this.state.novoTweet.length > 140 || this.state.novoTweet.length === 0
    }

    render() {
        const { novoTweet, tweets } = this.state;
        return (
            <>
                <Cabecalho>
                    <NavMenu usuario="@felizbol" />
                </Cabecalho>
                <div className="container">
                    <Dashboard>
                        <Widget>
                            <form 
                                className="novoTweet" 
                                onSubmit={ this.handleSubmit }
                            >
                                <div className="novoTweet__editorArea">
                                    <span 
                                        className={
                                        `novoTweet__status 
                                            ${ this.novoTweetValido() 
                                                ? 'novoTweet__status--invalido' 
                                                : '' 
                                            }
                                        `}
                                    >
                                    { novoTweet.length }/140
                                    </span>
                                    <textarea 
                                        className="novoTweet__editor"
                                        placeholder="O que está acontecendo?"
                                        value={ novoTweet }
                                        onChange={ (event) => this.setState({ 
                                            novoTweet: event.target.value 
                                        })} 
                                    />
                                </div>
                                <button 
                                    type="submit"
                                    disabled={ this.novoTweetValido() }
                                    className="novoTweet__envia"
                                >Tweetar</button>
                            </form>
                        </Widget>
                        <Widget>
                            <TrendsArea trends={["bagulhos1", "bagulhos2", "bagulhos3"]}/>
                        </Widget>
                    </Dashboard>
                    <Dashboard posicao="centro">
                        <Widget>
                            <div className="tweetsArea">
                                { tweets.length === 0 && (
                                    <>
                                        <span>
                                            Twite alguma coisa! Vamos falar com pessoas!
                                        </span>
                                    </>
                                )}
                                { tweets.map((tweetInfo, index) => {
                                    <Tweet 
                                        key={tweet.id}
                                        avatarUrl={tweet.usuario.foto}
                                        totalLikes={tweet.totalLikes}
                                        likeado={tweet.likeado}
                                        usuario={`${tweet.usuario.nome} ${tweet.usuario.sobrenome}`}
                                        username={tweet.usuario.login}
                                    >
                                        { tweet.conteudo }
                                    </Tweet>
                                })}
                            </div>
                        </Widget>
                    </Dashboard>
                </div>
            </>
    );
  }
}


export default App;
