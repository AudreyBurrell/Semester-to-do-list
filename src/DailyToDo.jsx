import './DailyToDo.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

function DailyToDo() {
    //const location = useLocation();
    //const { assignments, classes, completedAssignments: passedCompletedAssignments } =  location.state || { assignments: {}, classes: [], completedAssignments: {} };
    const [assignments, setAssignments] = useState(() => {
        const saved = localStorage.getItem('assignments');
        return saved ? JSON.parse(saved) : {};
    });

    const [completedAssignments, setCompletedAssignments] = useState(() => {
        const saved = localStorage.getItem('completedAssignments');
        return saved ? JSON.parse(saved) : {};
    });

    const [classes, setClasses] = useState(() => {
        const saved = localStorage.getItem('classes');
        return saved ? JSON.parse(saved) : [];
    });
    console.log('Received assignments:', assignments);
    console.log('Received classes:', classes);
    const [currentDate, setCurrentDate] = useState(new Date());
    //getting the assignments based off the date
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if(!userId) return;
        const loadCompleted = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/completed/${userId}`);
                const data = await res.json();
                if (data.success) {
                    setCompletedAssignments(data.completedAssignments || {});
                    console.log('Loaded completed assignments:', data.completedAssignments);
                }
            } catch (err) {
                console.error('Error loading completed assignments:', err);
            }
        };
        loadCompleted();
    }, []);
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
    // const [completedAssignments, setCompletedAssignments] = useState(passedCompletedAssignments || {});
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
    const handleToggleComplete = async (index) => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const dateKey = `${year}-${month}-${day}`;
    
    setCompletedAssignments(prev => {
        const currentCompleted = prev[dateKey] || [];
        const isCompleted = currentCompleted.includes(index);
        
        const newCompletedAssignments = isCompleted ? {
            ...prev,
            [dateKey]: currentCompleted.filter(i => i !== index)
        } : {
            ...prev,
            [dateKey]: [...currentCompleted, index]
        };
        
        // Save to backend
        const userId = localStorage.getItem('userId');
        fetch('http://localhost:5000/api/completed', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, completedAssignments: newCompletedAssignments })
        }).catch(err => console.error('Error saving completed:', err));
        
        return newCompletedAssignments;
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
    const handleClassProgress = () => {
        console.log('Class progress pressed');
        navigate('/SemesterProgress', {
            state: {
                assignments: assignments,
                classes: classes,
                completedAssignments: completedAssignments
            }
        });
    }
    //add assignments button
    const handleAddAssignments = () => {
        console.log('Add assignments clicked');
        navigate('/AddAssignmentsSemester', {
            state: {
                assignments: assignments,
                classes: classes,
                completedAssignments: completedAssignments,
                returnTo: 'daily' //if it's daily, return to this page. If it's weekly or monthly, return to those pages
            }
        });
    }
    

    return (
        <div>
            <div className="navigationBtnContainer"> 
                <div className="prevNextBtn">
                    <button onClick={handlePrevDay}>&larr; Prev</button> 
                    <button onClick={handleNextDay}>Next &rarr;</button>
                    <button className="addAssignments" onClick={handleAddAssignments}>+ Assignments</button>
                </div>
                <div className="differentViewBtn">
                    <button disabled>Day View</button>
                    <button onClick={handleWeekView}>Week View</button>
                    <button onClick={handleMonthView}>Month View</button>
                    <button onClick={handleClassProgress}>Progress</button>
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



