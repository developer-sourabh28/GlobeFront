import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'http://localhost:8000/quote';

export default function Home({ quote, currentUser }) {
  const [quotes, setQuotes] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [commentsVisible, setCommentsVisible] = useState({});
  const [comments, setComments] = useState({});
  const [commentText, setCommentText] = useState('');
  // const [openPosts, setOpenPosts] = useState({}); // State to track open posts
  const [editingId, setEditingId] = useState(null);
  const [editTheme, setEditTheme] = useState('');
  const [editQuote, setEditQuote] = useState('');
  const [editWriter, setEditWriter] = useState('');
  const [activeQuote, setActiveQuote] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserRole(decodedToken.role);
        setUserName(decodedToken.name);
      } catch (error) {
        console.error('Error decoding token:', error.message);
      }
    }
    getQuotes();
  }, []);

  const getQuotes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        withCredentials: true,
      });
      setQuotes(response.data);
    } catch (error) {
      setError('Failed to load quotes');
      console.error(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // const toggleOpenPost = (quoteId) => {
  //   setOpenPosts((prev) => ({ ...prev, [quoteId]: !prev[quoteId] }));
  //   console.log(quoteId)
  // };

  const handleLike = async (quoteId) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/${quoteId}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          withCredentials: true,
        }
      );

      const { likes, alreadyLiked } = response.data;
      setQuotes((prevQuotes) =>
        prevQuotes.map((quote) =>
          quote._id === quoteId
            ? { ...quote, likesCount: likes, userLiked: alreadyLiked }
            : quote
        )
      );
    } catch (error) {
      alert('Error handling like:', error.message)
      console.error('Error handling like:', error.response?.data || error.message);
    }
  };

  // const startEditing = (id, theme, quote, writer) => {
  //   setEditingId(id);
  //   setEditTheme(theme);
  //   setEditQuote(quote);
  //   setEditWriter(writer);
  // };

  // const updateQuote = async (id) => {
  //   try {
  //     const response = await axios.put(
  //       `${API_URL}/${id}`,
  //       { theme: editTheme, quote: editQuote, writer: editWriter },
  //       {
  //         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  //         withCredentials: true,
  //       }
  //     );
  //     setQuotes((prevQuotes) =>
  //       prevQuotes.map((quote) => (quote._id === id ? response.data : quote))
  //     );
  //     setEditingId(null);
  //   } catch (error) {
  //     console.error('Error updating quote:', error.response?.data || error.message);
  //     alert(error.message);
  //   }
  // };

  // const deleteQuote = async (quoteId) => {
  //   try {
  //     await axios.delete(`${API_URL}/${quoteId}`, {
  //       headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  //     });
  //     setQuotes((prevQuotes) => prevQuotes.filter((quote) => quote._id !== quoteId));
  //   } catch (error) {
  //     console.error('Error deleting quote:', error.response?.data || error.message);
  //     alert(error.message);
  //   }
  // };


  const toggleComments = (quoteId) => {
    setCommentsVisible((prev) => ({
      ...prev,
      [quoteId]: !prev[quoteId],
    }));
  };

  useEffect(() => {
    const fetchComments = async (quoteId) => {
      if (!commentsVisible[quoteId]) return; // Don't fetch if comments are not visible
      try {
        const response = await axios.get(
          `http://localhost:8000/api/${quoteId}/comments`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }
        );
        setComments((prev) => ({ ...prev, [quoteId]: response.data }));
      } catch (error) {
        console.error('Error fetching comments:', error);
        // alert(error.message)
      }
    };

    // Fetch comments for each quoteId that has comments visible
    Object.keys(commentsVisible).forEach((quoteId) => {
      if (commentsVisible[quoteId]) {
        fetchComments(quoteId);
      }
    });
  }, [commentsVisible]);

  const handleSubmitComment = async (quoteId) => {
    if (!commentText.trim()) return;

    try {
      const response = await axios.post(
        `http://localhost:8000/api/${quoteId}/comments`,
        { text: commentText },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, // Make sure this is set
        }
      );
      setComments((prev) => ({
        ...prev,
        [quoteId]: [...(prev[quoteId] || []), response.data],
      }));
      setCommentText('');
    } catch (error) {
      console.error('Error posting comment:', error.response || error);
    }
  };

  const openQuoteModal = (quote) => {
    setActiveQuote(quote);
  }

  const closeQuoteModal = () => {
    setActiveQuote(null);
  }



  return (
    <div className="quote">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Navbar />
      <h1 className="introText">
        <span>"Share Moments, Inspire the World"</span>
        <br />
        "Welcome to GlobeGallery – Your Creative Space to Explore and Share!"
      </h1>
      {loading && <p>Loading...</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginLeft:'30px' }}>

        {quotes.map((quote) => (
          <div key={quote._id} style={{ cursor: 'pointer' }}
            onClick={() => openQuoteModal(quote)}>
            {/* Clickable image */}

            <img
              src={quote.imageUrl}
              alt="Uploaded"
              style={{
                width: '350px',
                height: '240px',
                borderRadius: '10px',
                border: '2px solid black',
              }}
            />
          </div>
        ))}
      </div>


      {/* Conditionally render the full post content */}
      {activeQuote && (
        <div className='modal' style={modalStyles}>
          <div className='modal-content' style={modalContentStyles}>

            <div style={{ flex: 1,
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
             }}>

              <img
                src={activeQuote.imageUrl}
                alt='Selected'
                style={{ width: '100%', height: 'auto', borderRadius: '10px', border: '5px solid black', }}
              />

            </div>

            <div style={{ flex: 1, padding: '20px' }}>

              <button style={{
                position: 'absolute',
                top: '50px',
                right: '50px',
                width: '30px',
                height: '30px',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}

                onClick={closeQuoteModal}
              >X</button>
              <div style={{ marginLeft: '30px', marginTop: '10px' }}>
                <b>Theme:</b> {editingId === activeQuote._id ? <input value={editTheme} onChange={(e) => setEditTheme(e.target.value)} /> : activeQuote.theme}
                <br />
                <br />
                <b>Quote:</b> {editingId === activeQuote._id ? <input value={editQuote} onChange={(e) => setEditQuote(e.target.value)} /> : activeQuote.quote}
                <br />
                <br />
                <b>Writer:</b> {editingId === activeQuote._id ? <input value={editWriter} onChange={(e) => setEditWriter(e.target.value)} /> : activeQuote.writer}
                <br />
                <br />
                <button
                  style={{
                    borderRadius: "10px",
                    border:'none',
                    marginRight: "10px",
                    backgroundColor: activeQuote.userLiked ? "red" : "green",
                    color: "white", 
                    padding:'5px'
                  }}
                  onClick={() => handleLike(activeQuote._id)}
                >
                  {activeQuote.userLiked ? "Dislike 👎" : "Like 👍"}
                </button>

                {/* {currentUser?._id === activeQuote.owner && (
                  <>
                    {editingId === activeQuote._id ? (
                      <>
                        <button onClick={() => updateQuote(activeQuote._id)}>Save</button>
                        <button onClick={() => setEditingId(null)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => startEditing(activeQuote._id, activeQuote.theme, activeQuote.quote, activeQuote.writer)}>Edit</button>
                        <button onClick={() => deleteQuote(activeQuote._id)}>Delete</button>
                      </>
                    )}
                  </>
                )} */}
                <button 
                style={{
                  borderRadius: "10px",
                  border:'none',
                  marginRight: "10px",
                  color: "black", 
                  padding:'5px'
                }}
                onClick={() => toggleComments(activeQuote._id)}>
                  {commentsVisible[activeQuote._id] ? 'Hide Comments ❌' : 'Show Comments 💬'}
                </button>
                {commentsVisible[activeQuote._id] && (
                  <div>
                    <ul>
                      {(comments[activeQuote._id] || []).map((comment) => (
                        <li key={comment._id}>
                          {/* <strong>{comment.user?.username}</strong>: */}
                          {comment.text}
                        </li>
                      ))}
                    </ul>
                    <input
                     style={{
                      borderRadius: "5px",
                      border:'none',
                      marginRight: "10px",
                      color: "black", 
                      padding:'5px',
                      width:'300px'
                    }}
                      type="text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Add a comment"
                    />
                    <button 
                    style={{
                      borderRadius:'5px',
                      border:'none',
                      padding:'5px',
                      width:'50px'
                    }}
                    onClick={() => handleSubmitComment(activeQuote._id)}>Post</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

  );
}


const modalStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContentStyles = {
  background: 'black',
  color: 'white',
  display: 'flex',
  borderRadius: '10px',
  overflow: 'hidden',
  width: '80%',
  height: '70%',
};