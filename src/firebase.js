// // Install firebase using npm i firebase before executing this file

// import firebase from "firebase";

// // Copied from firebase project Settings-->config
// const firebaseApp=firebase.initializeApp({
//     apiKey: "AIzaSyCRhTRS8V2GWSqGA-pNFWQXXtEAatKplWY",
//     authDomain: "insta-clone-b0b40.firebaseapp.com",
//     projectId: "insta-clone-b0b40",
//     storageBucket: "insta-clone-b0b40.appspot.com",
//     messagingSenderId: "301418735215",
//     appId: "1:301418735215:web:7aaee30ee19d52762e0f9a",
//     measurementId: "G-NDMG4D5KY6"
// })

// // Creating three firebase services 
// const db=firebaseApp.firestore(); //storing Json object
// const auth=firebase.auth();       //For security 
// const storage=firebase.storage(); //File storage

// export {db,auth,storage};

import firebase from "firebase";
//copied from firebase project setting-->config
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCRhTRS8V2GWSqGA-pNFWQXXtEAatKplWY",
  authDomain: "insta-clone-b0b40.firebaseapp.com",
  projectId: "insta-clone-b0b40",
  storageBucket: "insta-clone-b0b40.appspot.com",
  messagingSenderId: "301418735215",
  appId: "1:301418735215:web:7aaee30ee19d52762e0f9a",
  measurementId: "G-NDMG4D5KY6"
  })


  //creating three firebase services
  const db=firebaseApp.firestore();//storing json object
  const auth=firebase.auth();//fore security
  const storage=firebase.storage();//file storage


  export{db,auth,storage};




