import './DailyToDo.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';

function DailyToDo() {
    const location = useLocation();
    const { assignments, classes, completedAssignments: passedCompleteAssignments } =  location.state || { assignments: {}, classes: [], completedAssignments: {} };
    console.log('Received assignments:', assignments);
    console.log('Received classes:', classes);
    const [currentDate, setCurrentDate] = useState(new Date());
    //getting the assignments based off the date
    const getAssignmentsForDate = (currentDate) => {
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const dateKey = `${year}-${month}-${day}`;
        console.log('Looking for date key:', dateKey);
        console.log('Found assignments:', assignments[dateKey] || []);
        return assignments[dateKey] || [];
    };
    const todaysAssignments = getAssignmentsForDate(currentDate);
    //the actual items inside the list
    const [completedAssignments, setCompletedAssignments] = useState(passedCompleteAssignments || {});
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
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const dateKey = `${year}-${month}-${day}`;
        // const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}`;
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
    //the week and month navigation
    const navigate = useNavigate();
    const handleWeekView = () => {
        console.log('Week view pressed');
        //need to save the assignment data
        navigate('/WeekToDo', {
            state: {
                assignments: assignments,
                classes: classes,
                completedAssignments: completedAssignments
            }
        });
    }
    const handleMonthView = () => {
        console.log('Month view pressed');
        navigate('/MonthToDo', {
            state: {
                assignments: assignments,
                classes: classes,
                completedAssignments: completedAssignments
            }
        });
    }
    

    return (
        <div>
            <div className="navigationBtnContainer"> 
                <div className="prevNextBtn">
                    <button onClick={handlePrevDay}>&larr; Prev</button> 
                    <button onClick={handleNextDay}>Next &rarr;</button>
                    <button className="addAssignments">+ Assignments</button>
                </div>
                <div className="differentViewBtn">
                    <button disabled>Day View</button>
                    <button onClick={handleWeekView}>Week View</button>
                    <button onClick={handleMonthView}>Month View</button>
                </div>
            </div>
            <div className="currentDayCard">
                <h1>{formattedText}</h1>
                {todaysAssignments.length === 0 ? (
                    <p>No assignments for {formattedText}</p>
                ) : (
                    <div className="assignmentsList">
                        {todaysAssignments.map((assignment, index) => {
                            const year = currentDate.getFullYear();
                            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                            const day = String(currentDate.getDate()).padStart(2, '0');
                            const dateKey = `${year}-${month}-${day}`;
                            // const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}`;
                            const isCompleted = completedAssignments[dateKey]?.includes(index) || false;
                            return (
                                <div key={index} className="assignmentItem" style={{ borderLeftColor: assignment.color }}>
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



