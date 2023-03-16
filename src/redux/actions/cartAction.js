import { toast } from 'react-toastify';
import axios from 'axios';
import { cartActions } from '../slices/cartSlice';

// add to cart
export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${productId}`);

  dispatch(
    cartActions.setCartAddItems({
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      product: data._id,
      qty,
    })
  );

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

// remove items from cart
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch(cartActions.setCartRemoveItem(id));
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  toast.success('Item removed from the Cart');
};

// shipping address
export const saveShippingAddress = (data) => (dispatch) => {
  dispatch(cartActions.cartSaveAddress(data));
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

// cart payment
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch(cartActions.cartSavePaymentMethod(data));
  localStorage.setItem('paymentMethod', JSON.stringify(data));
};
