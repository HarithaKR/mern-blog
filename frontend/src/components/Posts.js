import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddPostForm from "./AddPostForm";

const Posts = (props) => {
  let posts = props.posts;
  const navigate = useNavigate();
  const {catId} = useParams();
  const navigateToAddPost = () => {
    if (catId) {
      navigate(`/categories/${catId}/add-post`)
    } else {
      navigate(`/add-post`)
    }
  }
  return (
    <div className="row posts-list">
      <h4 style={{display: "flex", justifyContent: "space-between", margin: "20px 0"}}>
        {props.title}
        <button className="btn btn-primary btn-sm" onClick={navigateToAddPost}>Add Post</button>
      </h4>
      
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <div className="blog-post" key={`post-${post._id}`}>
            <div className="blog-post-img col-3" src="..." alt="Card image cap" />
            <div className="blog-post-content col-9">
              <h4>{post.title}</h4>
              <p>{`${post.content.slice(0, 80)}...`}</p>
              <Link to={`/posts/${post._id}`} className="btn btn-primary btn-sm">Read More</Link>
            </div>
          </div>
        ))
      ) : (
        <h3> No Posts Yet </h3>
      )}
    </div>
  )
}

export default Posts;