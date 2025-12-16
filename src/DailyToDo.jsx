import './DailyToDo.css'
import { useLocation } from 'react-router-dom';

function DailyToDo() {
    const location = useLocation();
    const { assignments, classes } =  location.state || { assignments: {}, classes: [] };
    console.log('Received assignments:', assignments);
    console.log('Received classes:', classes);
    //getting the current date:
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const formattedText = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    return (
        <div>
            {/* the buttons for going to next/previous day, month, year go up here */}
            <div className="currentDayCard">
                <h1>{formattedText}</h1>
            </div>
        </div>
    );
}

export default DailyToDo;

//Things that I need
//A header displaying the date
// Buttons that change the view from daily to weekly/monthly
//A place where the list actually shows up with each item in the list with the ability to check off
//a place where users can go back in and add items manually 

//For the list stuff
//First thing that I really need to do is figure out how to take apart the assignments list into individual lists per date (or even figure out if that's needed)


