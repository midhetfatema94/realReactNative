import { API_FAILURE, API_LOADING, API_SUCCESS } from '../actions/types';

const INITIAL_STATE = { isLoading: true, error: undefined, userInfo: {} };

const HomeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case API_LOADING:
      console.log('service loading');
      return INITIAL_STATE;
    case API_FAILURE:
      console.log('service failure');
      return { state, isLoading: false, error: action.payload };
    case API_SUCCESS:
      console.log('service success', action.payload);
      return { state, isLoading: false, userInfo: action.payload };
    default:
      console.log('service default');
      return state;
  }
};

export default HomeReducer;
