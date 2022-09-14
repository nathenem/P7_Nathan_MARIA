import Header from "../components/Header.jsx";
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
        <div class="post">
          <p>Author</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <br></br>
          <img src={test} alt="image test post" style={{ width: 300 }} />
          <p>Date : XX/XX/XX - XX:XX</p>
        </div>
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
