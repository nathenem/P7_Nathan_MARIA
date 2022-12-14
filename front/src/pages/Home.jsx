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
  const [user, setUser] = useState();
  const [newPost, setNewPost] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:3000/api/auth/profile")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });

    axios
      .get("http://localhost:3000/api/posts")
      .then((res) => {
        console.log(res.data);
        setPosts(res.data.sort((a, b) => new Date(b.date) - new Date(a.date)));
        //setPosts(res.data.reverse());
        console.log(posts);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
  }, []);

  const displayNewPost = () => {
    setNewPost(!newPost);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  /*const sortPost = () => {
    posts
      .sort((a, b) => {
        return b.date - a.date;
      })
      .reverse();
    return posts;
  };*/

  return (
    <>
      <Header user={user} />
      <main id="main_home">
        <div className="new_post">
          {!newPost && (
            <button onClick={displayNewPost}>
              <i className="fa-solid fa-feather-pointed"></i>
            </button>
          )}
          {newPost && (
            <button onClick={displayNewPost}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          )}
        </div>
        {newPost && <NewPostForm />}
        <div id="post_wrapper">
          {posts.map((post, index) => {
            return <Post key={`${post}-${index}`} post={post} user={user} />;
          })}
        </div>
      </main>
      <Footer user={user} />
    </>
  );
};

export default Home;
