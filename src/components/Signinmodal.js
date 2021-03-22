import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {auth} from '../firebase';
import {Button} from '@material-ui/core';
import './Signupmodal.css';

// FUNCTION TO SET THE MODAL AT THE CENTER
function getModalStyle() {
    const top = 50 ;
    const left = 50 ;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
// STYLE FOR THE MODAL
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function Signinmodal(){
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    const [openSignIn,setOpenSignIn]=useState(false);//sign in modal variable
    
    // FORM VARIABLES
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    // FIREBASE SIGNIN USING EMAIL AND PASSWORD
    const signIn=(event)=>{
        event.preventDefault();
        auth.signInWithEmailAndPassword(email,password)
        .then((authUser)=>{
          console.log("sign in");
        })
        .catch((error)=>alert(error.message))
  
      }
    const keyup=(event)=>{
      if (event.code === "Enter") {
        signIn(event);
       }
    }
    return(
        <div>
            {/* SIGN IN POPUP WINDOW (MODAL) */}
            <Modal 
            open={openSignIn}
            onClose={()=>setOpenSignIn(false)}
            onKeyUp={keyup}>
                <div style={modalStyle} className={classes.paper}>
                    <center>
                        <img className="app_header_image"
                            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
                            alt="Instagram Logo"    
                        ></img>
                    </center>
                    <h3>Already a member? Sign in.</h3>
                    <form className="app_signup_form">
                        <input placeholder="email"
                               type="text"
                               value={email}
                               onChange={(e)=>setEmail(e.target.value)}>
                        </input>
                        <input placeholder="password"
                               type="password"
                               value={password}
                               onChange={(e)=>setPassword(e.target.value)}>
                        </input>
                        <Button onClick={signIn}> Sign IN</Button>
                    </form>
                </div>
            </Modal>

            {/* SIGN IN BUTTON */}
            <Button variant="outlined" onClick={()=>setOpenSignIn(true)}>sign in</Button>
        </div>
    )
}

export default Signinmodal;