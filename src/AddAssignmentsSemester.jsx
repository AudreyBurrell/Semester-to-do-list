import './AddAssignmentsSemester.css'

function AddAssignmentsSemester() {
    //functions for the buttons goes here
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
                    {/* The buttons appear all next to each other */}
                    {/* this area will just have a bunch of buttons with different classes that have already been entered and their outline being the color that the user suggested. Next to these buttons is a button where the user can add a class, which will bring up a popup of a form where they enter class name and choose a color */}
                    <button className="addClass">+ Add Class</button>
                </div>
                <div classname="assignmentNameArea">
                    <label htmlFor="assignmentName">Assignment Name:</label>
                    <input type="text" id="assignmentName" name="assignmentName" required/>
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
