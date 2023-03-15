import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { useEffect } from 'react';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../redux/actions/productAction';

const HomePage = () => {
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Row>
        {error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))
        )}
      </Row>
    </>
  );
};

export default HomePage;
