import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import { useGlobalContext } from '../../../context/GlobalContext';
import { FetchLogin } from '../../../services/FetchLogin';


// Function to dynamically load the Google Sign-In script
const loadScript = (src, onLoad) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = onLoad;
    document.body.appendChild(script);
};



/* GoogleSignIn component handles Google authentication, including login and registration */
const GoogleSignIn = ({ label, url, clientId }) => {
    const { setError, setToken, setUserId, setLoading } = useGlobalContext();
    const navigate = useNavigate();

    // Effect hook to handle Google Sign-In response after the component mounts
    useEffect(() => {
        async function handleCallbackResponse(response) {
            try {
                // Decode the JWT credential returned by Google
                const userObject = jwtDecode(response.credential);
                const current = Math.floor(Date.now() / 1000);

                // Check if the token is valid (i.e., not expired) and contains the email
                if (userObject.exp && userObject.exp > current && userObject.email) {
                    // Prepare data to be sent to the server for login/registration
                    const email = userObject.email;
                    const password = null;
                    const provider = "google";
                    const body = { email, password, provider };
                    setLoading(true)

                    // Make API call for login or registration - depending on the provided URL
                    const data = await FetchLogin(url, body);






                    // Handle server response for registration success 
                    if (data.message === "Registration successful!" && label === "signup_with") {
                        setLoading(false)
                        setError("Registration successful!")
                        setTimeout(() => {
                            navigate("/signin"); // navigate to "/signin"
                            navigate(0);
                        }, 5000);

                        // Handle server response for successful login
                    } else if (data.message === "Login with google" && data.token && data.userId) {
                        setLoading(false);
                        setToken(data.token);
                        setUserId(data.userId);
                        navigate("/"); // navigate to "/"
                        navigate(0);


                        // Handle errors from the API response

                    } else {
                        setLoading(false)
                        setError("Something went wrong");
                    }
                } else {
                    setLoading(false)
                    setError("Something went wrong");
                }
            } catch (err) {
                console.log(err)
                setLoading(false)
                setError("Something went wrong");
            }
        }


        // Load the Google Sign-In script and initialize the sign-in button
        loadScript("https://accounts.google.com/gsi/client?hl=en", () => {
            google.accounts.id.initialize({
                client_id: clientId,
                callback: handleCallbackResponse,

            });

            // Get the div element where the button will be rendered 
            const signInGoogle = document.getElementById("signInGoogle");
            if (signInGoogle) {
                google.accounts.id.renderButton(signInGoogle, {
                    type: "standard",
                    theme: "outline",
                    size: "medium",
                    text: label, // Set the text for the button (from the props => label)
                    shape: "pill",


                });
            } else {
                console.error('Element with id "signInGoogle" not found.');
            }
        });
    }, [clientId, navigate, label, setError, setLoading, setUserId, setToken]);

    return <div id="signInGoogle"></div>;  // Render the div where the Google Sign-In button will be placed
};

export default GoogleSignIn;
