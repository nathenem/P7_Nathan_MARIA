import logo from "../assets/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Footer = (props) => {
  const navigate = useNavigate();
  const deleteAccount = () => {
    axios
      .delete(`http://localhost:3000/api/auth/${props.user._id}`)
      .then((res) => {
        console.log(res);
        localStorage.clear();
        navigate(0);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
  };

  return (
    <>
      <footer className="background">
        <a href="/">
          <img src={logo} alt="Logo Groupomania" />
        </a>
        {localStorage.token && (
          <button onClick={deleteAccount}>Delete Account</button>
        )}
      </footer>
    </>
  );
};

export default Footer;
