import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import AddOrView from './AddOrView' 
//once I have more pages, import them from what's exported at the end of the jsx
//and then add more routes to the list below

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