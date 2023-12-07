import React, { useState, useRef } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CampaignTwoToneIcon from '@mui/icons-material/CampaignTwoTone';
import { AppBar, Button, Toolbar,styled } from '@mui/material';
import {NavLink} from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import MenuPopupState from './NavBar';
import NavB from './NavBar';
import EmailForm from './Mailer';
import IFrame360Viewer from './view';





const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const toggleState = () => {
    setIsOpen(!isOpen);
  };

  const onSendButton = () => {
    if (inputText === '') {
      return;
    }

    const userMessage = { name: 'User', message: inputText };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    fetch('https://chandra76768.pythonanywhere.com/predict', {
      method: 'POST',
      body: JSON.stringify({ message: inputText }),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        const samMessage = { name: 'Sam', message: response.answer };
        setMessages((prevMessages) => [...prevMessages, samMessage]);
        setInputText('');
      })
      .catch((error) => {
        console.error('Error:', error);
        setInputText('');
      });
  };

const updateChatText = () => {
  const reversedMessages = [...messages].reverse();

  return reversedMessages.map((item, index) => {
    const messageContainerStyle =
      item.name === 'Sam'
        ? { justifyContent: 'flex-start' } // Response on the left
        : { justifyContent: 'flex-end' }; // User's message on the right

    const messageTypeStyle =
      item.name === 'Sam'
        ? { background: '#581b98', color: 'white', alignSelf: 'flex-start' }
        : { background: '#e0e0e0', alignSelf: 'flex-end' };

    return (
      <div key={index} style={{ display: 'flex', ...messageContainerStyle, marginTop: '10px' }}>
        <div style={{ ...messageTypeStyle, margin: '10px', padding: '8px 12px', maxWidth: '70%', borderRadius: '20px', display: 'inline-block' }}>
          {item.name === 'Sam' ? (
            // Render Sam's message with HTML content
            <div dangerouslySetInnerHTML={{ __html: item.message }} />
          ) : (
            // Render user's message as plain text
            <div>{item.message}</div>
          )}
        </div>
      </div>
    );
  });
};


  return (
    <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: '9999' }}>
      <div style={{ position: 'absolute', bottom: '0', right: '0' }}>
        <button onClick={toggleState}>
           <img src="data:image/png;base64,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" alt="Chatbox Icon" style={{height:'55px', width:'55px',borderRadius:'50%'}}/>
        </button>
      </div>
      {isOpen && (
        <div style={{ display: 'flex', flexDirection: 'column', width: '300px', height: '450px', backgroundColor: '#f9f9f9', boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)', borderRadius: '20px', overflow: 'hidden', transform: 'translateY(-40px)', zIndex: '123456', opacity: '1' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',height:'90px', padding: '0px 0px', borderRadius: '20px', boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.1)', background: 'linear-gradient(268.91deg, #581B98 -2.14%, #9C1DE7 99.69%)' }}>
            <div style={{ marginRight: '10px' }}>
              <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png" alt="image" />
            </div>
            <div>
              <h4 style={{ fontSize: '1.2rem', color: 'white' }}>Ask Vidya</h4>
              <p style={{ fontSize: '.9rem', color: 'white' ,marginTop:'-20px'}}>Hi. My name is Vidya. How can I help you?</p>
            </div>
          </div>
          <div style={{ flex: '1', padding: '0 20px', display: 'flex', flexDirection: 'column-reverse', overflowY: 'scroll' }}>
            {updateChatText()}
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '20px 20px', background: 'linear-gradient(268.91deg, #581B98 -2.14%, #9C1DE7 99.69%)', boxShadow: '0px -10px 15px rgba(0, 0, 0, 0.1)', borderBottomRightRadius: '10px', borderBottomLeftRadius: '10px', marginTop: '20px' }}>
            <input
              type="text"
              placeholder="Write a message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyUp={(e) => e.key === 'Enter' && onSendButton()}
              style={{ width: '80%', border: 'none', padding: '10px 10px', borderRadius: '30px', textAlign: 'left' }}
            />
            <button className="chatbox__send--footer send__button" onClick={onSendButton} style={{ color: 'DarkGreen',height:'30px',width:'60px',borderRadius:'10px' }}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


const SearchBar = () => {
  const searchContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    marginTop:'20px'
  };

  const circleStyles = {
    backgroundColor: 'green',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const inputStyles = {
    marginLeft: '20px',
    height: '35px',
    width: '180px',

  };

  return (
    <div style={searchContainerStyles}>
      <input placeholder="Search here" style={inputStyles} />
      <div style={circleStyles}>
        <SearchIcon style={{ color: 'white' }} />
      </div>
      
    </div>
  );
};

const NavBar = () => {
  const buttonStyles = {
    backgroundColor: 'white',
    color: 'green',
    border: '1.5px solid black',
    padding: '5px 15px',
    marginLeft: '10px',
    cursor: 'pointer',
    borderRadius:'4px'
  };

  const handleMouseOver = (event) => {
    event.target.style.backgroundColor = 'darkgreen';
    event.target.style.color = 'white';
  };

  const handleMouseOut = (event) => {
    event.target.style.backgroundColor = 'white';
    event.target.style.color = 'green';
  };

  return (
    <div className="navbar">
      <button
        style={buttonStyles}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        Mandatory Disclosures
      </button>
      <button
        style={buttonStyles}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        Library
      </button>
      <button
        style={buttonStyles}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        Administration
      </button>
      <button
        style={buttonStyles}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        Career
      </button>
      <button
        style={buttonStyles}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        Alumni
      </button>
    </div>
  );
};




const Home = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const containerStyles = {
    display: 'flex',
  };

  const div1Styles = {
    flex: '15%',
    height: '40px',
    backgroundColor: 'maroon',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '17px',
    position: 'relative',
    color: 'white',
  };

  const triangleStyles = {
    width: '0',
    height: '0',
    borderLeft: '10px solid transparent',
    borderRight: '10px solid maroon', 
    borderTop: '10px solid transparent',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    right: '0',
  };
  
  const micIconStyles = {
    color: 'white',
  };

  const div2Styles = {
    flex: '70%',
    height: '40px',
    backgroundColor: 'lightgrey',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '17px',
  };

  const marqueeStyles = {
    color: 'maroon',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    animation: 'marquee 10s linear infinite',
    textDecoration: 'none',
    width:'95%',
  
  };

  const div3Styles = {
    flex: '15%',
    height: '40px',
    backgroundColor: 'lightgrey',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '14px',
    position: 'relative',
    
  };

  const dropdownButtonStyles = {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  };

  const hamburgerStyles = {
    color: 'green',
    fontSize: '20px',
  };

  const dropdownStyles = {
    display: isDropdownVisible ? 'block' : 'none',
    position: 'fixed',
    top: '0',
    right: isDropdownVisible ? '0' : '-30%',
    width: '30%',
    height: '100vh',
    backgroundColor: 'white',
    border: '1px solid black',
    color: 'black',
    padding: '10px',
    zIndex: 1,
   
    opacity: isDropdownVisible ? 1 : 0, // Initially fully transparent
    transition: 'right 0.5s ease-in-out, opacity 0.5s ease-in-out',
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  return (
    <div>
      <div style={containerStyles}>
        <div style={div1Styles}>
          <span>Announcements</span>
          <CampaignTwoToneIcon style={micIconStyles} />
          <div style={triangleStyles}></div>
        </div>
        <div style={div2Styles}>
          <marquee style={marqueeStyles}> 
         <img src='http://45.114.246.81/~adroitprojects/projects/cbit/v3/assets/images/icon/new-anim.gif' style={{height:'20px',width:'20px',marginRight:'10px',marginLeft:'10px'}}/>
            <a href="https://www.cbit.ac.in/wp-content/uploads/2021/04/Smart-India-Hackathon-SIH-2023-Circular.pdf" style={{ textDecoration: 'none', color: 'maroon' }}>
              Smart India Hackathon SIH 2023 Circular
            </a> |
            
            <img src='http://45.114.246.81/~adroitprojects/projects/cbit/v3/assets/images/icon/new-anim.gif' style={{height:'20px',width:'20px',marginRight:'10px',marginLeft:'10px'}}/>
            
            <a href="https://www.cbit.ac.in/wp-content/uploads/2022/03/Library-2023-Circular.pdf" style={{ textDecoration: 'none', color: 'maroon' ,marginRight:'10px'}}>
              Library 2023 Circular
            </a>|
            <img src='http://45.114.246.81/~adroitprojects/projects/cbit/v3/assets/images/icon/new-anim.gif' style={{height:'20px',width:'20px',marginRight:'10px',marginLeft:'10px'}}/>
            
            <a href="https://www.cbit.ac.in/wp-content/uploads/2021/04/Smart-India-Hackathon-SIH-2023-Circular.pdf" style={{ textDecoration: 'none', color: 'maroon',marginLeft:'10px' }}>
              Webinar on cloud computing
            </a>|
            <img src='http://45.114.246.81/~adroitprojects/projects/cbit/v3/assets/images/icon/new-anim.gif' style={{height:'20px',width:'20px',marginRight:'10px',marginLeft:'10px'}}/>
            
            
            <a href="https://www.cbit.ac.in/wp-content/uploads/2022/03/Library-2023-Circular.pdf" style={{ textDecoration: 'none', color: 'maroon' }}>
              Circular on holidays
            </a>|
          </marquee>
        </div>
        <div style={div3Styles}>
          <div style={dropdownButtonStyles} onClick={toggleDropdown}>IMPORTANT LINKS
            <MenuIcon style={hamburgerStyles} /> 
          </div>
        </div>
      </div>
      {isDropdownVisible && (
        <>
          <div
            onClick={closeDropdown}
            style={{
              position: 'fixed',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              zIndex: 0,
              backdropFilter: 'blur(0.5px)',
            }}
          />
          <div id="dropdown-menu" style={dropdownStyles} ref={dropdownRef}>
            <ul>
              <li>Mandatory Disclosures </li>
              <li>Library</li>
              <li>Academics</li>
              <li>Admissions</li>
            </ul>
          </div>
        </>
      )}
    <div style={{display:'flex',marginTop:'10px'}}>
      
      <img src='http://45.114.246.81/~adroitprojects/projects/cbit/v3/assets/images/cbit-logo-new.png'  style={{height:'100px',width:'550px',marginTop:'5px',marginRight:'150px'}}/>
      <div >
     <NavBar />
     <div style={{display:'flex'}}>
     <div>
     <img src='http://45.114.246.81/~adroitprojects/projects/cbit/v3/assets/images/logos/nba.jpg' style={{height:'60px',width:'60px',marginTop:'10px',marginLeft:'80px'}}/>
     <img src='http://45.114.246.81/~adroitprojects/projects/cbit/v3/assets/images/logos/nirf.jpg' style={{height:'60px',width:'60px'}}/>
     <img src='http://45.114.246.81/~adroitprojects/projects/cbit/v3/assets/images/logos/a-naac.jpg ' style={{height:'60px',width:'60px'}}/>
     </div>
     <div>
     <SearchBar  />
     </div>
     </div>
     </div>
     
    </div>
    <NavB />
    
    <>
    <Chatbox/>
    <IFrame360Viewer
        src="https://www.google.com/maps/embed?pb=!4v1701941071638!6m8!1m7!1s-dJQtvZ5mmeiJr11Ix1WnQ!2m2!1d17.39120513009094!2d78.31908238845386!3f286.5636117244157!4f37.10192918949332!5f0.4000000000000002" style={{marginRight:'800px'}}
      />

   
    </>
   
    

    </div>
  );
};

export default Home;