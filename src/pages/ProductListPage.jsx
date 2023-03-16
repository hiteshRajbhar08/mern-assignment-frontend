import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Row, Col, Container, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProducts } from '../redux/actions/productAction';

const ProductListPage = () => {
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.product);

  const { userInfo } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    }

    dispatch(listProducts());
  }, [dispatch, navigate, userInfo]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Container>
        <Row className="align-items-center">
          <Col xs={10}>
            <h1>Products</h1>
          </Col>
        </Row>
      </Container>
      {error && <Message variant="danger">{error}</Message>}
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>IMAGE</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>
                <Col md={2}>
                  <Image src={product.image} alt={product.name} fluid rounded />
                </Col>
              </td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ProductListPage;
