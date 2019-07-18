import React, { Component } from 'react';
import { connect } from 'react-redux';

import Cabecalho from './../components/Cabecalho'
import NavMenu from './../components/NavMenu'
import Dashboard from './../components/Dashboard'
import Widget from './../components/Widget'
import TrendsArea from './../components/TrendsArea'
import Tweet from './../components/Tweet'
import Modal from '../components/Modal';

import * as TweetsAPI from './../services/TweetsAPI';

class App extends Component {
	state = {
		novoTweet: '',
		tweetSelecionado: null,
		tweets: []
	}
	
	componentDidMount = async () => {
		const token = localStorage.getItem('token');        
		const action = await TweetsAPI.listaTweets(token)
		this.props.dispatch(action);
	}
	
	handleSubmit = async (evento) => {
		evento.preventDefault();
		
		const { novoTweet } = this.state;
		const token = localStorage.getItem('token');        
		
		const action = await TweetsAPI.criaTweet(novoTweet, token);
		
		this.props.dispatch(action);
		this.setState({ novoTweet: '' });
	}
	
	apagaTweet = async (idDoTweet) => {
		const token = localStorage.getItem('token');        		
		const resposta = await TweetsAPI.deletaTweet(idDoTweet, token);
		console.log(resposta)
		if (resposta.success) {
			this.props.dispatch(resposta.action);
			
			this.setState({
				tweetSelecionado: null
			});
		}
	}
	
	abreModalTweet = (tweetClicado) => {
		this.setState({
			tweetSelecionado: tweetClicado
		});
	}
	
	fechaModal = (event) => {
		if (event.target.closest('.modal__wrap')) return;
		
		this.setState({
			tweetSelecionado: null
		});
	}
	
	novoTweetValido = () => {
		const { novoTweet } = this.state;
		return novoTweet.length > 140 || novoTweet.length === 0
	}
	
	render() {
		const { 
			novoTweet, 
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
												key={tweet._id}
												id={tweet._id}
												avatarUrl={tweet.usuario.foto}
												totalLikes={tweet.totalLikes}
												likeado={tweet.likeado}
												removivel={tweet.removivel}
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
									onApagar={this.apagaTweet}
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
			