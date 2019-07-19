import { connect } from 'react-redux';
import Tweet from './../components/Tweet';

import { likeTweet } from './../services/TweetsAPI';

function mapStateToProps (stateDaStore) {
  return {};
}

function mapDispatchToProps (dispatch) {
  return {
    onLike: async (idTweet) => {
      const token = localStorage.getItem('token');

      const respostaDoLike = await likeTweet(idTweet, token);

      if (respostaDoLike.success) {
        dispatch(respostaDoLike.action);
      }
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tweet);