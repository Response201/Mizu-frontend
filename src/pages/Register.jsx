import { useState } from "react"
import { useFetch } from "../services/useFetch"
import { useNavigate } from "react-router-dom";
import getAnimation from "../assets/lotties/button.json";

import { FormSigninRegisterUser } from "../components/FormSigninResisterUser/FormSigninRegisterUser";

export const Register = () => {


  const navigate = useNavigate()
  const [url, setUrl] = useState('')
  const [body, setBody] = useState({})
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { data } = useFetch(url, "POST", body)
const [message, setMessage] = useState('')


  if (data && data.message === "Registration successful!") {


if(!message){
    setMessage("Registration successful!")


    setTimeout(() => {
      navigate("/signin")
    }, 7000)}

  }



  const handleSubmit = (e) => {
    e.preventDefault();
    const provider = "default"
    setUrl("createUser");
    setBody({
      email,
      password,
      provider
    });
  };

  return (
    <article className="signInContainer">
      <FormSigninRegisterUser

        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        navigateTo="/signin"
        signInImage="https://i.ibb.co/qrGk06H/12.png"
        title="Create account"
        newHereText="All ready have an account?"
        firstBtnText="Register"
        secondBtnText="Sign In Now"
        getAnimation={getAnimation}
        color="rgb(25, 154, 154)"
        textColorMainBtn="rgb(25, 154, 154)"
        message={message}
      />
    </article>
  );
};

