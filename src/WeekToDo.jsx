import './WeekToDo.css' 
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

function WeekToDo() {
    return (
        <div>
            <div className="navigationBtnContainer">
                <div className="prevNextBtn">
                    <button>&larr; Prev</button> 
                    <button>Next &rarr;</button>
                </div>
                <div className="differentViewBtn">
                    <button>Day View</button>
                    <button disabled>Week View</button>
                    <button>Month View</button>
                </div>
            </div>
            <div className="dayCardContainer">
                <div className="sundayCard">
                    <h4>Sunday</h4> 
                    {/*Display the mm/dd/year date for sunday here*/}
                    {/*the items that are for Sunday*/}
                </div>
                <div className="mondayCard">
                    <h4>Monday</h4>
                </div>
                <div className="tuesdayCard">
                    <h4>Tuesday</h4>
                </div>
                <div className="wednesdayCard">
                    <h4>Wednesday</h4>
                </div>
                <div className="thursdayCard">
                    <h4>Thursday</h4>
                </div>
                <div className="fridayCard">
                    <h4>Friday</h4>
                </div>
                <div className="saturdayCard">
                    <h4>Saturday</h4>
                </div>
            </div>
        </div>
    )
}

export default WeekToDo; 

//things that I want
//Display with 7 cards, each one labeled with the days of the week
//Under the display is a few assignments that are due (if there are more than 3 on that day, include 3 and at the bottom add +#)
//The user can just view it, they can't change it directly unless they are in daily to do
//EXPERIMENT: does checking off an item in daily to do remove it from weekly view?