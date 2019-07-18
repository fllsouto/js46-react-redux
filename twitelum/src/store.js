import { createStore } from 'redux';

const stateInicial = {
  tweets: []
};

function reducer(store = stateInicial, action = {}) {
  
  // regra 1 - sempre crio um objeto/array novo
  // regra 2 - persistir o conteúdo na store

  switch (action.type) {
    case 'CARREGA_TWEETS':
      // O payload significa os dados que estão sendo 
      // utilizados na action
      return { tweets: action.payload }

      case 'NOVO_TWEET':
      return {
        tweets: [action.payload, ...store.tweets]
      };

      case 'APAGA_TWEET':
      const idDoTweet = action.payload;
      const tweetsQueSobraram = store.tweets
        .filter((tweet) => tweet._id !== idDoTweet);
      return {
        tweets: tweetsQueSobraram
      }

    default:
      return store;
  }
}

const store = createStore(reducer);

export default store;