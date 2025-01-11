import { useState } from "react"
import { useGlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import getAnimation from "../assets/lotties/buttonOrange.json";
import { Fetch } from "../services/Fetch";
import { FormSigninRegisterUser } from "../components/common/formSigninRegisterUser/FormSigninRegisterUser";






export const SignIn = () => {
  const { setUserId, setToken } = useGlobalContext();
  const navigate = useNavigate()
  const [url, setUrl] = useState('')
  const [body, setBody] = useState({})
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { data } = Fetch(url, "POST", body)


  // When sign-in is successful, set the userId and token, then redirect to the homepage
  if (data && data.token && data.userId) {
    setUserId(data.userId);  // Set the user ID globally
    setToken(data.token);  // Set the authentication token globally
    navigate("/");  // Redirect to homepage after sign-in
    navigate(0);  // Reload the page

  }





  const handleSubmit = (e) => {
    e.preventDefault();// Prevent the default form submission behavior
    setUrl("signin");  // Set URL for the sign-in API endpoint
    // Send the email and password in the body of the request
    setBody({
      email,
      password,
    });

  };

  return (
    <article className="signInRegFormContainer">
      {/* Render the form component for sign-in */}
      <FormSigninRegisterUser
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        navigateTo="/register"
        image="https://i.ibb.co/sRxRDnJ/Product1.png"
        title="Sign in"
        newHereText="Don't have an account?"
        firstBtnText="Sign in"
        secondBtnText="Register Now"
        getAnimation={getAnimation}
        label={"signin"}
        setUrl={setUrl}
        url="signin"

      />


    </article>
  );
};