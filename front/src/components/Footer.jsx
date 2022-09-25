import logo from "../assets/groupomania-black.png";
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
      <div id="footer_wrapper">
        <footer id="footer_main">
          <a className="logo_footer" href="/">
            <img src={logo} alt="Logo Groupomania" />
          </a>
          <div className="footer_list">
            <ul>
              <li>Bienvenue sur le réseau intranet Groupomania.</li>
              {!localStorage.token && (
                <>
                  <li>Veuillez vous identifier pour accéder aux posts.</li>
                  <li>
                    Si vous n'avez pas de compte, inscrivez-vous simplement ici.
                  </li>
                </>
              )}
              {localStorage.token && (
                <>
                  <li>Pour créer un nouveau post, cliquez sur le bouton "+"</li>
                  <li>Vous pouvez ajouter des images à vos posts.</li>
                </>
              )}
            </ul>
            {localStorage.token && (
              <button onClick={deleteAccount}>Supprimer mon compte</button>
            )}
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
