import './AddOrView.css'
import { useNavigate } from 'react-router-dom';
//this page will just display instructions and two buttons: a button that leads to a place where they can manually import or import a CSV for start-of semester planning, and the other button leads straight to the to-do list.
//Maybe I can add something on the semester planning (like a date where the semester ends) and if the date when the semester ends hasn't passed, it just goes straight to the to-do list part if something has already been made for the semester.
function AddOrView() {
    const navigate = useNavigate();
    const handleAddItems = () => {
        console.log("Add items clicked");
        navigate('/AddAssignmentsSemester');
    } 
    const handleGoToList = () => {
        console.log("Go to list clicked");
        navigate('/DailyToDo');
    }
    return (
        <div className = "mainCard">
            <div className = "buttonContainer">
                <button id="addItemsBtn" onClick={handleAddItems}> Add Assignments </button>
                <button id="goToListBtn" onClick={handleGoToList}> Go To To-Do List </button>
            </div>
        </div>
    );
}

export default AddOrView;