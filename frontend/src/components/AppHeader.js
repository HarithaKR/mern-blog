import React from "react";
import "./AppHeader.css";

const AppHeader = () => {
  return (
    <div className="app-header row">
      <ul className="nav">
        <li className="nav-header"><a href="/">My Blog</a></li>
        <li className="nav-item"><a href="/">Home</a></li>
        <li className="nav-item"><a href="/posts">Posts</a></li>
        <li className="nav-item"><a href="/">About</a></li>
        <li className="nav-item"><a href="/">Contact</a></li>
      </ul>
    </div>
  )
}

export default AppHeader;