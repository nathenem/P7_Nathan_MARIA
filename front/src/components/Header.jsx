import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <header>
        <a href="/">
          <img src={logo} alt="Logo Groupomania" style={{ width: 300 }} />
        </a>
        <button onClick={logout}>Logout</button>
      </header>
    </>
  );
};

export default Header;
