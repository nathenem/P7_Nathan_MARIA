import logo from "../assets/logo.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    if (localStorage.token) {
    }
  }, []);

  return (
    <>
      <header className="background">
        <a href="/">
          <img src={logo} alt="Logo Groupomania" />
        </a>
        {props.user && <p>{props.user.userName}</p>}
        {localStorage.token && <button onClick={logout}>Logout</button>}
      </header>
    </>
  );
};

export default Header;
