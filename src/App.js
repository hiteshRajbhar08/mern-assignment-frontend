import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import Toast from './utils/Toast';
import CartPage from './pages/CartPage';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/cart/:id" element={<CartPage />} />
          </Routes>
        </Container>
      </main>
      <Footer />
      <Toast />
    </Router>
  );
};

export default App;
