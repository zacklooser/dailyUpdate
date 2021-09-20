import {CREATE_ACCOUNT} from '../actions/createAccountActions';

const initialState = {
    status: 'failed',
  };

  const createAccountReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_ACCOUNT: {
        return {
          ...state,
          status: action.value,
        };
      }
      default: {
        return state;
      }
    }
  };

  export default createAccountReducer;