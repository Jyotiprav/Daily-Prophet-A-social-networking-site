import './App.css';
import Header from './components/Header'; //importing header.js component
import Post from './components/Post';
import { useState, useEffect} from 'react';
import { db } from './firebase';            //importing firebase.js file




function App() {
  const [posts, setPosts] = useState([]);//var to store all the posts
  const [user, setUser] = useState('');//var to store signin in username

  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })//end of db.collection
  }, [])//end of useEffect
  
  const callbackFunction = (username) => {// Call back function to get username from Header.js
    setUser(username);
  }

  return (
    <div className="App">
      {/* HEADER */}
      <Header appCallback={callbackFunction} />              
      {/* POSTS */}
      <div className="all_posts">
        {
            posts.map(({id,post}) => (
              <Post signedinUser={user} postId={id} key={id} username={post.username} caption={post.caption} imageurl={post.imageurl} like={post.like} />
            ))
        }
      </div>
    </div>
  );
}
export default App;
