import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import { useGlobalContext } from '../../../context/GlobalContext';
import { FetchLogin } from '../../../services/FetchLogin';

const loadScript = (src, onLoad) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = onLoad;
    document.body.appendChild(script);
};

const GoogleSignIn = ({ label, url, clientId }) => {
    const { setError, setToken, setUserId, setLoading } = useGlobalContext();
    const navigate = useNavigate();

    console.log("label", label, "url", url,)

    useEffect(() => {
        async function handleCallbackResponse(response) {
            try {
                const userObject = jwtDecode(response.credential);
                const current = Math.floor(Date.now() / 1000);

                if (userObject.exp && userObject.exp > current && userObject.email) {

                    const email = userObject.email;
                    const password = null;
                    const provider = "google"
                    console.log("URL", url)
                    const body = { email, password, provider };
                    setLoading(true)
                    const data = await FetchLogin(url, body);







                    if (data.message === "Registration successful!" && label === "signup_with") {
                        setLoading(false)
                        setError("Registration successful!")
                        setTimeout(() => {
                            navigate("/signin");
                            navigate(0)
                        }, 5000);
                    } else if (data.message === "Login with google" && data.token && data.userId) {
                        setLoading(false)
                        setToken(data.token)
                        setUserId(data.userId)
                        navigate("/")
                        navigate(0)


                    } else {
                        setLoading(false)
                        setError("Something went wrong")
                    }
                } else {
                    setLoading(false)
                    setError("Something went wrong")
                }
            } catch (err) {
                console.log(err)
                setLoading(false)
                setError("Something went wrong")
            }
        }

        loadScript("https://accounts.google.com/gsi/client?hl=en", () => {
            google.accounts.id.initialize({
                client_id: clientId,
                callback: handleCallbackResponse,

            });

            const signInGoogle = document.getElementById("signInGoogle");
            if (signInGoogle) {
                google.accounts.id.renderButton(signInGoogle, {
                    type: "standard",
                    theme: "outline",
                    size: "medium",
                    text: label,
                    shape: "pill",


                });
            } else {
                console.error('Element with id "signInGoogle" not found.');
            }
        });
    }, [clientId, navigate, label, setError, setLoading, setUserId, setToken]);

    return <div id="signInGoogle"></div>;
};

export default GoogleSignIn;
