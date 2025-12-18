import './WeekToDo.css' 
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

function WeekToDo() {
    //fetching from state
    const location = useLocation();
    const { assignments, classes } =  location.state || { assignments: {}, classes: [] };
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

    console.log(sundayAssignments);

    
    //adding code for going to day view or month view
    const navigate = useNavigate();
    const handleDayView = () => {
        console.log('Day view pressed');
        navigate('/DailyToDo', {
            state: {
                assignments: assignments,
                classes: classes
            }
        });
    }
    const handleMonthView = () => {
        console.log('Month view pressed');
        navigate('/MonthToDo', {
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
                            {sundayAssignments.slice(0, 3).map(([key, assignment]) => (
                                <div key={key} style={{ color: assignment.color }} className="assignment-item">
                                    {assignment.name}
                                </div>
                            ))}
                            {sundayAssignments.length > 3 && (
                                <div className="more-items">+{sundayAssignments.length - 3} more</div>
                            )}
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
                            {mondayAssignments.slice(0, 3).map(([key, assignment]) => (
                                <div key={key} style={{ color: assignment.color }} className="assignment-item">
                                    {assignment.name}
                                </div>
                            ))}
                            {mondayAssignments.length > 3 && (
                                <div className="more-items">+{mondayAssignments.length - 3} more</div>
                            )}
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
                            {tuesdayAssignments.slice(0, 3).map(([key, assignment]) => (
                                <div key={key} style={{ color: assignment.color }} className="assignment-item">
                                    {assignment.name}
                                </div>
                            ))}
                            {tuesdayAssignments.length > 3 && (
                                <div className="more-items">+{tuesdayAssignments.length - 3} more</div>
                            )}
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
                            {wednesdayAssignments.slice(0, 3).map(([key, assignment]) => (
                                <div key={key} style={{ color: assignment.color }} className="assignment-item">
                                    {assignment.name}
                                </div>
                            ))}
                            {wednesdayAssignments.length > 3 && (
                                <div className="more-items">+{wednesdayAssignments.length - 3} more</div>
                            )}
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
                            {thursdayAssignments.slice(0, 3).map(([key, assignment]) => (
                                <div key={key} style = {{ color: assignment.color }} className="assignment-item">
                                    {assignment.name}
                                </div>
                            ))}
                            {thursdayAssignments.length > 3 && (
                                <div className="more-items">+{thursdayAssignments.length - 3} more</div>
                            )}
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
                            {fridayAssignments.slice(0, 3).map(([key, assignment]) => (
                                <div key={key} style= {{ color: assignment.color }} className="assignment-item">
                                    {assignment.name}
                                </div>
                            ))}
                            {fridayAssignments.length > 3 && (
                                <div className="more-items">+{fridayAssignments.length - 3} more</div>
                            )}
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
                            {saturdayAssignments.slice(0, 3).map(([key, assignment]) => {
                                <div key={key} style= {{ color: assignment.color }} className="assignment-item">
                                    {assignment.name}
                                </div>
                            })}
                            {saturdayAssignments.length > 3 && (
                                <div className="more-items">+{saturdayAssignments.length - 3} more</div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default WeekToDo; 

//things that I want
//Display with 7 cards, each one labeled with the days of the week
//Under the display is a few assignments that are due (if there are more than 3 on that day, include 3 and at the bottom add +#)
//The user can just view it, they can't change it directly unless they are in daily to do
//EXPERIMENT: does checking off an item in daily to do remove it from weekly view?