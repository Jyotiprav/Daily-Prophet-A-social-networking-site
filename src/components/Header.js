import React,{useState} from 'react';
import Authentication from './Authentication';
//import './Header.css';  // import the css
// import Signupmodal from './Signupmodal';

function Header(props){
    const [user,setUser]=useState('');
    // Callback function to get username from authentication component
    const callbackFunction=(username)=>{
        setUser(username);
    }
    //Function to send the username to App.js
    const sendData=()=>{
        props.appCallback(user);
    }

    return(
        
        <div className="app_header">
            {/* LOGO */}
            {/* <img className="app_header_image"
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
            alt=""    
            >
            </img> */}
            <h2 id="logo">Daily Prophet</h2>
            {/* SIGNIN,LOGOUT OR SIGNOUT BUTTON */}
            <Authentication parentCallback={callbackFunction}></Authentication>
            {/* Calling send data function */}
            {sendData()}
        </div>
    );
}

export default Header;
