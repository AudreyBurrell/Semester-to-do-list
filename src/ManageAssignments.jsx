import './ManageAssignments.css' 
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

function ManageAssignments() {
    const location = useLocation();
    const { assignments, classes, completedAssignments } =  location.state || { assignments: {}, classes: [], completedAssignments: {} };
    console.log('Entering manage assignments');
    console.log('Received assignments:', assignments);
    console.log('Completed assignments:', completedAssignments);
    console.log('Received classes:', classes); 

    //determinging the user's classes (the same function as semester progress)
    const getClassesFromAssignments = (assignments) => {
        const classesMap = new Map();
        Object.values(assignments).forEach(assignmentsForDate => {
            assignmentsForDate.forEach(assignment => {
                if(assignment.className && assignment.color) {
                    classesMap.set(assignment.className, {
                        name: assignment.className
                    });
                }
            });
        });
        return Array.from(classesMap.values());
    }
    const classNames = getClassesFromAssignments(assignments);
    console.log(classNames);
    //dropdown for the classes
    const [selectedClass, setSelectedClass] = useState('');
    const handleClassChange = (e) => {
        setSelectedClass(e.target.value);
        console.log('Selected class:', e.target.value);
    }

    
    return (
        <div>
            <div className = "header"> 
                <button id="backBtn">&larr; Back</button>
                <h3>Manage Assignments </h3> 
            </div>
            <div className="backgroundCard">
                {classNames.length === 0 ? (
                    <p>No Data</p>
                ) : (
                    <div className="manageAssignmentArea">
                        <label htmlFor="classSelect" className="classSelectLabel">
                            Select Class:
                        </label>
                        <div class="dropdownContainer">
                                <select 
                                    id="classSelect" 
                                    className="classDropdown"
                                    value={selectedClass}
                                    onChange={handleClassChange}
                                >
                                    <option value="">Choose a class...</option>
                                    {classNames.map((classItem) => (
                                        <option key={classItem.name} value={classItem.name}>
                                            {classItem.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {selectedClass && (
                                <p>Showing assignments for: <strong>{selectedClass}</strong></p>
                            )}
                    </div>
                )}

            </div>


        </div>
    )
}

export default ManageAssignments;