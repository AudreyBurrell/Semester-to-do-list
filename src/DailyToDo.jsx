import './DailyToDo.css'
import { useLocation } from 'react-router-dom';

function DailyToDo() {
    const location = useLocation();
    const { assignments, classes } =  location.state || { assignments: {}, classes: [] };
    console.log('Received assignments:', assignments);
    console.log('Received classes:', classes);
    return (
        <div>
            <h1>Entered To-Do List</h1>
        </div>
    );
}

export default DailyToDo;

//Things that I need
//A header displaying the date
// Buttons that change the view from daily to weekly/monthly
//A place where the list actually shows up with each item in the list with the ability to check off
//a place where users can go back in and add items manually

