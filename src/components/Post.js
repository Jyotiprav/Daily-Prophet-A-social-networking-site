// Create the function component
import React, { useState, useEffect } from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';
import { db } from '../firebase';
import firebase from 'firebase';

function Post({ signedinUser, postId, username, imageurl, caption, like }) {
    const [comments, setComments] = useState([]);//All comments
    const [comment, setComment] = useState('');//Single comment
    const [likeButtonActive, setlikeButtonActive] = useState(false);
    const [commentButtonActive, setcommentButtonActive] = useState(false);

    useEffect(() => {
        var unsubscribe;
        if (postId) {
            unsubscribe = db.collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy('timestamp', 'desc')
                .onSnapshot((s) => {
                    setComments(s.docs.map((doc) => ({
                        id: doc.id,
                        c: doc.data()
                    })))
                })
        }
        return () => { unsubscribe(); }
    }, [postId])
    // POST COMMENTS FUNCTION
    const postComment = (e) => {
        e.preventDefault();
        db.collection("posts").doc(postId).collection("comments").add(
            {
                text: comment,
                username: signedinUser.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }
        )
        setComment('');
    }

    // DELETE COMMENT FUNCTION
    const handleDelete = (e) => {
        const commentId = e.target.dataset.id;
        db.collection("posts").doc(postId).collection("comments").doc(commentId).delete()
            .then(() => {
                console.log("Comment successfully deleted.");
            })
            .catch((error) => {
                console.log("Error");
            })
    }

    return (
        <div className="post">
            {/* POST USERNAME*/}
            <div className="post_header">
                <Avatar className="post_avatar" alt={username} src="image.jpg" />
                <h1>{username}</h1>
            </div>
            {/* POST IMAGE */}
            <img className="post_image" src={imageurl} alt="post_image"></img>
            {/* POST LIKE AND COMMENT BUTTON*/}
            {signedinUser ? (
                <div class="container">
                    {/* LIKE BUTTON */}
                    <i class={`${likeButtonActive ? "fas fa-heart" : "far fa-heart"} heartIcon `}
                       onClick={() => {setlikeButtonActive(!likeButtonActive);}}></i>
                    {/* COMMENT BUTTON */}
                    <i class="far fa-comment commentIcon" onClick={() => setcommentButtonActive(!commentButtonActive)}></i>
                </div>
            ) : ("")}
            {/* POST CAPTION */}
            <h3 className="post_caption">{username}:<span className="post_text">{caption}</span></h3>
            {/* DISPLAY POST COMMENTS */}
            <div className="post_comments">
                {comments.map(({ id, c }) => (
                    <p className="single_comment">
                        <div>
                            <strong>{c.username}</strong> : {c.text}
                        </div>
                        {signedinUser ? (
                        (c.username === signedinUser.displayName) ? (<button className="delete_button" data-id={id} onClick={handleDelete} >X</button>) : ("")
                        ) : ("")}
                    </p>
                )
                )}
            </div>
            {/* ADD POST COMMENTS */}
            {commentButtonActive && signedinUser ? (
                <form className="post_commentbox">
                    <input type="text"
                        className="post_input"
                        placeholder="Add Comments.."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}>
                    </input>
                    <button className="post_button"
                        type="submit"
                        onClick={postComment}
                    >Post</button>
                </form>
            ) : ("")}
        </div>
    )
}
export default Post;