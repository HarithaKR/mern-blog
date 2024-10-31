import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import AppHeader from "./components/AppHeader";
import "./style.css";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import Home from "./components/Home";
import AppProvider, {AppContext} from "./components/AppProvider";
import Category from "./components/Category";
import Post from "./components/Post";
import Posts from "./components/Posts";
import AddPostForm from "./components/AddPostForm";

export const baseUrl = "http://localhost:8000";

const App = () => {
  return (
    <div className="container">
      <AppHeader />
      <div className="page-content row">
        <AppProvider>
          <Router>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/add-post" element={<AddPostForm />} />
              <Route exact path="/posts" element={
                <AppContext.Consumer>
                  {({posts}) => {
                    return <Posts posts={posts} title={"List of posts"} />
                  }}
                </AppContext.Consumer>
              } />
              <Route exact path="/categories/:catId" element={<Category />} />
              <Route exact path="/categories/:catId/add-post" element={<AddPostForm />} />
              <Route exact path="/posts/:postId" element={<Post />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Router>
        </AppProvider>
      </div>
      <Footer />
    </div>
  )
}

export default App;