import { toast } from 'react-toastify';
import axios from 'axios';
import { userActions } from '../slices/userSlice';

// login user
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(userActions.setLoading());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );

    dispatch(userActions.login(data));
    toast.success('Login Successfull');
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch(
      userActions.setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : 'An unexpected error has occured. Please try again later.'
      )
    );
    toast.error(error.response.data.message);
  }
};

// register user
export const registerUser = (name, email, password) => async (dispatch) => {
  try {
    dispatch(userActions.setLoading());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users/register',
      { name, email, password },
      config
    );

    dispatch(userActions.register(data));
    toast.success('Register Successfull');
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch(
      userActions.setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : 'An unexpected error has occured. Please try again later.'
      )
    );
    toast.error(error.response.data.message);
  }
};

// logout user
export const logoutUser = () => async (dispatch) => {
  localStorage.removeItem('userInfo');
  toast.success('Logout Successfull');
  dispatch(userActions.logout());
};
