import './DailyToDo.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';

function DailyToDo() {
    const location = useLocation();
    const { assignments, classes } =  location.state || { assignments: {}, classes: [] };
    console.log('Received assignments:', assignments);
    console.log('Received classes:', classes);
    const [currentDate, setCurrentDate] = useState(new Date());
    //getting the assignments based off the date
    const getAssignmentsForDate = (currentDate) => {
        const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}`;
        console.log(assignments[dateKey] || []);
        return assignments[dateKey] || [];
    };
    const todaysAssignments = getAssignmentsForDate(currentDate);
    //the actual items inside the list
    const [completedAssignments, setCompletedAssignments] = useState({});
     //previous and next buttons
    const handlePrevDay = () => {
        setCurrentDate(prev => {
            const newDate = new Date(prev)
            newDate.setDate(newDate.getDate() - 1);
            return newDate;
        });
    };
    const handleNextDay = () => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setDate(newDate.getDate() + 1);
            return newDate;
        });
    }
    //getting the header to display with the right date:
    const formattedText = currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    //getting the items to complete
    const handleToggleComplete = (index) => {
        const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}`;
        setCompletedAssignments(prev => {
            const currentCompleted = prev[dateKey] || [];
            const isCompleted = currentCompleted.includes(index);   
            if (isCompleted) {
                return {
                    ...prev,
                    [dateKey]: currentCompleted.filter(i => i !== index)
                };
            } else {
                return {
                    ...prev,
                    [dateKey]: [...currentCompleted, index]
                };
            }     
        });
    }


    return (
        <div>
            {/* the buttons for going to next/previous day, month, year go up here */}
            <div className="navigationBtnContainer"> {/*these two divs apepar on opposite sides of the currentDayCard*/}
                <div className="prevNextBtn">
                    <button onClick={handlePrevDay}>&larr; Prev</button> {/*the first appears gray, the second is green*/}
                    <button onClick={handleNextDay}>Next &rarr;</button>
                </div>
                <div className="differentViewBtn">
                    <button disabled>Day View</button>
                    <button>Week View</button>
                    <button>Month View</button>
                </div>
            </div>
            <div className="currentDayCard">
                <h1>{formattedText}</h1>
                {todaysAssignments.length === 0 ? (
                    <p>No assignments for {formattedText}</p>
                ) : (
                    <div className="assignmentsList">
                        {todaysAssignments.map((assignment, index) => {
                            const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}`;
                            const isCompleted = completedAssignments[dateKey]?.includes(index) || false;
                            return (
                                <div key={index} className="assignmentItem">
                                    <span style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>
                                        {assignment.name}
                                    </span>
                                    <button onClick={() => handleToggleComplete(index)}>
                                        {isCompleted ? '✓ Done' : 'Mark Complete'}
                                    </button>
                                </div>
                            ) ;
                        })}
                    </div>
                )}
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


