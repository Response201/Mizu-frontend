import { useState } from "react"
import { useFetch } from "../services/useFetch"
import { useGlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";


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
      <section className="signInContent">
          <form onSubmit={handleSubmit}>
          <img src="https://i.ibb.co/sRxRDnJ/Product1.png" alt="" />
          <div className="overlay"></div>
            
              <h1>Sign in</h1>
              <section className="signin___content">
                  <label>
                      <span>Email</span>
                      <input
                          type="email"
                          className="hover-target"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                      />
                  </label>
                  <label>
                      <span>Password</span>
                      <input
                          type="password"
                          className="hover-target"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                      />
                  </label>
              </section>
              <section className="signin___btn">
                  <button className="hover-target" type="submit">
                      Sign in
                  </button>
              </section>
          </form>
          
          <section className="signInContent___imgContainer">
              <img src="https://i.ibb.co/sRxRDnJ/Product1.png" alt="" />
              <div className="overlay"></div>
              <div>
                  <h2>New here?</h2>
                  <button
                      className="hover-target"
                      onClick={() => {
                        navigate("/register")
                        
                      }}
                  >
                      Create User
                  </button>
              </div>
          </section>
      </section>
  </article>
);
};