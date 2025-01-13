

import { MainButton } from '../lottieBtn/MainBtn.jsx';
import { useGlobalContext } from '../../../context/GlobalContext.jsx';
import { useEffect, useState } from 'react';
import GoogleSignIn from '../Google/Google.jsx'
import { BarLoader } from '../barLoader/BarLoader.jsx';

/*  A reusable component that renders either a sign-in or sign-up form based on the provided props */
export const FormSigninRegisterUser = ({
    title = "Sign in",
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    navigateTo,
    image = "https://i.ibb.co/sRxRDnJ/Product1.png",
    newHereText = "New here?",
    firstBtnText = "",
    secondBtnText = "",
    getAnimation,
    color = " #dd912e",
    textColorMainBtn = "#dd912e",
    message = '',
    label = "signin",
    url,
    setUrl
}) => {

    const { error, setError, loading } = useGlobalContext();
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);


    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;


    // Validate password: at least one uppercase letter, one special character, and 6-10 characters long
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,10}$/;




    // Validate password whenever it changes
    useEffect(() => {

        if (passwordRegex.test(password)) {
            setIsPasswordValid(true);
        } else {
            setIsPasswordValid(false);
        }
    }, [password]);


    // Validate email whenever it changes
    useEffect(() => {

        if (emailRegex.test(email)) {
            setIsEmailValid(true);
        } else {
            setIsEmailValid(false);
        }
    }, [email]);


    // Clear form fields if there is an error
    useEffect(() => {
        if (error) {
            setUrl('')
            setEmail('')
            setPassword('')
        }

    }, [error, setUrl, setEmail, setPassword])




    return (
        <section className="signInRegFormContent">
            <form onSubmit={isEmailValid && isPasswordValid ? handleSubmit : (e) => { e.preventDefault(), setError("Fill out form") }}>
                <img src={image} alt="Sign In" />
                <div className="overlay"></div>

                <h1 style={{ '--color': `${color}` }}>{title}</h1>
                <section className="signInRegFormContent___content">
                    <label style={{ '--color': `${color}` }}>
                        <span>Email</span>
                        <input
                            placeholder='Enter your email (e.g. user@example.com)'
                            type="email"
                            className="hover-target"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <span className="icon" style={{ '--color': `${color}` }}>
                            {/* Show validation icon based on email validity */}
                            {email.length >= 1 && <>{!isEmailValid ? <i className="bi bi-x"></i> : <i className="bi bi-check"></i>}

                            </>}



                        </span>



                    </label>
                    <label style={{ '--color': `${color}` }}>
                        <span>Password</span>
                        <input
                            type="password"
                            placeholder='min 6 chars, 1 uppercase, 1 special char'
                            className="hover-target"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            minLength={6}
                            maxLength={10}
                            required
                        />
                        <span className="icon" style={{ '--color': `${color}` }}>
                            {/* Show validation icon based on password validity */}
                            {password.length >= 1 && <>
                                {!isPasswordValid ? <i className="bi bi-x"></i> : <i className="bi bi-check"></i>}</>
                            }

                        </span>



                    </label>
                </section>



                <section className='errorContainer'>

                    {/* Show loading spinner while submitting */}
                    {loading && !error && !message && <BarLoader />}

                    {/* Display error or success message */}
                    {error && <p style={{ '--color': `${color}` }}>  {{error}    </p>}

                    {message && <p style={{ '--color': `${color}` }}>  {message}  </p>}

                </section>




                <section className="signInRegFormContent___btn">


                    {/* Main submit button */}
                    <button className="hover-target" type="submit">
                        <MainButton text={firstBtnText} getAnimation={getAnimation} textColorMainBtn={textColorMainBtn} />
                    </button>


                    {/* Google Sign-In button */}
                    <GoogleSignIn
                        url={url}
                        label={label}
                        clientId={`${import.meta.env.VITE_CLIENTID}`}
                    />

                </section>
            </form>



            <section className="signInRegFormContent___imgContainer" style={{ '--color': `${color}` }}>
                <img src={image} alt="image text" />
                <div className="overlay"></div>
                <div className='sidBarContainer'>
                    <h2 style={{ '--color': `${color}` }}>{newHereText}</h2>

                    {/* Link to navigate to sign-up page for new users */}
                    <a href={navigateTo} className="hover-target linkBtnContainer">
                        <MainButton text={secondBtnText} getAnimation={getAnimation} textColorMainBtn={textColorMainBtn} />
                    </a>
                </div>
            </section>




        </section>
    );
};

