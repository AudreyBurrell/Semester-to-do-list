import './MonthToDo.css' 
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

function MonthToDo() {
    //fetching from state
    const location = useLocation();
    const { assignments, classes, completedAssignments } =  location.state || { assignments: {}, classes: [], completedAssignments: {} };
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
    //getting the calander days and filling it with the number of assignments for each day
    const getCalanderDays = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const startingDayOfWeek = firstDay.getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const days = [];
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push({ isEmpty: true });
        }
        for (let day = 1; day <= daysInMonth; day++) {
            const dateString = `${year}-${String(month+1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            days.push({
                day: day,
                date: dateString,
                isEmpty: false
            });
        }
        return days;
    }
    const calanderDays = getCalanderDays(currentDate);
    const getAssignmentCount = (dateString) => {
        if (assignments[dateString] &&  Array.isArray(assignments[dateString])) {
            return assignments[dateString].length;
        }
        return 0;
    };
    //checking if all assignments are completed
    const areAllCompleted = (dateString, assignmentCount) => {
        if (assignmentCount === 0) return false;
        const completedForDate = completedAssignments[dateString] || [];
        return completedForDate.length === assignmentCount;
    };
    //functionality for when the user hovers over stuff
    const [currentHoverDate, setHoverDate] = useState(null);
    const handleMouseEnter = (dateString) => {
        console.log('Hovering over date')
        setHoverDate(dateString)
    }
    const handleMouseLeave = (dateString) => {
        console.log('Leaving date');
        setHoverDate(null);
    }


    //day view and week view functionality
    const navigate = useNavigate();
    const handleDayBtn = () => {
        console.log('Day view pressed');
        navigate('/DailyToDo', {
            state: {
                assignments: assignments,
                classes: classes,
                completedAssignments: completedAssignments
            }
        });
    }
    const handleWeekBtn = () => {
        console.log('Week view pressed');
        navigate('/WeekToDo', {
            state: {
                assignments: assignments,
                classes: classes,
                completedAssignments: completedAssignments
            }
        });
    }
    //the next and previous button functionality
    const handlePrevBtn = () => {
        console.log('Previous button pressed');
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() - 1);
        setCurrentDate(newDate)
    }
    const handleNextBtn = () => {
        console.log('Next button pressed');
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + 1);
        setCurrentDate(newDate);
    }
    
    return (
        <div>
            <div className="navigationBtnContainer">
                <div className="prevNextBtn">
                    <button onClick={handlePrevBtn}>&larr; Prev</button>
                    <button onClick={handleNextBtn}>Next &rarr;</button>
                    <button className="addAssignments">+ Assignments</button>
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
                <div className="weekdayLabels">
                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                </div>
                <div className="calendarGrid">
                    {calanderDays.map((dayObj, index) => (
                        <div 
                            key={index} 
                            className={dayObj.isEmpty ? "calendarDay empty" : "calendarDay"}
                            onMouseEnter={() => !dayObj.isEmpty && handleMouseEnter(dayObj.date)}
                            onMouseLeave={handleMouseLeave}
                        >
                            {!dayObj.isEmpty && (
                                <>
                                    <div className="dayNumber">{dayObj.day}</div>
                                    {getAssignmentCount(dayObj.date) > 0 ? (
                                        <>
                                            <div className="assignmentCount">
                                                {getAssignmentCount(dayObj.date)} assignment{getAssignmentCount(dayObj.date) > 1 ? 's' : ''}
                                            </div>
                                            {areAllCompleted(dayObj.date, getAssignmentCount(dayObj.date)) && (
                                                <div className="allCompleted">All Assignments Completed</div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="noAssignments">No Assignments</div>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>
                {currentHoverDate && (
                    <div className="hoverPopup">
                        <div className="popupHeader">
                            <strong>{currentHoverDate}</strong>
                        </div>
                        <div className="popupContent">
                            {assignments[currentHoverDate] && assignments[currentHoverDate].length > 0 ? (
                                <div className="assignmentsList">
                                    {assignments[currentHoverDate].map((assignment, index) => {
                                        const isCompleted = completedAssignments[currentHoverDate]?.includes(index) || false;
                                        return (
                                            <div 
                                                key={index} 
                                                className="popupAssignment" 
                                                style={{ 
                                                    borderLeftColor: assignment.color,
                                                    textDecoration: isCompleted ? 'line-through' : 'none',
                                                    opacity: isCompleted ? 0.6 : 1
                                                }}
                                            >
                                                {assignment.name}
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="noAssignmentsPopup">No assignments for this day</div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MonthToDo; 

