import './MonthToDo.css' 
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

function MonthToDo() {
    //fetching from state
    const location = useLocation();
    const { assignments, classes } =  location.state || { assignments: {}, classes: [] };
    console.log('Entering month to do');
    console.log('Received assignments:', assignments);
    console.log('Received classes:', classes); 
    //getting the current date (and month and year for the header)
    let monthName = '';
    let yearNumber = '';
    const [currentDate, setCurrentDate] = useState(new Date());
    const getMonth = (date) => {
        const day = new Date(date);
        const month = day.getMonth();
        const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Decemeber'];
        return monthList[month];
    }
    monthName = getMonth(currentDate);
    const getYear = (date) => {
        const day = new Date(date);
        const year = day.getFullYear(date);
        return year;
    }
    yearNumber = getYear(currentDate);


    //day view and week view functionality
    const navigate = useNavigate();
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
                <div className="header">
                    <h3>{monthName}, {yearNumber}</h3>
                </div>
            </div>
        </div>
    )
}

export default MonthToDo; 

//for the month view, the name of the month and the year will display at the top
//each square will have the number of the day on the top left corner
//inside each square is the number of assignments the user has for that day, or "no assignments"
