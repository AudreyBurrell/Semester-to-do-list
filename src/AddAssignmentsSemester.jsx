import './AddAssignmentsSemester.css'
import { useState } from 'react';  //Allows things to be updated and stored

function AddAssignmentsSemester() {
    //add class functionality stuff
    const [classes, setClasses] = useState([]); //classes is an array that holds all the classes the user has added, setClasses is a function to update that array, useState([]) starts as an empty array
    const [showAddClassForm, setShowAddClassForm] = useState(false); //controls whether the add form is visible
    const [newClassName, setNewClassName] = useState(''); //stores the class name
    const [selectedColor, setSelectedColor] = useState('#4caf50'); //stores the color, defaults to green
    const [selectedClass, setSelectedClass] = useState(null);
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
            setClasses([...classes, newClass]);
            setNewClassName(''); //resetting things because it's been added to the array
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
    //item preview stuff
    const [dueDate, setDueDate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [assignmentName, setAssignmentName] = useState('');
    //add to list button stuff
    const [assignmentsList, setAssignmentsList] = useState({});
    const handleAddToList = () => {
        if (!assignmentName.trim() || !dueDate || !selectedClass) {
            alert('Please fill in Assignment Name, Due Date, and select a Class');
            return;
        }
        const selectedClassObj = classes.find(c => c.id === selectedClass);
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
        //clearing the form
        setAssignmentName('');
        setDueDate('');
        setStartDate('');
        setSelectedClass(null);
    };
    //CSV popup stuff
    const [showCSVPopup, setShowCSVPopup] = useState(false);
    const handleCSVClick = () => {
        setShowCSVPopup(!showCSVPopup);
    };


    return (
        <div>
            <div className = "header"> 
                <h3>Manually enter in items for the semester or upload a CSV. </h3> 
                <button id="CSVBtn" onClick={handleCSVClick}> Upload CSV </button>
                {showCSVPopup && (
                    <div className="CSVPopup">
                        <p>
                            <a href="https://docs.google.com/spreadsheets/d/1YxQ1XzAJDLQyaSTI2jshmNz32ysJCn3JR-idrP872zM/edit?usp=sharing">Copy</a>
                            {' '} the Assignment Tracker template to begin.
                        </p>
                        <p> Download it into a CSV and upload here </p>
                        <button className="uploadCSVBtn">Upload CSV</button>
                    </div>
                )}
            </div>
            <div className = "manualEnterArea">
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
                                {dueDate && <p className="previewDate">Due: {new Date(dueDate).toLocaleDateString()}</p>}
                                {startDate && <p className="previewDate">Start: {new Date(startDate).toLocaleDateString()}</p>}
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
        </div>  
    )
}

export default AddAssignmentsSemester; 

//Storing:
//Every date is going to have a list.
//Each item in the list will be it's own list going in this order:
//Color, item (just the text that they inputted)
//When they put in a start date, the item will add to each date in the main list from start to finish
