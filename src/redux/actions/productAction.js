import { productActions } from '../slices/productSlice';
import { toast } from 'react-toastify';
import axios from 'axios';

// fetch all products
export const listProducts =
  (keyword = '') =>
  async (dispatch) => {
    try {
      dispatch(productActions.setLoading());

      const { data } = await axios.get(`/api/products?keyword=${keyword}`);
      dispatch(productActions.setProducts(data));
    } catch (error) {
      dispatch(
        productActions.setError(
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

// fetch  productdetails
export const detailsProduct = (productId) => async (dispatch) => {
  try {
    dispatch(productActions.setLoading());

    const { data } = await axios.get(`/api/products/${productId}`);

    dispatch(productActions.setProduct(data));
  } catch (error) {
    dispatch(
      productActions.setError(
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
