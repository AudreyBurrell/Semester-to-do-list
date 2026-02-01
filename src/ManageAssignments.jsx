import './ManageAssignments.css' 
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

function ManageAssignments() {
    const navigate = useNavigate();
    const location = useLocation();
    const { assignments, classes, completedAssignments } =  location.state || { assignments: {}, classes: [], completedAssignments: {} };
    console.log('Entering manage assignments');
    console.log('Received assignments:', assignments);
    console.log('Completed assignments:', completedAssignments);
    console.log('Received classes:', classes); 

    //determining the user's classes
    const getClassesFromAssignments = (assignments) => {
        const classesMap = new Map();
        Object.values(assignments).forEach(assignmentsForDate => {
            assignmentsForDate.forEach(assignment => {
                if(assignment.className && assignment.color) {
                    classesMap.set(assignment.className, {
                        name: assignment.className,
                        color: assignment.color
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
    // Get assignments for selected class
    const getAssignmentsForClass = (className) => {
        const classAssignments = [];
        Object.entries(assignments).forEach(([date, assignmentsForDate]) => {
            assignmentsForDate.forEach((assignment, index) => {
                if (assignment.className === className) {
                    classAssignments.push({
                        ...assignment,
                        date: date,
                        originalIndex: index
                    });
                }
            });
        });
        return classAssignments;
    };
    const filteredAssignments = selectedClass ? getAssignmentsForClass(selectedClass) : [];
    const selectedClassColor = classNames.find(c => c.name === selectedClass)?.color || '#ccc';

    const handleEdit = (assignment) => {
        console.log('Edit assignment:', assignment);
        // TODO: Implement edit functionality
    };

    const handleDelete = (assignment) => {
        console.log('Delete assignment:', assignment);
        // TODO: Implement delete functionality
    };

    //navigating to the semester page
    const handleBack = () => {
        navigate('/AddAssignmentsSemester', {
            state: {
                assignments: assignments,
                classes: classes,
                completedAssignments: completedAssignments
            }
        });
    }

    return (
        <div>
            <div className="header"> 
                <button id="backBtn" onClick={handleBack}>&larr; Back</button>
                <h3>Manage Assignments</h3> 
            </div>
            <div className="backgroundCard">
                {classNames.length === 0 ? (
                    <p>No Data</p>
                ) : (
                    <div className="manageAssignmentArea">
                        <label htmlFor="classSelect" className="classSelectLabel">
                            Select Class:
                        </label>
                        <div className="dropdownContainer">
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
                            <div className="assignmentsSection">
                                <h4>Assignments for {selectedClass}</h4>
                                {filteredAssignments.length === 0 ? (
                                    <p>No assignments found for this class</p>
                                ) : (
                                    <div className="assignmentCards">
                                        {filteredAssignments.map((assignment, index) => (
                                            <div 
                                                key={index} 
                                                className="assignmentCard"
                                                style={{ borderLeftColor: selectedClassColor }}
                                            >
                                                <div className="assignmentInfo">
                                                    <span className="assignmentName">{assignment.name}</span>
                                                    <span className="assignmentDate">{assignment.date}</span>
                                                </div>
                                                <div className="assignmentActions">
                                                    <button 
                                                        className="editBtn"
                                                        onClick={() => handleEdit(assignment)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button 
                                                        className="deleteBtn"
                                                        onClick={() => handleDelete(assignment)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ManageAssignments;