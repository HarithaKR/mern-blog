import React, {useContext} from "react";
import Categories from "./Categories";
import { AppContext } from "./AppProvider";
import Posts from "./Posts";

const Home = () => {
  const {posts} = useContext(AppContext);
  return (
    <>
      <div className="col-8">
        <Posts posts = {posts} title={"Latest Posts"} />
      </div>
      <div className="col-4">
          <Categories />
      </div>
    </>
  )
}

export default Home;