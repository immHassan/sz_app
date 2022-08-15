import {
  UPDATE_USER_DATA,
  USER_LOGIN,
  USER_LOGOUT,
  USER_SIGNUP,
} from '../Actions/actionType';

const INITIAL_STATE = {
  isUserLogin: false,
  userData: null,
  accessToken: '',
};

export function UserReducer(state = INITIAL_STATE, action) {
  state = action.payload;
  switch (action.type) {
    case USER_SIGNUP:
      return {
        ...state,
      };
    case USER_LOGIN:
      return {
        ...state,
      };
    case USER_LOGOUT:
      return {
        ...state,
      };
    case UPDATE_USER_DATA:
      return {
        ...state,
      };
    default:
      return {...state};
  }
}
