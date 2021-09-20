import {LOGIN,LOGOUT,UPDATE_PROFILE} from '../actions/loginActions';
const initialState = {
    credential:{},
    userData:{},
    remember:false
  };

  const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN: {
        return {
          ...state,
          credential: action.payload.credential,
          remember:action.payload.remember,
          userData:action.payload.userData
        };
      }
      case LOGOUT: {
        return {
          ...state,
          credential: {},
          remember:false,
          userData:{}
        };
      }
      case UPDATE_PROFILE: {
        return {
          ...state,
          credential: {},
          remember:false,
          userData:{}
        };
      }
      default: {
        return state;
      }
    }
  };

  export default loginReducer;