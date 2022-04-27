import React from 'react'
import { useParams } from 'react-router-dom'

function Register() {

    const pathParams = useParams()

    return (
        <div>
            <h1>
                Registration Page
            </h1>
            <h2>
                {pathParams.uuid}
            </h2>
        </div>
    )
}

export default Register