import axios from 'axios';
import { toast } from 'react-toastify';
import { cartActions } from '../slices/cartSlice';
import { orderActions } from '../slices/orderSlice';

// create order
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch(orderActions.setLoading());

    const config = {
      headers: {
        Authorization: `Bearer ${getState().user.userInfo.token}`,
      },
    };

    const { data } = await axios.post('/api/orders', order, config);

    dispatch(orderActions.setCreateOrder(data.order));
    toast.success(data.message);
    dispatch(cartActions.setCartEmpty());
    localStorage.removeItem('cartItems');
  } catch (error) {
    dispatch(
      orderActions.setError(
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

// details order
export const detailsOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch(orderActions.setLoading());

    const config = {
      headers: {
        Authorization: `Bearer ${getState().user.userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${orderId}`, config);

    dispatch(orderActions.setOrderDetails(data));
  } catch (error) {
    dispatch(
      orderActions.setError(
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

//  list my orders
export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch(orderActions.setLoading());

    const config = {
      headers: {
        Authorization: `Bearer ${getState().user.userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/myorders`, config);

    dispatch(orderActions.setListMyOrders(data));
  } catch (error) {
    dispatch(
      orderActions.setError(
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

// pay order
export const payOrder =
  (order, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch(orderActions.setLoading());

      const config = {
        headers: {
          Authorization: `Bearer ${getState().user.userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/orders/${order._id}/pay`,
        paymentResult,
        config
      );

      dispatch(orderActions.setOrderPay(data.order));
      toast.success(data.message);
    } catch (error) {
      dispatch(
        orderActions.setError(
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
