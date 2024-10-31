import React, { useEffect, useState } from "react";
import axios from "axios";

export const AppContext = React.createContext();

const AppProvider = (props) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const apiUrl = "http://localhost:8000/api/"

  useEffect(() => {
    axios.all([`${apiUrl}posts`,`${apiUrl}categories`].map((url) => axios.get(url)))
    .then((responses) => {
      const categoryIdMap = {};
      responses[1].data.forEach((cat) => {
        categoryIdMap[cat._id] = cat.name;
      })
      setState((prev) => ({
        ...prev,
        posts: responses[0].data,
        categories: responses[1].data,
        categoryIdMap
      }));
      setLoading(false);
    })
    .catch((err) => {
      setState((prev) => ({
        ...prev,
        posts: [],
        categories: []
      }));
      setError(true);
    })
  }, []);

  const updatePost = (updatedData) => {
    const newState = {...state};
    const index = newState.posts.findIndex((post) => post._id === updatedData._id);
    newState.post[index] = updatedData;
    setState(newState);
  }

  const deletePost = (id) => {
    const newState = {...state};
    const index = newState.posts.findIndex((post) => post._id === id);
    newState.posts.splice(index, 1);
    setState(newState);
  }

  const addPost = (post) => {
    const newState = {...state};
    newState.posts.push(post);
    setState(newState);
  }

  return (
    <AppContext.Provider value={{
      ...state,
      updatePost,
      deletePost,
      addPost
    }}>
      {loading ? <h4>Loading...</h4> : error ? <h4 className="alert alert-danger">Something went wrong. Please try again!</h4> : props.children}
    </AppContext.Provider>
  )
}

export default AppProvider;