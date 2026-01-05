import './AddAssignmentsMini.css';
import { useState, useRef } from 'react';  
import { useNavigate, useLocation } from 'react-router-dom'; 

function AddAssignmentsMini() {
    //fetching from state
    const location = useLocation();
    const { assignments, classes, completedAssignments, returnTo } =  location.state || { assignments: {}, classes: [], completedAssignments: {}, returnTo: '' };
    console.log('Entering add assignments mini');
    console.log('Received assignments:', assignments);
    console.log('Received classes:', classes); 
    console.log('Return to:', returnTo);

    //back button
    const navigate = useNavigate();
    const handleBackBtn = () => {
        console.log('Back button pressed');
        //daily
        if (returnTo === "daily") {
            navigate('/DailyToDo', {
                state: {
                    assignments: assignments,
                    classes: classes,
                    completedAssignments: completedAssignments
                }
            });
        }
        //weekly
        if (returnTo === "weekly") {
            navigate('/WeekToDo', {
                state: {
                    assignments: assignments,
                    classes: classes,
                    completedAssignments: completedAssignments
                }
            });
        }
        //monthly
        if (returnTo === "monthly") {
            navigate('/MonthToDo', {
                state: {
                    assignments: assignments,
                    classes: classes,
                    completedAssignments: completedAssignments
                }
            });
        }
    }



    return (
        <div>
            <div className = "header"> 
                <button className="backBtn" onClick={handleBackBtn}>&larr; Back</button> 
                <h3>Enter in Items</h3>
            </div>
            {/* <div className = "manualEnterArea">
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
                        {classes.map((classItem) => (
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
                            <input type="text" placeholder = "Class name" value = {newClassName} onChange={(e) => setNewClassName(e.target.value)} />
                            <div className="colorPickerArea">
                                <label>Choose color:</label>
                                <div className="colorOptions">
                                    {colorOptions.map((color) => (
                                        <div key={color.value} className={`colorOption ${selectedColor === color.value ? 'selected' : ''}`} style={{ backgroundColor: color.value }} onClick={() => setSelectedColor(color.value)} title={color.name} />
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
                <div className = "checkingArea">
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
                                        style={{ color: classes.find(c => c.id === selectedClass)?.color }}
                                    >
                                        {classes.find(c => c.id === selectedClass)?.name}
                                    </p>
                                )}
                            </div>
                        ) : (
                            <p>Item preview will appear here.</p>
                        )
                        }
                    </div>
                    <button className="addToListBtn" onClick={handleAddToList}>Add to List</button>
                </div>
            </div>
            <div className="navigationArea">
                <button className="goToTodoListBtn" onClick={handleGoToList}> Go to To-Do List &rarr; </button>
            </div> */}

        </div> //don't delete this, everything goes above this
    )

}

export default AddAssignmentsMini; 

//when the back button is pressed, if there has been any assignments added, a popup should appear that says exit with or without adding those items to the list
//If I were to do a CSV, the user would need to know to just update their original CSV and put it in (or maybe I could just add what it gets from?)