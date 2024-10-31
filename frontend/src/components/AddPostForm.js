import React, {useState, useContext} from "react";
import {baseUrl} from "../App";
import { AppContext } from "./AppProvider";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AddPostForm = () => {
  const {catId} = useParams();
  
  const navigate = useNavigate();
  const {categoryIdMap, addPost: addGlobalPost} = useContext(AppContext);
  const [postData, setPostData] = useState({
    category: catId || null
  });

  const handleChange = (evt) => {
    const val = evt.currentTarget.value;
    const name = evt.currentTarget.name;
    const updatedData = {
      ...postData,
      [name]: val
    };
    setPostData(updatedData);
  }

  const addPost = () => {
    const body = {
      title: postData.title,
      content: postData.content,
      image: postData.image,
      category: postData.category,
      author: postData.author
    };

    axios({
      method: 'POST',
      url: `${baseUrl}/api/posts`,
      data: body
    })
    .then((res) => {
      console.log("Post Updated Successfully");
      addGlobalPost(res.data);
      navigate("/");
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <form className="row mt-3">
      <h3>Add Post</h3>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text" onChange={handleChange} className="form-control" id="title" name="title" value={postData.title} />
      </div>
      <div className="mb-3">
        <label htmlFor="content" className="form-label">Content</label>
        <textarea type="text"  onChange={handleChange} className="form-control" id="content" name="content" value={postData.content} />
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Category</label>
        <select className="form-select form-select-sm bg-light mb-3" placeholder="Select Category" name="category" defaultValue={postData.category || 0} onChange={handleChange} >
          <option value={-1} key="category-option-default">Select a Category</option>
          {Object.entries(categoryIdMap).map(([id, name]) => {
            return <option value={id} key={`category-option-${id}`}>{name}</option>
          })}
        </select>
      </div> 
      <div className="mb-3">
        <label htmlFor="author" className="form-label">Author</label>
        <input type="text" className="form-control" id="author" name="author" value={postData.author}  onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="image" className="form-label">Image Url</label>
        <input type="text" className="form-control" id="image" name="image" value={postData.image}  onChange={handleChange} />
      </div>
      <button type="button" onClick={addPost} className="btn btn-primary">Add</button>
    </form>
  )
}

export default AddPostForm;