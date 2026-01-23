import './AddAssignmentsSemester.css'
import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function AddAssignmentsSemester() {
    // Receive state from navigation
    const location = useLocation();
    const { assignments: passedAssignments, classes: passedClasses, completedAssignments, returnTo } = location.state || { 
        assignments: {}, 
        classes: [], 
        completedAssignments: {},
        returnTo: null 
    };

    // Initialize with passed data if available
    const [classes, setClasses] = useState(passedClasses || []);
    const [assignmentsList, setAssignmentsList] = useState(passedAssignments || {});
    
    const [showAddClassForm, setShowAddClassForm] = useState(false);
    const [newClassName, setNewClassName] = useState('');
    const [selectedColor, setSelectedColor] = useState('#4caf50');
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

    // Item preview stuff
    const [dueDate, setDueDate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [assignmentName, setAssignmentName] = useState('');

    // Add to list button stuff
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
        // Clearing the form
        setAssignmentName('');
        setDueDate('');
        setStartDate('');
        setSelectedClass(null);
    };

    // CSV popup stuff
    const [showCSVPopup, setShowCSVPopup] = useState(false);
    const handleCSVClick = () => {
        setShowCSVPopup(!showCSVPopup);
    };

    // The actual uploading and parsing of the CSV stuff
    const fileInputRef = useRef(null);
    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            parseCSV(text);
        };
        reader.readAsText(file);
    };

    const parseCSV = text => {
        const lines = text.trim().split('\n');
        if (lines.length < 2) {
            alert('CSV file is empty or invalid');
            return;
        }
        const headers = lines[0].split(',').map(h => h.trim());
        const nameIndex = headers.findIndex(h => h.toLowerCase().includes('assignment'));
        const dueDateIndex = headers.findIndex(h => h.toLowerCase().includes('due'));
        const startDateIndex = headers.findIndex(h => h.toLowerCase().includes('start'));
        const classNameIndex = headers.findIndex(h => h.toLowerCase().includes('class'));
        const colorIndex = headers.findIndex(h => h.toLowerCase().includes('color'));
        const newClasses = [...classes];
        const newAssignmentsList = {...assignmentsList};

        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',').map(v => v.trim());
            if (values.length < 2) continue; 
            const assignmentName = values[nameIndex];
            const dueDate = convertDateFormat(values[dueDateIndex]);
            const startDate = values[startDateIndex] ? convertDateFormat(values[startDateIndex]) : null;
            const className = values[classNameIndex];
            const colorName = values[colorIndex];
            let classObj = newClasses.find(c => c.name.toLowerCase() === className.toLowerCase());
            if (!classObj) {
                const colorOption = colorOptions.find(c => c.name.toLowerCase() === colorName?.toLowerCase());
                const newColor = colorOption ? colorOption.value : '#4caf50';
                classObj = {
                    id: Date.now() + Math.random(),
                    name: className,
                    color: newColor
                };
                newClasses.push(classObj);
            }
            const assignmentData = {
                id: Date.now() + Math.random(),
                name: assignmentName,
                color: classObj.color,
                className: classObj.name
            };
            if (startDate && startDate <= dueDate) {
                const start = new Date(startDate + 'T00:00:00');
                const end = new Date(dueDate + 'T00:00:00');
                for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                    const dateKey = d.toISOString().split('T')[0];
                    if (!newAssignmentsList[dateKey]) {
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
        }
        setClasses(newClasses);
        setAssignmentsList(newAssignmentsList);
        console.log(newAssignmentsList);
        setShowCSVPopup(false);
        alert('CSV uploaded successfully!');
    }

    const convertDateFormat = (dateStr) => {
        if (dateStr.includes('-')) {
            return dateStr;
        }
        const [month, day, year] = dateStr.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    };

    // Continue to to-do list code
    const hasAssignments = Object.keys(assignmentsList).length > 0;
    const navigate = useNavigate();
    
    const handleGoToList = () => {
        console.log('Navigating to to-do list with:', assignmentsList);
        
        const navigationState = {
            assignments: assignmentsList,
            classes: classes,
            completedAssignments: completedAssignments || {}
        };
        
        if (returnTo === 'daily') {
            navigate('/DailyToDo', { state: navigationState });
        } else if (returnTo === 'weekly') {
            navigate('/WeekToDo', { state: navigationState });
        } else if (returnTo === 'monthly') {
            navigate('/MonthToDo', { state: navigationState });
        } else {
            // Default to DailyToDo if no returnTo specified
            navigate('/DailyToDo', { state: navigationState });
        }
    }

    return (
        <div>
            <div className = "header"> 
                <h3>Manually enter in items for the semester or upload a CSV. </h3> 
                <button id="CSVBtn" onClick={handleCSVClick}> Upload CSV </button>
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
            {(hasAssignments || returnTo) && (
                <div className="navigationArea">
                    <button className="goToTodoListBtn" onClick={handleGoToList}> Go to To-Do List &rarr; </button>
                </div>
            )}
            {showCSVPopup && (
                <div className="popupOverlay">
                    <div className="CSVPopup">
                        <p>
                            <a href="https://docs.google.com/spreadsheets/d/1YxQ1XzAJDLQyaSTI2jshmNz32ysJCn3JR-idrP872zM/edit?usp=sharing" target="_blank" rel="noopener noreferrer">Copy</a>
                            {' '} the Assignment Tracker template to begin.
                        </p>
                        <p> Download it into a CSV and upload here </p>
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept=".csv"
                            style = {{ display: 'none' }}
                            onChange={handleFileSelect}
                        />
                        <div className="uploadCSVBtnContainer">
                            <button className="closeUploadCSV" onClick={handleCSVClick}>Close</button>
                            <button className="uploadCSVBtn" onClick={handleUploadClick}>Upload</button>
                        </div>
                    </div>
                </div>
            )}
        </div>  
    )
}

export default AddAssignmentsSemester;

