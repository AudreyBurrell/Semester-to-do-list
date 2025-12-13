function Home() {
    return (
        <div className = "mainCard">
            <h1> Welcome to Assignment Tracker </h1>
            <p> Track all your college assignments here! </p>
            <div className = "buttonContainer">
                <button id="loginBtn">Login</button>
                <button id="createAccountBtn">Create Account</button>
            </div>
        </div>
    );
}

export default Home;