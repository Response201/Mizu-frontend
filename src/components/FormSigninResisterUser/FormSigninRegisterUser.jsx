

import { MainButton } from '../lottieBtn/MainBtn.jsx';
import { useGlobalContext } from '../../context/GlobalContext.jsx';
import { useEffect, useState } from 'react';
import GoogleSignIn from '../google/Google.jsx'
import { BarLoader } from '../barLoader/BarLoader.jsx';

export const FormSigninRegisterUser = ({
    title = "Sign in",
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    navigateTo,
    signInImage = "https://i.ibb.co/sRxRDnJ/Product1.png",
    newHereText = "New here?",
    firstBtnText = "",
    secondBtnText = "",
    getAnimation,
    color = " #dd912e",
    textColorMainBtn = "#dd912e",
    message='',
    label="signin",
    url, 
    setUrl
}) => {

    const { error, setError, loading } = useGlobalContext();
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);


    // validera epost
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;


    // validera lösenord: minst en stor bokstav, ett specialtecken 
    // och vara mellan 6 och 10 tecken lång
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,10}$/;

    useEffect(() => {

        if (passwordRegex.test(password)) {
            setIsPasswordValid(true);
        } else {
            setIsPasswordValid(false);
        }
    }, [password]);



    useEffect(() => {

        if (emailRegex.test(email)) {
            setIsEmailValid(true);
        } else {
            setIsEmailValid(false);
        }
    }, [email]);


    useEffect(() => {
        if(error){
        setUrl('')
        setEmail('')
        setPassword('')}
      
      }, [error, setUrl, setEmail,setPassword])




    return (
        <section className="signInContent">
            <form onSubmit={isEmailValid && isPasswordValid ? handleSubmit : (e) => { e.preventDefault(), setError("Fill out form") }}>
                <img src={signInImage} alt="Sign In" />
                <div className="overlay"></div>

                <h1 style={{ '--color': `${color}` }}>{title}</h1>
                <section className="signin___content">
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
                            {password.length >= 1 && <>
                                {!isPasswordValid ? <i className="bi bi-x"></i> : <i className="bi bi-check"></i>}</>
                            }

                        </span>



                    </label>
                </section>
                <section className='errorContainer'>


                    {loading && !error && !message &&   <BarLoader /> }





                    {error && <p style={{ '--color': `${color}` }}> {error}   </p>}
                    {message && <p style={{ '--color': `${color}` }}> {message}   </p>}
                </section>
                <section className="signin___btn">
                    <button className="hover-target" type="submit">
                        <MainButton text={firstBtnText} getAnimation={getAnimation} textColorMainBtn={textColorMainBtn} />
                    </button>

                    <GoogleSignIn   
                    url={url}
                    label={label}
        clientId= {`${import.meta.env.VITE_CLIENTID}`}
         />
                </section>


            </form>

            <section className="signInContent___imgContainer" style={{ '--color': `${color}` }}>
                <img src={signInImage} alt="image text" />
                <div className="overlay"></div>
                <div>
                    <h2 style={{ '--color': `${color}` }}>{newHereText}</h2>
                    <a
                    href={navigateTo}
                        className="hover-target"
                       
                    >
                        <MainButton text={secondBtnText} getAnimation={getAnimation} textColorMainBtn={textColorMainBtn} />
             
                    </a>
                </div>
            </section>
        </section>
    );
};

