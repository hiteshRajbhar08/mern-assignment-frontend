import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import Header from './components/Header';

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container></Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
