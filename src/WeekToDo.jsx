import './WeekToDo.css' 
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

function WeekToDo() {
    //fetching from state
    const location = useLocation();
    const { assignments, classes, completedAssignments } =  location.state || { assignments: {}, classes: [], completedAssignments: {} };
    console.log('Entering week to do');
    console.log('Received assignments:', assignments);
    console.log('Received classes:', classes);
    //getting the current date to determine the Sunday date and then get the rest of the dates
    const [currentDate, setCurrentDate] = useState(new Date());
    const getPastSunday = (date) => {
        const day = date.getDay();
        const diff = day;
        const sunday = new Date(date);
        sunday.setDate(date.getDate() - diff);
        console.log(sunday);
        return sunday;
    };
    const getWeekDays = (date) => {
        const sunday = getPastSunday(date);
        const weekDays = [];
        for (let i = 0; i < 7; i++) {
            const day = new Date(sunday);
            day.setDate(sunday.getDate() + i);
            const year = day.getFullYear();
            const month = String(day.getMonth() + 1).padStart(2, '0');
            const dayOfMonth = String(day.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${dayOfMonth}`;
            weekDays.push(formattedDate);
        }
        return weekDays;
    };
    const weekDays = getWeekDays(currentDate);
    console.log(weekDays);
    //getting the assignments for each day
    const getAssignmentsForDate = (date) => {
        if (assignments[date]) {
            return assignments[date].map((assignment, index) => [`${date}-${index}`, assignment]);
        }
        return [];
    };
    const sundayAssignments = getAssignmentsForDate(weekDays[0]);
    const mondayAssignments = getAssignmentsForDate(weekDays[1]);
    const tuesdayAssignments = getAssignmentsForDate(weekDays[2]);
    const wednesdayAssignments = getAssignmentsForDate(weekDays[3]);
    const thursdayAssignments = getAssignmentsForDate(weekDays[4]);
    const fridayAssignments = getAssignmentsForDate(weekDays[5]);
    const saturdayAssignments = getAssignmentsForDate(weekDays[6]);

    //adding code for going to day view or month view
    const navigate = useNavigate();
    const handleDayView = () => {
        console.log('Day view pressed');
        navigate('/DailyToDo', {
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
    //the next and previous buttons
    const handlePrevWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() - 7);
        setCurrentDate(newDate);
    };
    const handleNextWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + 7);
        setCurrentDate(newDate);
    }

    return (
        <div>
            <div className="navigationBtnContainer">
                <div className="prevNextBtn">
                    <button onClick={handlePrevWeek}>&larr; Prev</button> 
                    <button onClick={handleNextWeek}>Next &rarr;</button>
                    <button className="addAssignments">+ Assignments</button>
                </div>
                <div className="differentViewBtn">
                    <button onClick={handleDayView}>Day View</button>
                    <button disabled>Week View</button>
                    <button onClick={handleMonthView}>Month View</button>
                </div>
            </div>
            <div className="dayCardContainer">
                <div className="sundayCard">
                    <h4>Sunday</h4> 
                    <div className="dateDisplay">{weekDays[0]}</div>
                    {sundayAssignments.length === 0 ? (
                        <div className="empty-day">No Assignments</div>
                    ) : (
                        <>
                            {sundayAssignments.slice(0, 4).map(([key, assignment], index) => {
                                const isCompleted = completedAssignments[weekDays[0]]?.includes(index) || false;
                                return (
                                    <div 
                                        key={key} 
                                        style={{ 
                                            borderLeftColor: assignment.color,
                                            textDecoration: isCompleted ? 'line-through' : 'none',
                                            opacity: isCompleted ? 0.6 : 1
                                        }} 
                                        className="assignment-item"
                                    >
                                        {assignment.name}
                                    </div>
                                );
                            })}
                        </>
                    )} 
                </div>
                <div className="mondayCard">
                    <h4>Monday</h4>
                    <div className="dateDisplay">{weekDays[1]}</div>
                    {mondayAssignments.length === 0 ? (
                        <div className="empty-day">No Assignments</div>
                    ) : (
                        <>
                            {mondayAssignments.slice(0,4).map(([key, assignment], index) => {
                                const isCompleted = completedAssignments[weekDays[1]]?.includes(index) || false;
                                return (
                                    <div 
                                        key={key}
                                        style={{
                                            borderLeftColor: assignment.color,
                                            textDecoration: isCompleted ? 'line-through' : 'none',
                                            opacity: isCompleted ? 0.6 : 1
                                        }}
                                        className="assignment-item"
                                    >
                                        {assignment.name}
                                    </div>
                                );
                            })}
                        </>
                    )}
                </div>
                <div className="tuesdayCard">
                    <h4>Tuesday</h4>
                    <div className="dateDisplay">{weekDays[2]}</div>
                    {tuesdayAssignments.length === 0 ? (
                        <div className="empty-day">No Assignments</div>
                    ) : (
                        <>
                            {tuesdayAssignments.slice(0, 4).map(([key, assignment], index) => {
                                const isCompleted = completedAssignments[weekDays[2]]?.includes(index) || false;
                                return (
                                    <div   
                                        key={key}
                                        style={{
                                            borderLeftColor: assignment.color,
                                            textDecoration: isCompleted ? 'line-through' : 'none',
                                            opacity: isCompleted ? 0.6 : 1
                                        }}
                                        className="assignment-item"
                                    >
                                        {assignment.name}
                                    </div>
                                );
                            })}
                        </>
                    )}
                </div>
                <div className="wednesdayCard">
                    <h4>Wednesday</h4>
                    <div className="dateDisplay">{weekDays[3]}</div>
                    {wednesdayAssignments.length === 0 ? (
                        <div className="empty-day">No Assignments</div>
                    ) : (
                        <>
                            {wednesdayAssignments.slice(0, 4).map(([key, assignment], index) => {
                                const isCompleted = completedAssignments[weekDays[3]]?.includes(index) || false;
                                return (
                                    <div   
                                        key={key}
                                        style={{
                                            borderLeftColor: assignment.color,
                                            textDecoration: isCompleted ? 'line-through' : 'none',
                                            opacity: isCompleted ? 0.6 : 1
                                        }}
                                        className="assignment-item"
                                    >
                                        {assignment.name}
                                    </div>
                                );
                            })}
                        </>
                    )}
                </div>
                <div className="thursdayCard">
                    <h4>Thursday</h4>
                    <div className="dateDisplay">{weekDays[4]}</div>
                    {thursdayAssignments.length === 0 ? (
                        <div className="empty-day">No Assignments</div>
                    ) : (
                        <>
                            {thursdayAssignments.slice(0, 4).map(([key, assignment], index) => {
                                const isCompleted = completedAssignments[weekDays[4]]?.includes(index) || false;
                                return (
                                    <div   
                                        key={key}
                                        style={{
                                            borderLeftColor: assignment.color,
                                            textDecoration: isCompleted ? 'line-through' : 'none',
                                            opacity: isCompleted ? 0.6 : 1
                                        }}
                                        className="assignment-item"
                                    >
                                        {assignment.name}
                                    </div>
                                );
                            })}
                        </>
                    )}
                </div>
                <div className="fridayCard">
                    <h4>Friday</h4>
                    <div className="dateDisplay">{weekDays[5]}</div>
                    {fridayAssignments.length === 0 ? (
                        <div className="empty-day">No Assignments</div>
                    ) : (
                        <>
                            {fridayAssignments.slice(0, 4).map(([key, assignment], index) => {
                                const isCompleted = completedAssignments[weekDays[5]]?.includes(index) || false;
                                return (
                                    <div   
                                        key={key}
                                        style={{
                                            borderLeftColor: assignment.color,
                                            textDecoration: isCompleted ? 'line-through' : 'none',
                                            opacity: isCompleted ? 0.6 : 1
                                        }}
                                        className="assignment-item"
                                    >
                                        {assignment.name}
                                    </div>
                                );
                            })}
                        </>
                    )}
                </div>
                <div className="saturdayCard">
                    <h4>Saturday</h4>
                    <div className="dateDisplay">{weekDays[6]}</div>
                    {saturdayAssignments.length === 0 ? (
                        <div className="empty-day">No Assignments</div>
                    ) : (
                        <>
                            {saturdayAssignments.slice(0, 4).map(([key, assignment], index) => {
                                const isCompleted = completedAssignments[weekDays[6]]?.includes(index) || false;
                                return (
                                    <div   
                                        key={key}
                                        style={{
                                            borderLeftColor: assignment.color,
                                            textDecoration: isCompleted ? 'line-through' : 'none',
                                            opacity: isCompleted ? 0.6 : 1
                                        }}
                                        className="assignment-item"
                                    >
                                        {assignment.name}
                                    </div>
                                );
                            })}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default WeekToDo; 
