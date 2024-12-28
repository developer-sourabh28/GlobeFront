import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LOGIN_URL = 'https://globeback-641c.onrender.com/login';

export default function LoginModel() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const LoginUser = async () => {
        if (!email || !password) {
            setError('Email and password are required');
            return;
        }

        try {
            const response = await axios.post(
                LOGIN_URL,
                { email, password },
                { withCredentials: true }
            );

            console.log('Login successful:', response.data);

            // Store the token in localStorage
            localStorage.setItem('token', response.data.token);

            // Clear the input fields
            setEmail('');
            setPassword('');

            // Navigate to the home page or dashboard
            navigate('/home');
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
            setError(error.response?.data?.message || 'Login failed');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            LoginUser();
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.imageContainer}>
                <p style={styles.welcomeText}>
                    Enjoy your Journey with <span style={styles.highlight}>GlobeGallery</span>
                </p>
            </div>

            <div style={styles.formContainer}>
                <div style={styles.header}>
                    <h1>Welcome Back!</h1>
                    <h4>Enter your details</h4>
                </div>
                <div style={styles.form}>
                    <div style={styles.inputGroup}>
                        <b>Email:</b>
                        <input
                            style={styles.input}
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder='Enter Email'
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <b>Password:</b>
                        <input
                            style={styles.input}
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder='Enter Password'
                        />
                    </div>
                    <button style={styles.loginButton} onClick={LoginUser}>
                        Login
                    </button>
                    {error && <div style={styles.error}>{error}</div>}
                    <div style={styles.signupContainer}>
                        <span>If New User:</span>
                        <button
                            style={styles.signupButton}
                            onClick={() => navigate('/signup')}>
                            Signup
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        margin: '5%',
        width: '90%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    imageContainer: {
        backgroundImage: "url('https://wallpapercave.com/wp/wp9929977.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '10px',
        width: '100%',
        height: '30vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: '44px',
        fontStyle: 'italic',
        color: 'white',
        textShadow: '1px 1px 3px black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    highlight: {
        color: '#041E42',
        textDecoration: 'underline',
    },
    formContainer: {
        width: '100%',
        marginTop: '2%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    header: {
        marginBottom: '20px',
        textAlign: 'center',
    },
    form: {
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid grey',
    },
    loginButton: {
        padding: '10px',
        backgroundColor: '#007FFF',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        width:'105%'
    },
    signupContainer: {
        marginTop: '10px',
        textAlign: 'center',
    },
    signupButton: {
        padding: '5px 10px',
        backgroundColor: '#7FFFD4',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        fontSize: '14px',
        textAlign: 'center',
    }
};
