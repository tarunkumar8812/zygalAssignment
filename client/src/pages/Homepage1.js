import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import Cookies from 'js-cookie';


const Homepage1 = () => {
    const navigate = useNavigate()
    const [credendials, setCredentials] = useState({
        email: "", password: ""
    })

    const handleChange = (e) => {

        setCredentials({ ...credendials, [e.target.name]: e.target.value })
    }

    const handleLogin = async (e) => {
        e.preventDefault()

        await axios.post("http://localhost:3001/api/user/login", {
            email: credendials.email, password: credendials.password
        }).then((response) => {

            if (response.status === 200) {
                Cookies.set('token', response?.data?.token);
                navigate("/homepage2")
            } else {
                alert(response.data.message)
                navigate("/homepage1")
            }

        }, (error) => {
            alert("Wrong credentials!!")
            navigate("/homepage1")
        });
    }

    return (
        <>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor='email'>email :- </label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        required
                        // pattern=''
                        placeholder='example@gmail.com'
                        onChange={handleChange}
                    ></input>
                </div>
                <div>
                    <label htmlFor='password'>password :- </label>
                    <input
                        type='text'
                        id='password'
                        name='password'
                        required
                        // pattern=''
                        placeholder='password'
                        onChange={handleChange}
                    ></input>
                </div>

                <button type='submit'>Login</button>
            </form>
        </>
    )
}

export default Homepage1