import Header from "../components/Header";
import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";

const Login = () => {
  /*const selectOption = (data) => {
   
  };*/

  return (
    <>
      <Header />
      <main>
        <p>Select Option</p>
        <div>
          <button>Login</button>
          <button>Sign up</button>
        </div>
        <LoginForm />
        <SignupForm />
      </main>
    </>
  );
};

export default Login;
