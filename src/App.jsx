import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import './App.css'
import NavBar from './components/NavBar.jsx';
import CreateProduct from './pages/CreateProduct.jsx';
import ShoppingCartPage from './pages/ShoppingCartPage.jsx';

function App() {


  return (
    <>
      <div>
        <NavBar/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/createProduct" element={<CreateProduct/>}/>
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path='/product/:id' element={<ProductPage />}/>
          <Route path='/ShoppingCart' element={<ShoppingCartPage/>} />
        </Routes>
      </div>
    </>
  )
}

export default App
