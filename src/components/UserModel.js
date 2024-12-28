import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const USER_URL = 'https://globeback-641c.onrender.com/signup'

export default function UserModel() {

    const navigate = useNavigate();

    const [user, setUser] = useState([]);
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        getUser();
    }, []);

    const createUser = async () => {
        try {
            console.log('Attempting to create user...')
            const response = await axios.post(USER_URL,
                {
                    name: newName,
                    email: newEmail,
                    password: newPassword
                },
                { withCredentials: true }
            );
            console.log('User created successfully:', response.data);
            setUser([...user, response.data]);
            setNewName('');
            setNewEmail('');
            setNewPassword('');
            alert(`Welcome ${newName}`);
            console.log('Navigating to /login');
            navigate('/login');
        } catch (error) {
            console.log('Error creating user', error)
            setError('Failed to Create user')
        }
    }

    const getUser = async () => {
        try {
            const response = await axios.post(USER_URL, { withCredentials: true });
            setUser(response.data);
        } catch (error) {
            setError('Failed to get user')
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.imageContainer}>
                <p style={styles.welcomeText}>
                    Enjoy your Journey with <span style={styles.highlight}>GlobeGallery</span>
                </p>
            </div>

            <div style={styles.formContainer}>
                <div style={styles.header}>
                    <h1>Welcome!</h1>
                    <h4>Enter your details</h4>
                </div>
                <div style={styles.form}>
                    <div style={styles.inputGroup}>
                        <b>Name:</b>
                        <input
                            style={styles.input}
                            type='text'
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            placeholder='Enter Name'
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <b>Email:</b>
                        <input
                            style={styles.input}
                            type='email'
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            placeholder='Enter Email'
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <b>Password:</b>
                        <input
                            style={styles.input}
                            type='password'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder='Enter Password'
                        />
                    </div>
                    <button style={styles.signupButton} onClick={createUser}>
                        Signup
                    </button>
                    <div style={styles.loginContainer}>
                        <span>If Already User:</span>
                        <button style={styles.loginButton} onClick={() => navigate('/login')}>
                            Login
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
        backgroundImage: "url('https://wallpapercave.com/wp/wp9930008.jpg')",
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
    signupButton: {
        padding: '10px',
        backgroundColor: '#007FFF',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        width:'105%'
    },
    loginContainer: {
        marginTop: '10px',
        textAlign: 'center',
    },
    loginButton: {
        padding: '5px 10px',
        backgroundColor: '#7FFFD4',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

// Media queries using inline styles
const mediaQuery = `
@media (max-width: 768px) {
    .formContainer {
        width: 100%;
        padding: 10px;
    }

    .imageContainer {
        height: 20vh;
    }

    .form {
        gap: 10px;
    }
}
`;

// Add the media query to the document
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = mediaQuery;
document.head.appendChild(styleSheet);


const userStyle = {

};