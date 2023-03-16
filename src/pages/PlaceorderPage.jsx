import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { orderActions } from '../redux/slices/orderSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { createOrder } from '../redux/actions/orderAction';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';

const PlaceorderPage = () => {
  const cart = useSelector((state) => state.cart);

  const navigate = useNavigate();

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [navigate, cart]);

  //Calculate Prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  const itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : itemsPrice * 0.1);
  const taxPrice = addDecimals(0.15 * itemsPrice);
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  const dispatch = useDispatch();

  const { order, loading, success, error } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch(orderActions.setOrderReset());
    }
  }, [navigate, success, order, dispatch]);

  const placeOrderHandler = () => {
    const order = {
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    };

    dispatch(createOrder(order));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong> {cart.shippingAddress.address},
                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment</h2>
              <p>
                <strong>Method:</strong> {cart.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={1}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={4}>
                      {item.qty} x ${item.price} = ${item.qty * item.price}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item className="text-center">
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong> Order Total</strong>
                  </Col>
                  <Col>
                    <strong>${totalPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="d-grid">
                  <Button
                    type="button"
                    className="btn-block"
                    disabled={cart.cartItems === 0}
                    onClick={placeOrderHandler}
                  >
                    Place Order
                  </Button>
                </div>
              </ListGroup.Item>
              {error && <Message variant="danger">{error}</Message>}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceorderPage;
