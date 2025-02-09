import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx'
import './App.css'
import NavBar from './components/NavBar.jsx';
import CreateProduct from './pages/CreateProduct.jsx';

function App() {


  return (
    <>
      <div>
        <NavBar/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/CreateProduct" element={<CreateProduct/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
