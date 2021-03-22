import React,{useState} from 'react';
import {Button} from '@material-ui/core';
import {storage,db} from '../firebase';
import firebase from "firebase";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import './ImageUpload.css';

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
function ImageUpload({username,openImageUpload,setopenImageUpload}){//GETTING LOGIN USERNAME FROM AUTHENTICATION.JS
    const [image,setImage]=useState(null);
    const [caption,setCaption]=useState('');
    // CONST FOR MODAL
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);

    // WHILE WE ARE SELECTING IMAGE FILES
    const handleChange=(e)=>{
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
    }
    // WHEN YOU CLICK THE UPLOAD BUTTON, PUSH THE IMAGE INSIDE FIREBASE STORAGE
    const handleUpload=(e)=>{
        // UPLOADING FILES IN FIREBASE
        setopenImageUpload(false);//close the image upload modal
        const uploadTask=storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",(snapshot)=>{ },
            (error)=>{console.log(error);},
            ()=>{//GETTING THE URL OF THE IMAGE FROM FIREBASE
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL() 
                .then(url=>{
                    //SAVE POST INSIDE DATABASE
                    var newpost={
                        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                        username:username,
                        caption:caption,
                        imageurl:url
                    }
                    db.collection("posts").add(newpost)
                    setCaption("");
                    setImage(null);
                })
            }
        )
    }
    return(
        <div>
            <Modal 
            open={openImageUpload}
            onClose={()=>setopenImageUpload(false)}>
                <div style={modalStyle} className={classes.paper}>
                    <center>
                        <h2 id="logo">Daily Prophet</h2>
                    </center>
                    <h3>Make a new post.</h3>
                        <input className="caption_input" type="text" 
                        placeholder="Enter the caption" 
                        onChange={event=>setCaption(event.target.value)}>
                    
                        </input>
                        <input className="file_input" type="file" onChange={handleChange}></input>
                        <Button onClick={handleUpload}>Upload</Button>
                </div>
            </Modal>
            
        </div>
    )
}

export default ImageUpload;