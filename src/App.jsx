import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx'
import './App.css'
import NavBar from './components/NavBar.jsx';

function App() {


  return (
    <>
      <div>
        <NavBar/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
        </Routes>
      </div>
    </>
  )
}

export default App
