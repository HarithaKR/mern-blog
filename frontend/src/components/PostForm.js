import React, {useState, useContext} from "react";
import {baseUrl} from "../App";
import { AppContext } from "./AppProvider";
import axios from "axios";

const PostForm = (props) => {
  const [postData, setPostData] = useState(props.postData);
  const {categoryIdMap, updatePost: updateGlobalPost} = useContext(AppContext);

  const handleChange = (evt) => {
    const val = evt.currentTarget.value;
    const name = evt.currentTarget.name;
    const updatedData = {
      ...postData,
      [name]: val
    };
    setPostData(updatedData);
  }

  const updatePost = () => {
    const body = {
      title: postData.title,
      content: postData.content,
      image: postData.image,
      category: postData.category,
      author: postData.author
    };

    axios({
      method: 'PUT',
      url: `${baseUrl}/api/posts/${props.id}`,
      data: body
    })
    .then((res) => {
      console.log("Post Updated Successfully");
      props.setIsEdit(false);
      updateGlobalPost(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <form className="row mt-3">
      <h3>Edit Post</h3>
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
        <select className="form-select form-select-sm bg-light mb-3" placeholder="Select Category" name="category" defaultValue={postData.category} onChange={handleChange} >
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
      <button type="button" onClick={updatePost} className="btn btn-primary">Update</button>
    </form>
  )
}

export default PostForm;