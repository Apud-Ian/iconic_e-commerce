import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import './App.css'
import NavBar from './components/NavBar.jsx';
import CreateProduct from './pages/CreateProduct.jsx';
import ShoppingCartPage from './pages/ShoppingCartPage.jsx';
import NavBot from './components/NavBot.jsx';
import { useEffect } from 'react';
import UserPage from './pages/UserPage.jsx';
import Footer from './components/Footer.jsx';
import AboutUsPage from './pages/AboutUsPage.jsx';
import TermsAndConditions from './pages/TermsAndConditions.jsx';

function App() {

  useEffect(() => {
    const lockOrientation = async () => {
      if (screen.orientation && screen.orientation.lock) {
        try {
          await screen.orientation.lock("portrait");
        } catch (error) {
          console.log("No se pudo bloquear la orientación:", error);
        }
      }
    };

    lockOrientation();
  }, []);

  return (
    <>
      <div className='w-screen h-full overflow-x-hidden'>
        <NavBar/>
        <Routes>
          <Route path="/iconic_e-commerce/" element={<HomePage/>} />
          <Route path="/iconic_e-commerce/createProduct" element={<CreateProduct/>}/>
          <Route path="/iconic_e-commerce/category/:category" element={<CategoryPage />} />
          <Route path='/iconic_e-commerce/product/:Name_Product' element={<ProductPage />}/>
          <Route path='/iconic_e-commerce/ShoppingCart' element={<ShoppingCartPage/>} />
          <Route path='/iconic_e-commerce/UserPage' element={<UserPage/>}/>
          <Route path='/iconic_e-commerce/about' element={<AboutUsPage/>}/>
          <Route path='/iconic_e-commerce/terms' element={<TermsAndConditions/>}/>
        </Routes>
        <Footer />
        <NavBot/>
        <div className='h-18 w-full md:h-0 md:w-0'></div>
      </div>
    </>
  )
}

export default App
