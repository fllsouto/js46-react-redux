import React, { Component } from 'react';
import { connect } from 'react-redux';

import Cabecalho from './../components/Cabecalho'
import NavMenu from './../components/NavMenu'
import Dashboard from './../components/Dashboard'
import Widget from './../components/Widget'
import TrendsArea from './../components/TrendsArea'
import Tweet from './../components/Tweet'
import Modal from '../components/Modal';

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
        //modalAberto: false,
        tweetSelecionado: null,
        tweets: []
    }
    
    // Coisas que estão sendo depreciados
    //UNSAFE_componentWillUpdate () {}
    //UNSAFE_componentDidUnmount () {}

    // Renderizou minha aplicação e eu executo
    componentDidMount = async () => {
        // Por default o fetch usa o método GET
        const resposta = await fetch(
            `http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('token')}`);
        
        const dados = await resposta.json();
        this.props.dispatch({
            type: 'CARREGA_TWEETS',
            payload: dados
        })
        //this.setState({
        //    tweets: [ ...dados, ...this.state.tweets ]
        //  });
    }

    apagaTweet = async (idDoTweet) => {
        const resposta = await fetch(
            `http://twitelum-api.herokuapp.com/tweets/${idDoTweet}?X-AUTH-TOKEN=${localStorage.getItem('token')}`,
            { method: 'DELETE' }
        );

        if (resposta.ok) {
            const { tweets } = this.state;


            this.props.dispatch({
                type: 'APAGA_TWEET',
                payload: idDoTweet
            })

            const tweetsQueSobraram = tweets
                .filter((tweet) => tweet._id !== idDoTweet);
            
            this.setState({
                tweets: tweetsQueSobraram
            });
        }

    }

    handleSubmit = async (evento) => {
        evento.preventDefault();

        const { novoTweet, tweets } = this.state;
        const resposta = await fetch(
            `http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('token')}`,
            {
                method: 'POST',
                body: JSON.stringify({
                    conteudo: novoTweet
                })
            }
        );

        const tweetCriado = await resposta.json();
        this.props.dispatch({
            type: 'NOVO_TWEET',
            payload: tweetCriado
        });
        this.setState({
        //    tweets: [tweetCriado, ...tweets],
            novoTweet: ''
        });
    }

    // criar uma função que coloque
    // o tweet clicado no state
    abreModalTweet = (tweetClicado) => {
        this.setState({
        //modalAberto: true,
            tweetSelecionado: tweetClicado
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

    fechaModal = (event) => {
        if (event.target.closest('.modal__wrap')) return;
    
        const { modalAberto } = this.state;
    
        this.setState({
            tweetSelecionado: false,
            modalAberto: false,
        });
    }

    novoTweetValido = () => {
        return this.state.novoTweet.length > 140 || this.state.novoTweet.length === 0
    }

    render() {
        const { 
            novoTweet, 
            // tweets, 
            // modalAberto,
            tweetSelecionado
        } = this.state;
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
                                { this.props.listaTweets.length === 0 && (
                                    <>
                                        <span>
                                            Twite alguma coisa! Vamos falar com pessoas!
                                        </span>
                                    </>
                                )}
                                { this.props.listaTweets.map(tweet => (
                                    <Tweet 
                                        key={tweet._id} //Identificador único do react
                                        id={tweet._id}
                                        avatarUrl={tweet.usuario.foto}
                                        totalLikes={tweet.totalLikes}
                                        likeado={tweet.likeado}
                                        removivel={tweet.removivel}
                                        // Isso pode gerar diversas funções anônimas, uma para cada componente Tweet, algo não muito bom...
                                        //onApagar={() => this.apagaTweet}
                                        // Preciso fazer o binding do tweet
                                        onClick={() => this.abreModalTweet(tweet)}
                                        onApagar={ this.apagaTweet }
                                        usuario={`${tweet.usuario.nome} ${tweet.usuario.sobrenome}`}
                                        username={tweet.usuario.login}
                                    >
                                        { tweet.conteudo }
                                    </Tweet>
                                ))}
                            </div>
                        </Widget>
                    </Dashboard>
                </div>
                <Modal
                    estaAberto={tweetSelecionado}
                    onClose={this.fechaModal}
                >
                    {tweetSelecionado && (
                        <Tweet
                        id={tweetSelecionado._id}
                        avatarUrl={tweetSelecionado.usuario.foto}
                        totalLikes={tweetSelecionado.totalLikes}
                        likeado={tweetSelecionado.likeado}
                        removivel={tweetSelecionado.removivel}
                        onApagar={this.apagatweetSelecionado}
                        usuario={`${tweetSelecionado.usuario.nome} ${tweetSelecionado.usuario.sobrenome}`}
                        username={tweetSelecionado.usuario.login}
                        >
                        {tweetSelecionado.conteudo}
                        </Tweet>
                    )}
                </Modal>
            </>
    );
  }
}

function mapStateToProps (stateDaStore) {
    return {
        listaTweets: stateDaStore.tweets
    }
}


export default connect(mapStateToProps)(App);
