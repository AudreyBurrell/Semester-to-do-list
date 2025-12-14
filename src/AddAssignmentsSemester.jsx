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

    return (
        <div>
            <div className = "header"> 
                {/* everything will appear at the top of the screen. Instructions on the left side, button on the right side of the screen */}
                <h3>Manually enter in items for the semester or upload a CSV. </h3> 
                <button id="CSVBtn"> Upload CSV </button>
            </div>
            <div className = "manualEnterArea">
                <div className="dateArea">
                    {/* those two forms appear next to each other near the top of the manual enter area and above every other manual enter item.  */}
                    <form>
                        <label htmlFor="dueDate">Due Date:</label>
                        <input type="date" id="dueDate" name="dueDate" required/>
                    </form>
                    <form>
                        <label htmlFor="startDate">Start Date (optional):</label>
                        <input type="date" id="startDate" name="startDate"/>
                    </form>
                </div>
                <div className="selectClassArea">
                    <div className="assignmentNameArea">
                        <label htmlFor="assignmentName">Assignment Name:</label>
                        <input type="text" id="assignmentName" name="assignmentName" required/>
                    </div>
                    {/* The buttons appear all next to each other */}
                    <p id="selectAClassInstruction">Select a class:</p>
                    {/* this area will just have a bunch of buttons with different classes that have already been entered and their outline being the color that the user suggested. Next to these buttons is a button where the user can add a class, which will bring up a popup of a form where they enter class name and choose a color */}
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
                    {/*Space where the list item shows (displays the date it's due, date student should start, item in corresponding color) */}
                    {/*Add to list button*/}
                    <div className="itemPreview">
                        <p>Item preview will appear here.</p>
                    </div>
                    <button className="addToListBtn">Add to List</button>
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
