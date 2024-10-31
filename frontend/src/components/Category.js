import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../App";
import Posts from "./Posts";

const Category = (props) => {
  const {catId: id} = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (id) {
      axios({
        url: `${baseUrl}/api/posts/category/${id}`,
        method: "GET",
        header: {
          "content-type": "application/json"
        }
      }).then((res) => {
        setPosts(res.data);
        setLoading(false);
      }).catch(() => {
        setError(true);
      })
    }
  }, []);

  return (
    error ? <h4 className="alert alert-danger">Something went wrong. Please try again!</h4> : 
    loading ? <h4>Loading...</h4> : (
      <Posts posts={posts} title={"List of Posts"} />
    )
  );
}

export default Category;