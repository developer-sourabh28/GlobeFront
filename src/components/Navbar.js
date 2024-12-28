import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:8000/quote';

export default function AboutModel({ onclose }) {
  const [theme, setTheme] = useState({ backgroundColor: 'white' });
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [newTheme, setNewTheme] = useState('');
    const [newQuote, setNewQuote] = useState('');
    const [newWriter, setNewWriter] = useState('');
    const [error, setError] = useState(null); 
    const [isOpen, setIsOpen] = useState(false);
    const [file, setFile] = useState(null);

  const navigate = useNavigate();

  // Save and load theme from localStorage

  const togglePostForm = () => {
    setIsOpen((prev) => !prev);
}

const handleFileChange = (e) => {
  setFile(e.target.files[0]);
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!file) {
      alert('Please select an image to upload');
      return;
  }

  const formData = new FormData();
  formData.append('image', file);

  try {
      const response = await axios.post('http://localhost:8000/api/uploads', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
      });

      const imageUrl = response.data.url;
       await createQuote(imageUrl);
  } catch (error) {
      console.error('Error uploading file:', error.response?.data || error.message);
  }
};


  const createQuote = async (imageUrl) => {
    try {
        const response = await axios.post(
            API_URL,
            { theme: newTheme, quote: newQuote, writer: newWriter, imageUrl },
            { withCredentials: true }
        );
        setQuotes((prevQuotes) => [...prevQuotes, response.data]);
        setNewTheme('');
        setNewQuote('');
        setNewWriter('');
    } catch (error) {
        setError('Failed to create quote');
    }
};

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'white';
    const initialTheme = { backgroundColor: savedTheme };
    setTheme(initialTheme);
    document.body.style.backgroundColor = initialTheme.backgroundColor;
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme.backgroundColor === 'white'
        ? { backgroundColor: 'grey' }
        : { backgroundColor: 'white' };
      document.body.style.backgroundColor = newTheme.backgroundColor;
      localStorage.setItem('theme', newTheme.backgroundColor);
      return newTheme;
    });
  };


  const handleAboutClick = () => {
    setShowAboutModal(true);
};


  const handleLogout = async () => {
    try {
        await axios.post('http://localhost:8000/logout', {}, { withCredentials: true });
        navigate('/');
    } catch (error) {
        console.error('Logout failed:', error.response?.data || error.message);
    }
};

  return (
    <div>
      <nav style={{ 
  backgroundColor: '#002D62', 
  padding: '10px', 
  color: 'white', 
  display: 'flex', 
  justifyContent: 'space-between', 
  alignItems: 'center',
  borderRadius:'5px'
}}>
  {/* Navbar Content Container */}
  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginLeft:'60px' }}>
    {/* About Button */}
    <div>
            <button
        onClick={togglePostForm}
        style={{
          padding: '10px 20px',
        cursor: 'pointer',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        marginRight:'15px'
        }}
      >
        {isOpen ? 'Close ❌' : 'Post 💌 '}
        
      </button>
            </div>
    <button
      style={{
        padding: '10px 20px',
        cursor: 'pointer',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        marginRight:'15px'
      }}
      onClick={handleAboutClick}
    >
      About
    </button>

    {/* Theme Toggle Button */}
    <button
      onClick={toggleTheme}
      style={{
        padding: '10px 20px',
        cursor: 'pointer',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
      }}
    >
      {theme.backgroundColor === 'white' ? 'Dark' : 'Light'}
    </button>
  </div>

  {/* Logout Button */}
  <button
    className='logoutBtn'
    style={{
      padding: '10px 20px',
      cursor: 'pointer',
      backgroundColor: '#FF6347',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
    }}
    onClick={handleLogout}
  >
    Logout
  </button>
</nav>
<div style={{ 
                textAlign: 'center', 
                // marginTop: '20px', 
                // marginLeft: '10px', 
                border:'1px solid black', 
                width:'110%', 
                // borderRadius:'10px',
                justifyContent: 'center',
                alignItems:'center',
                alignContent:'center' }}>
                
                {isOpen && (
                    <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                        <div style={{ marginBottom: '10px' }}>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                style={{ marginBottom: '10px' }}
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                value={newTheme}
                                onChange={(e) => setNewTheme(e.target.value)}
                                placeholder="Add Theme"
                                style={{
                                    marginBottom: '10px',
                                    padding: '5px',
                                    width: '500px',
                                    marginLeft:'20px'
                                    // display: 'block',
                                }}
                            />
                            <input
                                type="text"
                                value={newQuote}
                                onChange={(e) => setNewQuote(e.target.value)}
                                placeholder="Add Quote"
                                style={{
                                    marginBottom: '10px',
                                    padding: '5px',
                                    width: '500px',
                                    marginLeft:'20px'
                                    // display: 'block',
                                }}
                            />
                            <input
                                type="text"
                                value={newWriter}
                                onChange={(e) => setNewWriter(e.target.value)}
                                placeholder="Add Writer name"
                                style={{
                                    marginBottom: '10px auto',
                                    padding: '5px',
                                    width: '500px',
                                    marginLeft:'20px'
                                    // display: 'block',
                                }}
                            />
                        </div>
                        <button
                            type="submit"
                            style={{
                                marginBottom: '10px',
                                // padding: '5px',
                                width: '200px',
                                height: '35px',
                                display: 'block',
                                marginLeft: '45%',
                                backgroundColor: '#28A745',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                padding: "10px 20px",
                                marginTop: '15px',
                            }}
                        >
                            <span style={{ 
                                fontSize: '15px', 
                                justifyContent:'center'
                                  }}>Add 👍</span>
                        </button>
                    </form>
                )}
            </div>


      {showAboutModal && (
    <div style={{ ...modalStyle, backgroundColor: theme.backgroundColor }}>
         <h2>🌍 About GlobeGallery 🌟</h2>
        <p>
          GlobeGallery is a vibrant platform for travelers and adventurers to share their journeys with the world! 🗺️✨
          Users can sign up, log in, and post captivating images 📸 of the places they've visited. Along with each image,
          they can share the name of the location 📍, personal memories, and unforgettable stories of their adventures.
        </p>
        <p>
          <strong>🌟 Connect & Engage</strong>
          <br />
          GlobeGallery fosters a sense of community by allowing users to like ❤️ and comment 💬 on posts, creating a space
          for interaction and inspiration.ensuring their
          travel stories stay authentic and true to their vision.
        </p>
        <p>
          Whether you're an avid traveler 🌎 or someone who loves discovering new places 🏞️ through others’ eyes,
          GlobeGallery is your window to the world 🌟, one memory at a time.
        </p>
        <button
            style={{
                background: 'none',
                marginTop: '10px',
                fontSize: '15px',
                borderRadius: '10px',
                color: 'red',
            }}
            onClick={() => setShowAboutModal(false)} // Close modal
        >
            Close <b style={{ fontSize: '20px' }}>X</b>
        </button>
    </div>
)}

    </div>
  );
}

const modalStyle = {
  position: 'fixed',
  width: '70%',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '20px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  zIndex: 1000,
};