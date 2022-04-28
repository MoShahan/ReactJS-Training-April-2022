import React from 'react'
import { Link } from 'react-router-dom'
import "./HomePage.css"

function HomePage() {
    return (
        <div>
            <h1>
                Welcome to the HomePage
            </h1>
            <Link to="/main">
                <button className='mainPage-button'>
                    Go To MAIN Page
                </button>
            </Link>
            <div className="login-reg-container">
                <Link to="/login" state={{id:"786"}}>
                    <button className="login-button">
                        Go to LOGIN page
                    </button>
                </Link>
                <Link to="/register/default">
                    <button className="reg-button">
                        Go to REGISTRATION Page
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default HomePage