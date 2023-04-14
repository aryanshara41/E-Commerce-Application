import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import { isUserPresent } from '../services/actions/isUserPresentAction';

const Login = () => {



    const [pass, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const notify = (data) => toast(data);

    const handleLogin = async () => {

        if (pass === '' || email === '') {
            notify("Please Enter the valid details");
            return;
        }

        // request to the login api
        const response = await axios.post('/api/login', {
            email: `${email}`,
            password: `${pass}`
        });

        console.log(response);

        setPassword('');
        setEmail('');

        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            dispatch(isUserPresent());
            navigate('/');
        } else {
            notify(response.data.message);
        }
    }

    return (
        <>
            <ToastContainer />
            <Container style={{ width: '18rem', border: '2px solid green', display: 'flex', flexDirection: 'column' }} className='my-4 gap-4 p-4 rounded'>
                <input style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '0px', backgroundColor: 'lightgrey' }} type='email' placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} />
                <input style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '0px', backgroundColor: 'lightgrey' }} type='text' placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} />
                {/* <input style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '0px', backgroundColor: 'lightgrey' }} type='text' placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} /> */}
                <Button variant="success" onClick={handleLogin}>LOGIN</Button>{' '}
            </Container>
        </>
    )
}

export default Login