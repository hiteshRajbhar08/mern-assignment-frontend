import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import { useEffect, useState } from 'react';
import { detailsProduct } from '../redux/actions/productAction';

const ProductDetailsPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);

  const { loading, error, product } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(detailsProduct(id));
  }, [dispatch, id]);

  if (loading) {
    return <Loader />;
  }

  const addToCartHandler = () => {};

  return (
    <>
      <Link className="btn btn-dark my-3 rounded" to="/">
        <i className="fas fa-arrow-left"></i> Go back
      </Link>
      <>
        <Row>
          {error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                  <ListGroup.Item>
                    Description: {product.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>${product.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {product.countInStock > 0
                            ? 'In Stock'
                            : 'Out Of Stock'}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty</Col>
                          <Col>
                            <Form.Control
                              as="select"
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}
                    <ListGroup.Item>
                      <div className="d-grid">
                        <Button
                          className="btn-block"
                          type="button"
                          disabled={product.countInStock === 0}
                          onClick={addToCartHandler}
                        >
                          Add To Cart
                        </Button>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </>
          )}
        </Row>
      </>
    </>
  );
};

export default ProductDetailsPage;
