import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import AddOrView from './AddOrView'

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AddOrView" element={<AddOrView />} />
        </Routes>
    </BrowserRouter>
    
  )
}

export default App;