import Post from "../components/Post.jsx";
import Header from "../components/Header.jsx";
import NewPostForm from "../components/NewPostForm.jsx";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer.jsx";

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
      <main className="background">
        {posts.map((post) => {
          return <Post post={post} />;
        })}
        <button onClick={newPost}>+</button> {/*New Post Button*/}
      </main>
      <main>
        <NewPostForm />
      </main>
      <Footer />
    </>
  );
};

export default Home;
