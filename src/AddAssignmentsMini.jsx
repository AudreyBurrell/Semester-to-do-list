import './AddAssignmentsSemester.css';
import { useState } from 'react';  
import { useNavigate, useLocation } from 'react-router-dom'; 

function AddAssignmentsMini() {
    //fetching from state
    const location = useLocation();
    const { assignments, classes, completedAssignments, returnTo } = location.state || { 
        assignments: {}, 
        classes: [], 
        completedAssignments: {}, 
        returnTo: 'daily' 
    };
    console.log('Entering add assignments mini');
    console.log('Received assignments:', assignments);
    console.log('Received classes:', classes); 
    console.log('Return to:', returnTo);

    // Initialize local state with passed-in values
    const [localClasses, setLocalClasses] = useState(classes);
    const [assignmentsList, setAssignmentsList] = useState(assignments);
    const [showAddClassForm, setShowAddClassForm] = useState(false);
    const [newClassName, setNewClassName] = useState('');
    const [selectedColor, setSelectedColor] = useState('#4caf50');
    const [selectedClass, setSelectedClass] = useState(null);
    const [dueDate, setDueDate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [assignmentName, setAssignmentName] = useState('');

    const colorOptions = [
        { name: 'Red', value: '#f44336' },
        { name: 'Pink', value: '#e91e63' },
        { name: 'Yellow', value: '#ff9800'},
        { name: 'Orange', value: '#ff7043' },
        { name: 'Green', value: '#4caf50' },
        { name: 'Teal', value: '#009688' },
        { name: 'Cyan', value: '#00bcd4'},
        { name: 'Blue', value: '#2196f3' },
        { name: 'Indigo', value: '#3f51b5'},
        { name: 'Purple', value: '#9c27b0'},
        { name: 'Brown', value: '#795548'},
        { name: 'Gray', value: '#757575'},
        { name: 'Black', value: '#000'}
    ];

    const navigate = useNavigate();

    // Back button - doesn't save changes
    const handleBackBtn = () => {
        console.log('Back button pressed - discarding changes');
        if (returnTo === "daily") {
            navigate('/DailyToDo', {
                state: {
                    assignments: assignments,  // Original assignments
                    classes: classes,  // Original classes
                    completedAssignments: completedAssignments
                }
            });
        }
        if (returnTo === "weekly") {
            navigate('/WeekToDo', {
                state: {
                    assignments: assignments,
                    classes: classes,
                    completedAssignments: completedAssignments
                }
            });
        }
        if (returnTo === "monthly") {
            navigate('/MonthToDo', {
                state: {
                    assignments: assignments,
                    classes: classes,
                    completedAssignments: completedAssignments
                }
            });
        }
    };

    // Done button - saves changes
    const handleDone = () => {
        console.log('Done adding assignments - saving changes');
        if (returnTo === "daily") {
            navigate('/DailyToDo', {
                state: {
                    assignments: assignmentsList,  // Updated assignments
                    classes: localClasses,  // Updated classes
                    completedAssignments: completedAssignments
                }
            });
        }
        if (returnTo === "weekly") {
            navigate('/WeekToDo', {
                state: {
                    assignments: assignmentsList,
                    classes: localClasses,
                    completedAssignments: completedAssignments
                }
            });
        }
        if (returnTo === "monthly") {
            navigate('/MonthToDo', {
                state: {
                    assignments: assignmentsList,
                    classes: localClasses,
                    completedAssignments: completedAssignments
                }
            });
        }
    };

    // Class management
    const handleAddClassClick = () => {
        setShowAddClassForm(!showAddClassForm);
    };

    const handleSaveClass = () => {
        if (newClassName.trim()) {
            const newClass = {
                id: Date.now(), 
                name: newClassName,
                color: selectedColor
            };
            setLocalClasses([...localClasses, newClass]);
            setNewClassName('');
            setSelectedColor('#4caf50');
            setShowAddClassForm(false);
        }
    };

    const handleCancelAddClass = () => {
        setNewClassName('');
        setSelectedColor('#4caf50');
        setShowAddClassForm(false);
    };

    const handleClassSelect = (classId) => {
        setSelectedClass(classId);
    };

    // Add assignment to list
    const handleAddToList = () => {
        if (!assignmentName.trim() || !dueDate || !selectedClass) {
            alert('Please fill in Assignment Name, Due Date, and select a Class');
            return;
        }

        const selectedClassObj = localClasses.find(c => c.id === selectedClass);
        const assignmentData = {
            id: Date.now(),
            name: assignmentName,
            color: selectedClassObj.color,
            className: selectedClassObj.name
        };

        const newAssignmentsList = {...assignmentsList};

        if (startDate && startDate <= dueDate) {
            const start = new Date(startDate);
            const end = new Date(dueDate);
            for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
                const dateKey = date.toISOString().split('T')[0];
                if (!newAssignmentsList[dateKey]){
                    newAssignmentsList[dateKey] = [];
                }
                newAssignmentsList[dateKey].push({...assignmentData});
            }
        } else {
            if (!newAssignmentsList[dueDate]) {
                newAssignmentsList[dueDate] = [];
            }
            newAssignmentsList[dueDate].push(assignmentData);
        }

        setAssignmentsList(newAssignmentsList);
        console.log(newAssignmentsList);

        // Clear the form
        setAssignmentName('');
        setDueDate('');
        setStartDate('');
        setSelectedClass(null);
    };

    const hasNewAssignments = Object.keys(assignmentsList).length > Object.keys(assignments).length;

    return (
        <div>
            <div className="header"> 
                <button className="backBtn" onClick={handleBackBtn}>&larr; Back</button> 
                <h3>Enter in Items</h3>
            </div>
            <div className="manualEnterArea">
                <div className="dateArea">
                    <form>
                        <label htmlFor="dueDate">Due Date:</label>
                        <input type="date" id="dueDate" name="dueDate" required value={dueDate} onChange={(e) => setDueDate(e.target.value)}/>
                    </form>
                    <form>
                        <label htmlFor="startDate">Start Date (optional):</label>
                        <input type="date" id="startDate" name="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
                    </form>
                </div>
                <div className="selectClassArea">
                    <div className="assignmentNameArea">
                        <label htmlFor="assignmentName">Assignment Name:</label>
                        <input type="text" id="assignmentName" name="assignmentName" required value={assignmentName} onChange={(e) => setAssignmentName(e.target.value)}/>
                    </div>
                    <p id="selectAClassInstruction">Select a class:</p>
                    <div className="classButtonsContainer">
                        {localClasses.map((classItem) => (
                            <button
                                key={classItem.id}
                                className={`classButton ${selectedClass === classItem.id ? 'selectedClass' : ''}`}
                                style={{
                                    borderColor: classItem.color,
                                    color: selectedClass === classItem.id ? 'white' : classItem.color,
                                    backgroundColor: selectedClass === classItem.id ? classItem.color : 'white'
                                }}
                                onClick={() => handleClassSelect(classItem.id)}
                            >
                                {classItem.name}
                            </button>
                        ))}
                    </div>
                    <button className="addClass" onClick={handleAddClassClick}>+ Add Class</button>
                    {showAddClassForm && (
                        <div className="addClassForm"> 
                            <input type="text" placeholder="Class name" value={newClassName} onChange={(e) => setNewClassName(e.target.value)} />
                            <div className="colorPickerArea">
                                <label>Choose color:</label>
                                <div className="colorOptions">
                                    {colorOptions.map((color) => (
                                        <div 
                                            key={color.value} 
                                            className={`colorOption ${selectedColor === color.value ? 'selected' : ''}`} 
                                            style={{ backgroundColor: color.value }} 
                                            onClick={() => setSelectedColor(color.value)} 
                                            title={color.name} 
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="addOrCancelClassBtn">
                                <button onClick={handleCancelAddClass}>Cancel</button>
                                <button onClick={handleSaveClass}>Save</button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="checkingArea">
                    <div className="itemPreview">
                        {assignmentName || dueDate || selectedClass ? (
                            <div className="previewContent">
                                <h4>Preview:</h4>
                                {assignmentName && <p className="previewAssignment">{assignmentName}</p>}
                                {dueDate && <p className="previewDate">Due: {dueDate}</p>}
                                {startDate && <p className="previewDate">Start: {startDate}</p>}
                                {selectedClass && (
                                    <p
                                        className="previewClass"
                                        style={{ color: localClasses.find(c => c.id === selectedClass)?.color }}
                                    >
                                        {localClasses.find(c => c.id === selectedClass)?.name}
                                    </p>
                                )}
                            </div>
                        ) : (
                            <p>Item preview will appear here.</p>
                        )}
                    </div>
                    <button className="addToListBtn" onClick={handleAddToList}>Add to List</button>
                </div>
            </div>
            <div className="navigationArea">
                <button className="goToTodoListBtn" onClick={handleDone}>Done &rarr;</button>
            </div>
        </div>
    );
}

export default AddAssignmentsMini;

//when the back button is pressed, if there has been any assignments added, a popup should appear that says exit with or without adding those items to the list
//If I were to do a CSV, the user would need to know to just update their original CSV and put it in (or maybe I could just add what it gets from?)