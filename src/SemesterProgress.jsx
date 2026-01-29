import './SemesterProgress.css' 
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

function SemesterProgress() {
    const location = useLocation();
    const { assignments, classes, completedAssignments } =  location.state || { assignments: {}, classes: [], completedAssignments: {} };

    //STEPS:
    //determine how many classes the user has and what their colors are. Then just set up the progress bars
    //then determine how many assignments the user has in that class and how many they have completed and update the progress bars

    const getClassesFromAssignments = (assignments) => {
        const classesMap = new Map();
        Object.values(assignments).forEach(assignmentsForDate => {
            assignmentsForDate.forEach(assignment => {
                if(assignment.className && assignment.color) {
                    classesMap.set(assignment.className, {
                        id: assignment.className,
                        name: assignment.className,
                        color: assignment.color
                    });
                }
            });
        });
        return Array.from(classesMap.values());
    }
    const progressClasses = getClassesFromAssignments(assignments);



    const navigate = useNavigate();
    //navigation functions
    const handleDailyToDo = () => {
        navigate('/DailyToDo', {
            state: {
                assignments: assignments,
                classes: classes,
                completedAssignments: completedAssignments
            }
        });
    }
    const handleWeekToDo = () => {
        navigate('/WeekToDo', {
            state: {
                assignments: assignments,
                classes: classes,
                completedAssignments: completedAssignments
            }
        });
    }
    const handleMonthToDo = () => {
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
                    <button disabled>&larr; Prev</button> 
                    <button disabled>Next &rarr;</button>
                    <button disabled>+ Assignments</button>
                </div>
                <div className="differentViewBtn">
                    <button onClick={handleDailyToDo}>Day View</button>
                    <button onClick={handleWeekToDo}>Week View</button>
                    <button onClick={handleMonthToDo}>Month View</button>
                    <button disabled>Progress</button>
                </div>
            </div>
            <div className="backgroundCard">
                <h1>Progress</h1>
                <div className="progressContainer">
                    {progressClasses.length === 0 ? (
                        <p>No classes found in your assignments.</p>
                    ) : (
                        progressClasses.map(klass => (
                            <div key={klass.id} className="classProgress" style={{ borderLeftColor: klass.color }}>
                                <h3>{klass.name}</h3>
                                <div className="progressBar">
                                    <div className="progressFill" style={{ width: '0%' }}></div>
                                </div>
                                <span className="progressText">0 / 0 (0%)</span>
                            </div>
                        ))
                    )}
                </div>
            </div>



        </div>
    )
}

export default SemesterProgress; 