import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
    const notify = (message) => toast(message + " Please try again");
    const [name, setName] = useState('');
    const [pass, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {

        // check if email or password or username is not empty
        if (email === '' || pass === '' || name === '') {
            notify("Enter enter the valid details ");
            return;
        }

        const { data } = await axios.post('/api/register', {
            name: `${name}`,
            email: `${email}`,
            password: `${pass}`
        });

        setName('');
        setEmail('');
        setPassword('');

        if (data.user) {
            navigate('/login')
        }
        else {
            toast(data.message);
        }

        // localStorage.setItem('token', data.token );
        // redirect to the login page

    }

    return (
        <>
            <ToastContainer />
            <Container style={{ width: '18rem', border: '2px solid green', display: 'flex', flexDirection: 'column' }} className='my-4 gap-4 p-4 rounded'>
                <input style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '0px', backgroundColor: 'lightgrey' }} type='text' placeholder='Enter your name' onChange={(e) => setName(e.target.value)} value={name} />
                <input style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '0px', backgroundColor: 'lightgrey' }} type='email' placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} value={email} />
                <input style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '0px', backgroundColor: 'lightgrey' }} type='password' placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} value={pass} />
                <Button variant="success" onClick={handleRegister} >Register</Button>{' '}
            </Container>
        </>
    )
}

export default Register