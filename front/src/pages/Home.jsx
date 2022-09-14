import Post from "../components/Post.jsx";
import Post2 from "../components/Post2.jsx";
import Header from "../components/Header.jsx";
import NewPostForm from "../components/NewPostForm.jsx";

const Home = () => {
  return (
    <>
      <Header />
      <main class="component">
        <Post />
        <Post2 />
        <button>+</button> {/*New Post Button*/}
      </main>
      <main class="component">
        <NewPostForm />
      </main>
    </>
  );
};

export default Home;
