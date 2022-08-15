import axios from 'axios';
import * as types from './actionType';
import AsyncStorage from '@react-native-async-storage/async-storage';
const baseUrl = 'https://33b7-221-132-115-66.in.ngrok.io';

// Auth Actions
export const user_sign_up = data => async dispatch => {
  try {
    dispatch({
      type: types.USER_SIGNUP,
      payload: data,
    });
  } catch (error) {
    console.log('Network Error');
  }
};

export const user_login = body => async dispatch => {
  AsyncStorage.getItem('authToken', async (err, result) => {
    if (!result) {
      try {
        await AsyncStorage.setItem('authToken', 'sajksnajsklnasjn');
        console.log('token save in async storage ');

        dispatch({
          type: types.USER_LOGIN,
          payload: {isUserLogin: true},
        });
      } catch (error) {
        console.error(error);
      }
    }
  });

  return true;

  var config = {
    method: 'post',
    url: `${baseUrl}/api/login`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  };

  axios(config)
    .then(async response => {
      try {
        await AsyncStorage.setItem('authToken', response.data.data.token);
      } catch (error) {
        console.error(error);
      }

      dispatch({
        type: types.USER_LOGIN,
        payload: {...response.data, isUserLogin: true},
      });
    })
    .catch(function (error) {
      if (!error.response.data.status) {
        dispatch({
          type: types.USER_LOGIN,
          payload: {...error.response.data, isUserLogin: false},
        });
      }
    });
};

export const user_logout = () => async dispatch => {
  console.log('logout');
  try {
    try {
      await AsyncStorage.setItem('authToken', '');
      console.log('token save in async storage ');

      dispatch({
        type: types.USER_LOGOUT,
        payload: {isUserLogin: false},
      });
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.log('Network Error');
  }
};

export const updateUserData = userData => async dispatch => {
  console.log(userData.displayName, '----ACtions');
  try {
    dispatch({
      type: types.UPDATE_USER_DATA,
      payload: {
        userData: userData,
      },
    });
  } catch (error) {
    console.log('Failed to update data.');
  }
};
// export const userLoggedIn = (email, password) => async dispatch => {
//   dispatch({
//     type: types.USER_LOGIN,
//     payload: {isApiCall: true},
//   });
//   try {
//     const response = await axios.post(`${baseUrl}/login`, {
//       email,
//       password,
//     });
//     if (response.data.status) {
//       dispatch({
//         type: types.USER_LOGIN,
//         payload: {isUserLogin: response.data.status, ...response.data.data},
//       });
//     } else {
//       toast.error(response.data.msg);
//     }
//   } catch (error) {
//     console.log(error);
//     toast.error('Network Error');
//   }
//   dispatch({
//     type: types.USER_LOGIN,
//     payload: {isApiCall: false},
//   });
// };

// export const userLogOut = () => async dispatch => {
//   dispatch({
//     type: types.USER_LOGOUT,
//     payload: {isUserLogin: false, isApiCall: false},
//   });
//   dispatch({
//     type: types.GET_METRICS,
//     payload: [],
//   });
// };
