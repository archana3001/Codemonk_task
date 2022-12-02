import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import Cart from './pages/Cart';
import Footer from './components/Footer';


function App() {
  return (
    <div className="App">
      <ShoppingCartProvider>
        <Navbar />
        <Cart />
        <Footer />
      </ShoppingCartProvider>
    </div>
  );
}

export default App;
