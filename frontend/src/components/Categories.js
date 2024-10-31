import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./AppProvider";

const Categories = (props) => {
  const {categories} = useContext(AppContext);
  return (
    <div className="row mt-3 categories-block">
      <h4>Categories</h4>
      <div className="categories-list">
          {categories && categories.length > 0 ? (
            categories.map((category) => {
              return (
                <div className="category-item" key={category._id}>
                  <Link to={`/categories/${category._id}`}>{category.name}</Link>
                </div>
              )
            })
          ) : (
            <h4>No Categories to list </h4>
          )}
      </div>
    </div>
    
  )
}

export default Categories;