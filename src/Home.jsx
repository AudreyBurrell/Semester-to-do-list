import './Home.css'
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const handleLogin = () => { //for now when either of these buttons are clicked, just move on. Make the backend later.
        console.log("Login clicked!");
        navigate('/Login');
    };
    const handleCreateAccount = () => {
        console.log("Create Account clicked!")
        navigate('/CreateAccount');
    };
    return (
        <div className = "mainCard">
            <h1> Welcome to Assignment Tracker </h1>
            <p> Track all your college assignments here! </p>
            <div className = "buttonContainer">
                <button id="loginBtn" onClick={handleLogin}>Login</button>
                <button id="createAccountBtn"onClick={handleCreateAccount}>Create Account</button>
            </div>
        </div>
    );
}

export default Home;