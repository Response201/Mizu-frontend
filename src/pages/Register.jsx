import { useState } from "react"
import { useNavigate } from "react-router-dom";
import getAnimation from "../assets/lotties/button.json";
import { Fetch } from "../services/Fetch";
import { FormSigninRegisterUser } from "../components/common/formSigninRegisterUser/FormSigninRegisterUser";


export const Register = () => {
  const navigate = useNavigate()
  const [url, setUrl] = useState('')
  const [body, setBody] = useState({})
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { data } = Fetch(url, "POST", body)
  const [message, setMessage] = useState('')

  // When registration is successful, navigate to sign-in page after a delay
  if (data && data.message === "Registration successful!") {
    if (!message) {
      setMessage("Registration successful!")

      setTimeout(() => {
        navigate("/signin") // Redirect to sign-in page after 7 seconds
      }, 7000)
    }

  }



  const handleSubmit = (e) => {
    e.preventDefault();
    const provider = "default";  // Default provider
    setUrl("createUser");       // Set URL for creating the user
    // Send the email and password in the body of the request
    setBody({
      email,
      password,
      provider
    });
  };

  return (
    <article className="signInRegFormContainer">
      {/* Render the form component for sign-up */}
      <FormSigninRegisterUser
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        navigateTo="/signin"
        image="https://i.ibb.co/qrGk06H/12.png"
        title="Create account"
        newHereText="All ready have an account?"
        firstBtnText="Register"
        secondBtnText="Sign In Now"
        getAnimation={getAnimation}
        color="rgb(25, 154, 154)"
        textColorMainBtn="rgb(25, 154, 154)"
        message={message}
        label="signup_with"
        setUrl={setUrl}
        url="createUser"

      />
    </article>
  );
};

