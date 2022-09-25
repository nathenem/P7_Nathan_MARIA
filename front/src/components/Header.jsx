import logo from "../assets/logo-white.png";
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
      navigate("/");
    }
  }, []);

  return (
    <div id="header_wrapper">
      <header id="header">
        <a className="logo header_button" href="/">
          <img className="logo" src={logo} alt="Logo Groupomania" />
        </a>
        <div className="header_features header_button">
          {props.user && <p className="user_name">@{props.user.userName}</p>}
          {localStorage.token && (
            <button className="logout_button" onClick={logout}>
              Déconnexion
            </button>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
