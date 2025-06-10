import logo from './img/Fatia de pizza minimalista.png';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import Contact from './screens/Contact';
import About from './screens/About';
import Cadastrar from './screens/Register';
import NavBar from './components/navbar'; 
import Store from './screens/Lojas'; // <-- Add the import for the Store component

import Painel from './screens/Painel';
import Products from './screens/Products';
import Brand from './components/Brand';
import PublicLayout from './components/PublicLayout';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <NavBar />
        </header>

        <div className="App-fundo" alt="fundo"></div>
        
        <main className="container">
          <Routes>
              <Route element={<PublicLayout />}></Route>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Cadastrar />} />
            <Route path="/store" element={<Store />} />  {/* Store route */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />

                 {/* Layout ADMIN (sem navbar, sem logo) */}
           <Route path="/painel" element={<Painel />}>
           <Route path="products" element={<Products />} />
           <Route path="brand" element={<Brand />} />
        </Route>
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
