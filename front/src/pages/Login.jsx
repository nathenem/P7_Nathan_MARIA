import Header from "../components/Header";
import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useState } from "react";

const Login = () => {
  const [option, setOption] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    setOption(0);
    if (localStorage.token) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Header />
      <main className="login_main">
        {option === 0 && (
          <div className="select_option">
            <button
              className="select_button"
              onClick={() => {
                setOption(1);
              }}
            >
              S'identifier
            </button>
            <button
              className="select_button"
              onClick={() => {
                setOption(-1);
              }}
            >
              S'inscrire
            </button>
          </div>
        )}
        {option === 1 && (
          <>
            <button
              className="return_button"
              onClick={() => {
                setOption(0);
              }}
            >
              &#62; Retour &#60;
            </button>
            <LoginForm />
          </>
        )}
        {option === -1 && (
          <>
            <button
              className="return_button"
              onClick={() => {
                setOption(0);
              }}
            >
              &#62; Retour &#60;
            </button>
            <SignupForm />
          </>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Login;
