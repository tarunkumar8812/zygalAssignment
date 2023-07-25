import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import Cookies from 'js-cookie';
const Homepage2 = () => {
    const navigate = useNavigate()
    const [message, setMessage] = useState('')
    const [search, setSearch] = useState('')
    const [data, setData] = useState('')



    useEffect(() => {
        const token = Cookies.get('token')
        if (!token) {
            navigate('/homepage1')
            alert("you are not login!")
        }

    }, [message, search])


    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:3001/api/user/sendMessage", {
            token: Cookies.get('token')
        }).then((response) => {

            if (response.status === 200) {
                const msg = Cookies.get('messages')
                const newMsg = (msg || "") + '+' + message
                Cookies.set('messages', newMsg, { expires: 7 });
            } else {
                alert(response.data.message)
                navigate("/homepage1")
            }

        }, (error) => {
            alert(error.message)
            navigate("/homepage1")

        });
    }

    const handleSearch = async (e) => {
        e.preventDefault()

        await axios.post("http://localhost:3001/api/user/searchMessage", {
            token: Cookies.get('token')
        }).then((response) => {

            if (response.status === 200) {
                const msg = Cookies.get('messages').split("+")
                const result = msg.map(item => {
                    if (item.includes(search)) {
                        return item
                    }
                }).filter(item => item !== undefined)
                setData(result || 'no data found')
            } else {
                alert(response.data.message)
                navigate("/homepage1")
            }

        }, (error) => {
            alert(error.message)
            navigate("/homepage1")

        });

    }

    const handleClear = async (e) => {

        await axios.post("http://localhost:3001/api/user/clearAllMessage", {
            token: Cookies.get('token')
        }).then((response) => {

            if (response.status === 200) {
                Cookies.remove('messages')
                document.location.reload()
            } else {
                alert(response.data.message)
                navigate("/homepage1")
            }

        }, (error) => {
            alert(error.message)
            navigate("/homepage1")

        });
    }

    const handleLogout = async (e) => {

        await axios.post("http://localhost:3001/api/user/logout", {
            token: Cookies.get('token')
        }).then((response) => {

            if (response.status === 200) {
                Cookies.remove('token')
                document.location.reload()
                navigate("/homepage1")
            } else {
                alert(response.data.message)
                navigate("/homepage1")
            }

        }, (error) => {
            alert(error.message)
            navigate("/homepage1")

        });
    }

    return (
        <>
            {/* to save the message */}
            <div>
                <label htmlFor='message'>Write Text Message :- </label>
                <input
                    type='message'
                    id='message'
                    name='message'
                    value={message}
                    required
                    placeholder='Type your message hear...'
                    onChange={(e) => { setMessage(e.target.value) }}
                ></input>
            </div>
            <button type='submit' onClick={handleSubmit}>Submit Message</button>

            <br />

            <div>
                <label htmlFor='SearchMessage'>Search Text Message :- </label>
                <input
                    type='SearchMessage'
                    id='SearchMessage'
                    name='SearchMessage'
                    value={search}
                    required
                    placeholder='search here...'
                    onChange={(e) => { setSearch(e.target.value) }}
                ></input>
            </div>
            <button type='submit' onClick={handleSearch}>Search</button>

            <br />
            <br />


            <div>
                <label htmlFor='textarea'>result Message :- </label>
                <br />
                <textarea
                    rows={10}
                    cols={50}
                    id='textarea'
                    name='SearchMessage'
                    readOnly
                    value={data}
                    placeholder='no data found'

                ></textarea>
            </div>
            <button type='submit' onClick={handleClear}>Clear All</button>
            <br />
            <br />
            <br />
            <button type='submit' onClick={handleLogout}>Logout</button>
        </>
    )
}

export default Homepage2