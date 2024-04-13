import ReactDOM from "react-dom/client";
import './app.scss'

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Product from './components/Product';

const App = () => {

  return (
    <div>
      <Navbar />

      <Hero />
      
      <Product />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
