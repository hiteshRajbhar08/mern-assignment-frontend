import { Col, Row } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Row>
        <Col className="text-center text-dark py-3">
          &copy; {new Date().getFullYear()} Ecommerce, Inc. All rights reserved.
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
