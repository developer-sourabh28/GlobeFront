import React, { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function EntryPage() {
  const navigate = useNavigate();

  // Handlers for navigation
  const handleSignup = () => navigate("/signup");
  const handleLogin = () => navigate("/login");

  // Reference for the "About" section
  const aboutSectionRef = useRef(null);
  const topSectionRef = useRef(null);

  // Scroll to About section
  const handleAbout = () => {
    aboutSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to Top section
  const handleClose = () => {
    topSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Navbar - Fixed */}
      <nav
  className="navbar navbar-expand-lg bg-light py-3 fixed-top"
  style={{
    width: "100%",
    backgroundColor: "#757575",
    position: "fixed",
    zIndex: "1000",
    display:'flex',
    height:'65px'
  }}
>
  <div className="container-fluid">
    {/* Brand */}
    <div style={{display:'flex', position:'fixed', left:'20px', gap:'70px', top:'17px'}} >
    <button style={{
      width:'150px', 
      borderRadius:'10px', border:'none', 
      fontSize:'30px', color:'white',
      background:'none', fontStyle:'italic',
      textShadow: "2px 2px 5px black"
     }}
    >
      GlobeGallery
    </button>

    {/* About Button */}
    
      <button style={{width:'80px', height:'30px', borderRadius:'10px', border:'none', fontSize:'17px', color:'white', backgroundColor:'black'}}
        onClick={handleAbout}
      >
        About
      </button>
    </div>

    {/* Right Buttons */}
    <div style={{display:'flex', position:'fixed', right:'20px', gap:'40px', top:'17px'}}>
      <button style={{width:'80px', height:'30px', borderRadius:'10px', border:'none', fontSize:'17px', color:'white', backgroundColor:'black'}}
        onClick={handleLogin}
      >
        Log in
      </button>

      <button style={{width:'80px', height:'30px', borderRadius:'10px', border:'none', fontSize:'17px', color:'white', backgroundColor:'black'}}
        onClick={handleSignup}
      >
        Sign up
      </button>
    </div>
  </div>
</nav>


      {/* Main Content - Top Section */}
      <div
        ref={topSectionRef}
        style={{
          minHeight: "900px",
          paddingTop: "100px",
          backgroundColor:'#9FE2BF' // Ensure content doesn't hide behind the fixed navbar
        }}
      >
        <div className="container d-flex flex-column justify-content-center align-items-center mt-5">
          <h1 className="text-center" style={{textAlign:'center', fontStyle:'italic', fontSize:'40px' }}>
            Welcome to <span style={{textDecoration:'underline'}}>GlobeGallery</span>
          </h1>
          <h2 className="text-center" style={{textAlign:'center', fontStyle:'italic', fontSize:'30px' }}>
            Discover, organize, and share your visual inspirations.
          </h2>
          <h3 className="text-center" style={{textAlign:'center', fontStyle:'italic', fontSize:'30px'}}>
            Sign up now to curate your own list of creativity, explore endless
            ideas, and connect with a community that loves to inspire.
          </h3>
        </div>

        {/* Image Section */}
        <div className="image-container d-flex justify-content-center flex-wrap gap-2 mt-4" 
         style={{}}
        >
          <img src="NorthernLights.jpeg" alt="NorthernLights" width="200" />
          <img src="Paris.jpeg" alt="Paris" width="200" />
          <img src="RiverUmngot.jpeg" alt="RiverUmngot" width="200" />
          <img src="RootBridge.jpeg" alt="RootBridge" width="200" />
          <img src="Santorini.jpeg" alt="Santorini" width="200" />
          <img src="TajMahal.jpeg" alt="TajMahal" width="200" />
        </div>
      </div>

      {/* About Section */}
      <div
        ref={aboutSectionRef}
        className="container mt-5 p-4 rounded"
        style={{
          backgroundColor: "#F08080",
          opacity: "0.9",
          minHeight: "955px",
          paddingTop: "80px",
          marginTop:'45px',
          width : '100%' // Adjust for fixed navbar
        }}
      >
        <div style={{ marginTop:'13%', width:'65%', marginLeft:'17%'}}>
        <h1 className="text-center fw-bold" style={{justifyContent:'center', textAlign:'center'}}>🌍 About VisuaList 🌟</h1>
        <p style={{textAlign:'center', fontSize:'25px', fontStyle:'italic'}}>
          VisuaList is a vibrant platform for travelers and adventurers to share
          their journeys with the world! 🗺️✨ Users can sign up, log in, and
          post captivating images 📸 of the places they've visited. Along with
          each image, they can share the name of the location 📍, personal
          memories, and unforgettable stories of their adventures.
        </p>
        <p style={{textAlign:'center', fontSize:'25px', fontStyle:'italic'}}>
          <strong>🌟 Connect & Engage</strong>
          <br />
          VisuaList fosters a sense of community by allowing users to like ❤️
          and comment 💬 on posts, creating a space for interaction and
          inspiration, ensuring their travel stories stay authentic and true to
          their vision.
        </p>
        <p style={{textAlign:'center', fontSize:'25px', fontStyle:'italic'}}>
          Whether you're an avid traveler 🌎 or someone who loves discovering
          new places 🏞️ through others’ eyes, VisuaList is your window to the
          world 🌟, one memory at a time.
        </p>
        <button
          onClick={handleClose}
          className="btn btn-dark"
          style={{  marginLeft:"47%",
             width:'100px', 
             height:'30px', 
             borderRadius:'10px', 
             backgroundColor:'#228b22', 
             border:'none', 
             marginBottom:'20px',
            fontSize:'15px' }}
        >
          Move ⬆️
        </button>
        </div>
      </div>
    </>
  );
}
