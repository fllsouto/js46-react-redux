const config = {
  apiUrl: 'http://twitelum-api.herokuapp.com',
  endpoints: {
    tweets: {
      read: {
        method: 'GET',
        action: '/tweets'
      },
      create: {
        method: 'POST',
        action: '/tweets'
      },
      delete: {
        method: 'DELETE',
        action: '/tweets/'
      }
    }
  }
};

export default config;
