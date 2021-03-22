// GETTING MODAL FROM MATERIAL UI(https://material-ui.com/components/modal/#modal)

import React ,{useState,useEffect}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Button} from '@material-ui/core';
import './Signupmodal.css';
import {auth} from '../firebase';

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

function Signupmodal(){
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false); //sign up modal variables
    const [openSignIn,setOpenSignIn]=useState(false);//sign in modal variable

    // FORM VARIABLES
    const [username,setUsername]=useState('');
    const [fullname,setFullname]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    // NEW USER VARIABLE
    const [user,setUser]=useState(null);
    
    // EVERYTIME NEWUSER LOGGED IN, CALL USEEFFECT. USEEFFECT WITH CHECK IF USER         
    // LOGGEDIN OR LOOGEDOUT

    useEffect(()=>{
      auth.onAuthStateChanged(authUser=>{
        if(authUser){
          // IF USER LOGGED IN
          setUser(authUser);
          // console.log(authUser);
        }
        else{
          // IF USER LOGGED OUT
          setUser(null);
        }
      })
    },[user,username]);

    //FIREBASE SIGNUP USING EMAIL AND PASSWORD
    const signUp=(event)=>{
      console.log("Sign Up");
      event.preventDefault();
      // Create the user with email and password.
      // Once user is created, update the displayName to new user name.
      // If there is any error, show the alert box.
      auth.createUserWithEmailAndPassword(email,password)
      .then((authUser)=>{
          return authUser.user.updateProfile({displayName:username})
          // console.log(authUser);
      })
      .catch((error)=>alert(error.message))
    }

    // FIREBASE SIGNIN USING EMAIL AND PASSWORD
    const signIn=(event)=>{
      event.preventDefault();
      auth.signInWithEmailAndPassword(email,password)
      .then((authUser)=>{
        console.log("sign in");
      })
      .catch((error)=>alert(error.message))

    }


    return(
        <div>
            
            {/* SIGN UP POPUP WINDOW (MODAL) */}
            <Modal 
            open={open}
            onClose={()=>setOpen(false)}>
                <div style={modalStyle} className={classes.paper}>
                    <center>
                        <img className="app_header_image"
                            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
                            alt="Instagram Logo"    
                        ></img>
                    </center>
                    <h3>Become a member.</h3>
                    <form className="app_signup_form">
                        <input placeholder="username"
                               autoFocus="autoFocus"
                               type="text"
                               value={username}
                               onChange={(e)=>setUsername(e.target.value)}>
                        </input>
                        <input placeholder="fullname"
                               type="text"
                               value={fullname}
                               onChange={(e)=>setFullname(e.target.value)}>
                        </input>
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
                        <Button onClick={signUp}> Sign up</Button>
                    </form>
                </div>
            </Modal>

            {/* SIGN IN POPUP WINDOW (MODAL) */}
            <Modal 
            open={openSignIn}
            onClose={()=>setOpenSignIn(false)}>
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
                        <Button onClick={signIn}> Sign up</Button>
                    </form>
                </div>
            </Modal>

            {/*TODO:  If user looged in, show logout button, else show signin and sign up buttons */}
            {user?(
              // LOGOUT BUTTON
              <Button variant="outlined" onClick={()=>auth.signOut()}>logout</Button>
            ):(
              <div className="app_logincontainer">
                  {/* SING IN BUTTON */}
                  <Button variant="outlined" onClick={()=>setOpenSignIn(true)}>sign in</Button>
                  {/* SIGN UP BUTTON */}
                  <Button variant="outlined" onClick={() => setOpen(true)}>sign up</Button>
              </div>
              
            )}
            
          
        </div>
    )
}

export default Signupmodal;