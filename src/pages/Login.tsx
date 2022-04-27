import React from 'react'
import { useLocation } from 'react-router-dom'


function Login() {

    const location: any = useLocation()

    return (
        <div>
            <h1>
                Login Page
            </h1>
            <h2>
                {location.state?.id}
            </h2>
        </div>
    )
}

export default Login