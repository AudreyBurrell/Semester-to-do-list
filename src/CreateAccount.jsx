import './CreateAccount.css' 
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function CreateAccount() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [passwordOrig, setPasswordOrig] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [error, setError] = useState('');
    const handleCreateAccount = async (e) => {
        e.preventDefault();
        if (username.trim() === '' || passwordOrig.trim() === '' || passwordRepeat.trim() === '') {
            alert('Please fill out all fields.');
            return;
        } 
        if (passwordOrig !== passwordRepeat) {
            alert('Passwords unequal');
            return;
        }
        try {
            const response = await fetch('http://localhost:5000/create-account', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password: passwordOrig })
            });
            const data = await response.json();
            if (data.success) {
                navigate('/AddOrView');
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Server error. Please try again.');
            console.error(err);
        }
        // if (username.trim() === '' || passwordOrig.trim() === '' || passwordRepeat.trim() === '') {
        //     alert('Please fill out all fields.');
        //     return;
        // } 
        // if (passwordOrig !== passwordRepeat) {
        //     alert('Passwords unequal');
        //     return;
        // }
        // console.log('Create account clicked!');
        // console.log('Username:', username);
        // console.log('Password:', passwordOrig);
        // navigate('/AddOrView');
    };

    return (
        <div className="createAccountCard">
            <p>Create Account</p>
            <div className="formArea">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required value={username} onChange={(e) => setUsername(e.target.value)}/>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password1" name="password1" required value={passwordOrig} onChange={(e) => setPasswordOrig(e.target.value)} />
                <label htmlFor="passwordRepeat">Repeat Password:</label>
                <input type="password" id="password2" name="password2" required value={passwordRepeat} onChange={(e) => setPasswordRepeat(e.target.value)} />
            </div>
            <button className="createAccountBtn" onClick={handleCreateAccount}>Create Account</button>
        </div>
    )
}

export default CreateAccount;