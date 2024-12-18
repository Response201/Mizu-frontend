import { useState } from "react"
import { useFetch } from "../services/useFetch"
import { useGlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import getAnimation from "../assets/lotties/buttonOrange.json";

import { FormSigninRegisterUser } from "../components/FormSigninResisterUser/FormSigninRegisterUser";

export const SignIn = () => {
  const {setUserId, setToken, token, userId} = useGlobalContext();
 const navigate = useNavigate()
const [url, setUrl] = useState('')
const [body, setBody] = useState({})
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const {data} = useFetch(url, "POST", body)



if(data && data.token && data.userId){

setUserId(data.userId)
setToken(data.token)
navigate("/")


}

console.log(token, userId)

const handleSubmit = (e) => {
  e.preventDefault();

  setUrl("signin");
  setBody({
      email,
      password,
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
   navigateTo="/register"
   signInImage="https://i.ibb.co/sRxRDnJ/Product1.png"
   title="Sign in"
   newHereText="Don't have an account?"
      firstBtnText="Sign in"
     secondBtnText="Register Now"
 
   getAnimation={getAnimation}
   
   />
  </article>
);
};