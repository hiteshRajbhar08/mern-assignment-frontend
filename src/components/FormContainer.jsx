import { Col, Container, Row } from 'react-bootstrap';

const FormContainer = ({ children }) => {
  return (
    <Container className="p-4">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
