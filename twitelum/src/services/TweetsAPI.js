import config from './../config';
const { apiUrl, endpoints } = config;
const { tweets } = endpoints;

export async function listaTweets(token) {
  try {
    const resposta = await fetch(
      `${apiUrl}${tweets.read.action}?X-AUTH-TOKEN=${token}`,
      {
        method: tweets.read.method
      }
    );
    const listaTweets = await resposta.json();
 
    return {
      type: 'CARREGA_TWEETS',
      payload: listaTweets
    };

  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function criaTweet(novoTweet, token) {
  try {
    const resposta = await fetch(
      `${apiUrl}${tweets.create.action}?X-AUTH-TOKEN=${token}`,
      {
        method: tweets.create.method,
        body: JSON.stringify({
          conteudo: novoTweet
        })
      }
    );
    const tweetCriado = await resposta.json();

    return {
      type: 'NOVO_TWEET',
      payload: tweetCriado
    };

  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function deletaTweet(idDoTweet, token) {
  try {
    const resposta = await fetch(
      `${apiUrl}${tweets.delete.action}${idDoTweet}?X-AUTH-TOKEN=${token}`,
      { method: tweets.delete.method }
    );
  
    return {
      success: resposta.ok,
      action: {
        type: 'APAGA_TWEET',
        payload: idDoTweet
      }
    };    
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function likeTweet(idDoTweet, token) {
  const resposta = await fetch(
    `${apiUrl}${tweets.like.action}${idDoTweet}/like?X-AUTH-TOKEN=${token}`,
    { method: tweets.like.method}
  );

  return {
    success: resposta.ok,
    action: {
      type: 'CURTE_TWEET',
      payload: idDoTweet
    }
  };
}