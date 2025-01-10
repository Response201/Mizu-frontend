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



  if (data && data.token && data.userId) {

    setUserId(data.userId)
    setToken(data.token)
    navigate("/")
    navigate(0)

  }





  const handleSubmit = (e) => {
    e.preventDefault();

    setUrl("signin");
    setBody({
      email,
      password,
    });

  };

  return (
    <article className="signInRegFormContainer">
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