
import './App.css'
import { useState } from 'react'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
// import AddOrView from './AddOrView' 
//once I have more pages, import them from what's exported at the end of the jsx
//and then add more routes to the list below
import DailyToDo from './DailyToDo'
import AddAssignmentsSemester from './AddAssignmentsSemester'
import Login from './Login'
import CreateAccount from './CreateAccount'
import WeekToDo from './WeekToDo'
import MonthToDo from './MonthToDo'
import SemesterProgress from './SemesterProgress'

// import AddAssignmentsMini from './AddAssignmentsMini'

function App() {  
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/CreateAccount" element={<CreateAccount />} />
          {/* <Route path="/AddOrView" element={<AddOrView />} /> */}
          <Route path="/DailyToDo" element={<DailyToDo />} />
          <Route path="/AddAssignmentsSemester" element={<AddAssignmentsSemester />} />
          <Route path="/WeekToDo" element={<WeekToDo />} />
          <Route path="/MonthToDo" element={<MonthToDo />} />
          {/* <Route path="/AddAssignmentsMini" element={<AddAssignmentsMini />} /> */}
          <Route path="/SemesterProgress" element={<SemesterProgress />} />
          
        </Routes>
    </BrowserRouter>
    
  )
}

export default App;