import './Login.css' 
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleLogin = async (e) => { 
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (data.success) {
                localStorage.setItem('userId', username);
                const assignmentsRes = await fetch(`http://localhost:5000/api/assignments/${data.userId}`);
                const assignmentsData = await assignmentsRes.json();
                navigate('/DailyToDo', {
                    state: {
                        assignments: assignmentsData.assignments || {},
                        classes: []
                    }
                });
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Server error. Please try again.');
            console.error(err);
        }
        // if (username.trim() === '' || password.trim() === '') {
        //     alert('Please fill in both username and password');
        //     return;
        // } else {
        //     console.log('Login clicked!')
        //     console.log("Username:", username);
        //     console.log("Password:", password);
        //     navigate('/AddOrView');
        // }
    };
    return (
        <div className="loginCard">
            <p>Login to Assignment Tracker</p>
            <div className="formArea">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required value={username} onChange={(e) => setUsername(e.target.value)} />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="loginBtn" onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login;

//Later add in storing stuff.