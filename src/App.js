import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './screens/Home';
import Login from './screens/Login';
import Contact from './screens/Contact';
import About from './screens/About';
import Cadastrar from './screens/Register';

import PublicLayout from './components/PublicLayout';
import Painel from './screens/Painel';
import Products from './screens/Products';
import Brand from './screens/Brand';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout PÚBLICO com navbar e logo */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Cadastrar />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Route>

        {/* Layout ADMIN (sem navbar, sem logo) */}
        <Route path="/painel" element={<Painel />}>
          <Route path="products" element={<Products />} />
          <Route path="brand" element={<Brand />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
