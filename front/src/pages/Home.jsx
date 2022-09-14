import Post from "../components/Post.jsx";
import logo from "../assets/logo.png";
import test from "../assets/test.jpg";

const Home = () => {
  return (
    <>
      <header>
        <a href="/">
          <img src={logo} alt="Logo Groupomania" style={{ width: 300 }} />
        </a>
        <form>
          <a href="/login">Logout</a>
        </form>
      </header>
      <br></br>
      <br></br>
      <main class="component">
        <br></br>
        <br></br>
        <Post />
        <br></br>
        <br></br>
        <button>+</button>
      </main>
      <br></br>
      <br></br>
      <main class="component">
        <br></br>
        <br></br>
        <form>
          <p>New post</p>
          <br></br>
          <div>
            <label>Text Content</label>
            <input type="Text" />
          </div>
          <br></br>
          <div>
            <label>Image</label>
            <input type="file" accept=".png,.jpeg,.jpg" />
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </div>
        </form>
      </main>
    </>
  );
};

export default Home;
