import './MonthToDo.css' 
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

function MonthToDo() {
    //fetching from state
    const location = useLocation();
    const { assignments, classes } =  location.state || { assignments: {}, classes: [] };
    console.log('Entering week to do');
    console.log('Received assignments:', assignments);
    console.log('Received classes:', classes); 


    //day view and week view functionality
    navigate = useNavigate();
    const handleDayBtn = () => {
        console.log('Day view pressed');
        navigate('/DailyToDo', {
            state: {
                assignments: assignments,
                classes: classes
            }
        });
    }
    const handleWeekBtn = () => {
        console.log('Week view pressed');
        navigate('/WeekToDo', {
            state: {
                assignments: assignments,
                classes: classes
            }
        });
    }
    
    return (
        <div>
            <div className="navigationBtnContainer">
                <div className="prevNextBtn">
                    <button>&larr; Prev</button>
                    <button>Next &rarr;</button>
                </div>
                <div className="differentViewBtn">
                    <button onClick={handleDayBtn}>Day View</button>
                    <button onClick={handleWeekBtn}>Week View</button>
                    <button disabled>Month View</button>
                </div>
            </div>
            <div className="calanderArea">

            </div>
        </div>
    )
}

export default MonthToDo; 

//for the month view, the name of the month and the year will display at the top
//each square will have the number of the day on the top left corner
//inside each square is the number of assignments the user has for that day, or "no assignments"
