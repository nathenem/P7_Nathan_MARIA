import Post from "../components/Post.jsx";
import Header from "../components/Header.jsx";
import NewPostForm from "../components/NewPostForm.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.token) {
      navigate("/login");
    }

    axios.get("http://localhost:3000/api/posts").then((res) => {
      setPosts(res.data);
    });
  }, []);

  const newPost = () => {}; //display NewPostForm ==> TODO

  return (
    <>
      <Header />
      <main class="component">
        {posts.map((post) => {
          return <Post post={post} />;
        })}
        <button onClick={newPost}>+</button> {/*New Post Button*/}
      </main>
      <main class="component">
        <NewPostForm />
      </main>
    </>
  );
};

export default Home;
