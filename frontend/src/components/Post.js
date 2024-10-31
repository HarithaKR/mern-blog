import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "./AppProvider";
import {baseUrl} from "../App";
import PostForm from "./PostForm";

const Post = () => {
  const {postId: id} = useParams();
  const navigate = useNavigate();
  const {categoryIdMap, deletePost: deleteGlobalPost} = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState({}); 
  const [error, setError] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    axios({
      url: `${baseUrl}/api/posts/${id}`,
      method: "GET",
      header: {
        "content-type": "application/json"
      }
    }).then((res) => {
      setPostData({
        ...res.data,
        categoryName: categoryIdMap[res.data.category]
      });
      setLoading(false);
    }).catch((err) => {
      setPostData({});
      setError(true)
    })
  }, []);

  const deletePost = () => {
    if (window.confirm("Are you sure, you want to delete the post?")) {
      axios({
        method: 'DELETE',
        url: `${baseUrl}/api/posts/${id}`
      })
      .then((res) => {
        console.log("Post Deleted Successfully");
        setIsEdit(false);
        deleteGlobalPost(id);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }

  return (
    error ? <h4 className="alert alert-danger">Something went wrong. Please try again!</h4> : 
    loading ? <h4>Loading...</h4> : (
      isEdit ? (
        <PostForm setIsEdit={setIsEdit} postData={postData} id={id} />
      ) : (
        <div className="post-block">
          <div className="card">
            <img className="card-image-top" width="100%" src={postData.image} />
            <div className="card-body">
              <h5 className="card-title">{postData.title}</h5>
              <p className="card-text">{postData.content}</p>
                <button type="button" onClick={() => {
                  setIsEdit(true);
                }} className="btn btn-primary">Edit</button>
                <button type="button" className="btn btn-danger mx-2" onClick={deletePost}>Delete</button>
            </div>
          </div>
        </div>
      )
    )
  )
}

export default Post;