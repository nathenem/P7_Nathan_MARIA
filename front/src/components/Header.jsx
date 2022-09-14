import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header class="component">
        <Link to="/login">Login</Link>
      </header>
    </>
  );
};

export default Header;
