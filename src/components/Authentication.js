import React,{useState} from 'react';
import {Button} from '@material-ui/core';
import {auth} from '../firebase';
import Signupmodal2 from './Signupmodal2';
import Signinmodal from './Signinmodal';
import ImageUpload from './ImageUpload';
import Avatar from '@material-ui/core/Avatar';
import './Authentication.css';

function Authentication(props){
    const [user,setUser]=useState(null);
    const [openImageUpload,setopenImageUpload]=useState(false);

    // send data function to send the username to parent component(Header.js)
    const sendData=()=>{
        props.parentCallback(user);
    }
    // Function to open image upload box
    const handleImageButton=(e)=>{
        console.log("image upload box");
        setopenImageUpload(!openImageUpload);
    }

    return(
        <div>
            {/* IF USER SIGNEDIN AND CLICK ON IMAGE UPLOAD BUTTON THEN OPEN IMAGE UPLOAD MODAL */}
            {user?.displayName?(
                openImageUpload && 
                <ImageUpload username={user.displayName} openImageUpload={openImageUpload} 
                setopenImageUpload={setopenImageUpload}></ImageUpload>
            ):(
                <h3>Sorry you need to login to upload.</h3>
            )}
           
            {/* TODO:  If user logged in, show logout AND IMAGEUPLAD button, else show signin and sign up buttons */}
            {user?(
               
              <div className="container">
                {/* SIGNED IN USER AVATAR  */}
                <Avatar style={{ height: '30px', width: '30px',backgroundColor:"white",color:"black" }} className="post_avatar" alt={user.displayName} src="image.jpg" />
                {/* Image upload button */}
                <i class="far fa-images imageIcon" onClick={handleImageButton} ></i>
                {/* LOGOUT BUTTON */}
                <Button variant="outlined" onClick={()=>auth.signOut()}>logout</Button>
              </div> 
            ):(
              <div className="app_logincontainer">
                  <Signinmodal></Signinmodal>
                  <Signupmodal2 user={user} setUser={setUser}></Signupmodal2>
              </div>
              
            )}
            {/* Calling send data */}
            {sendData()} 
        </div>
    )
}

export default Authentication;