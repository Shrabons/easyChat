import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, sendEmailVerification, signInWithPopup, updateProfile } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import React, { useState } from 'react';
import { FaCheck, FaFacebookF } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import "../firebaseConfig";
import google from "../images/google1.png";
import loadingfile from "../images/Infinity.svg";
import logo from "../images/text-logo.png";
import './signup.css';




const Signup = () => {

    const auth = getAuth();
    const db = getDatabase();

    let navigate = useNavigate()
    const provider = new GoogleAuthProvider();
    let [username, setUsername] = useState("")
    let [errusername, setErrUsername] = useState("")
    let [email, setEmail] = useState("")
    let [erremail, setErrEmail] = useState("")
    let [password, setPassword] = useState("")
    let [errpassword, setErrPassword] = useState("")
    let [cpassword, setCpassword] = useState("")
    let [errcpassword, setErrCpassword] = useState("")
    let [err, setErr] = useState("")
    let [loading, setLoading] = useState(false)
    let [googleloading, setGoogleLoading] = useState(false)

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleCpassword = (e) => {
        setCpassword(e.target.value)
    }

    const handleSignup = (e) => {
        e.preventDefault()

        if(!username && !email && !password && !cpassword) {
            
            setErr("Please Enter the value all Filed !")
        }else if(!username) {
            setErrUsername("Please Your UserName !")
        }else if(!email) {
            setErrEmail("Please Your email address !")
        }else if(!password) {
            setErrPassword("Please Your password Emtry !")
        }else if(password.length <= 7 || cpassword.length <= 7) {
            setErrPassword(" Your password must be 8 chrecaters !")
        }else if(password !== cpassword) {
            setErrCpassword(" Your password not mach !")
        }else {
            setLoading(true)
            createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
              updateProfile(auth.currentUser, {
                displayName: username, 
                photoURL: "https://images.vexels.com/media/users/3/145908/raw/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg?w=1800&fmt=webp"

              }).then(()=>{
                set(ref(db, 'users/' + auth.currentUser.uid), {
                    id: auth.currentUser.uid,
                    username: username,
                    email: email,
                    picture : auth.currentUser.photoURL
                  });
                
              }).then(() => {
                setUsername("")
                setEmail("")
                setPassword("")
                setCpassword("")
                setErr("")
                setErrUsername("")
                setErrEmail("")
                setErrPassword("")
                setErrPassword("")
                setErrCpassword("")
                setLoading(false)
                const user = userCredential.user;
                sendEmailVerification (user)
                navigate("/login")
              }).catch((error) => {
                const errorCode = error.code;
                if(errorCode.includes("auth/email-already-in-use")){
                    setErrEmail("Your Email already in use !")
                }
                console.log(error)
              });

                
            })
            .catch((error) => {
              const errorCode = error.code;
              if(errorCode.includes("auth/email-already-in-use")){
                setErrEmail("Your Email already in use !")
              }
             
            });
        }

    }

     // google login function working 
     const handleGoogleLogin = () => {
        setGoogleLoading(true)
        signInWithPopup(auth, provider).then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            setGoogleLoading(false)
            navigate("/")
            console.log(user)
        }).catch((error) => {
            console.log(error)
        });
    }
  return (
    <>
        <div className="signup">
           
            <div className="signup__full__content">
                <div className="signup__main">
                    <div className="signup__left">
                        <div className="signup__text">
                            <p className='short__des'>We help you connect the brightest minds of tomorrow, today!</p>
                            <div className="signup__free">
                                <div className="signup__free__heading">
                                    <span><FaCheck /></span>
                                    <h3>Free sign up</h3>
                                </div>
                                <p>Very easy to sign up. and ues its completely free. so let's start</p>
                            </div>
                            <div className="signup__free">
                                <div className="signup__free__heading">
                                    <span><FaCheck /></span>
                                    <h3>Financial freedom</h3>
                                </div>
                                <p>Yes, you heard id right! You will get financial liberty Now bear aparment rent on your wun</p>
                            </div>
                            <div className="signup__free">
                                <div className="signup__free__heading">
                                    <span><FaCheck /></span>
                                    <h3>Hire best talent</h3>
                                </div>
                                <p>We have got ther brighttext minds of the world accessible at the click of a button</p>
                            </div>
                        </div>
                    </div>
                    <div className="signup__right">
                        <div className="signup__logo">
                            <img src={logo} alt="easychat logo" />
                        </div>
                        <div className="right__container">
                            <div className="signup__form">
                                <h2>Sign up</h2>
                                <div className="form__filed">
                                    <form action="#">
                                        <div className="form__group">
                                            <label htmlFor="">Full name</label>
                                            <input style={err.includes("all") || errusername.includes("UserName") ? errfucos: errfucos2} onChange={handleUsername} type="text" value={username} placeholder='Enter full name here' />
                                            {errusername? <p className="err mt-2">{errusername}</p> : ""}
                                        </div>
                                        <div className="form__group">
                                            <label htmlFor="">Email</label>
                                            <input style={err.includes("all") || erremail.includes("email") ? errfucos: errfucos2}  onChange={handleEmail} type="email" value={email} placeholder='Enter email here' />
                                            {erremail? <p className="err mt-2">{erremail}</p> : ""}

                                        </div>
                                        <div className="form__group">
                                            <label htmlFor="">Create password</label>
                                            <input style={err.includes("all") || errpassword.includes("password") ? errfucos: errfucos2}  onChange={handlePassword} type="password" value={password} placeholder='Enter password here' />
                                            {errpassword? <p className="err mt-2">{errpassword}</p> : ""}
                                        </div>
                                        <div className="form__group">
                                            <label htmlFor=""> Confirm password</label>
                                            <input style={err.includes("all") || errcpassword.includes(" not mach") ? errfucos: errfucos2}  onChange={handleCpassword} type="password" value={cpassword} placeholder='Enter Confirm password here' />
                                            {errcpassword? <p className="err mt-2">{errcpassword}</p> : ""}
                                        </div>
                                        {err?<p className='err'>{err}</p> : ""}
                                        <button onClick={handleSignup} type="submit">
                                        {loading ? 
                                            <img style={{height: "40px"}} src={loadingfile} alt="loading" /> 
                                        :
                                            "Sign up "
                                         }
                                        
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <div className="social__signup">
                                <h3>Or sign up with</h3>
                                <div className="social__button">
                                    <button onClick={handleGoogleLogin} className='google' type="button"> <img style={{width: "22px", marginRight:"15px"}} src={google} alt="google" />
                                        {googleloading ? 
                                            <img style={{height: "33px"}} src={loadingfile} alt="loading" />
                                        :
                                            "Google"
                                        }
                                    </button>
                                    <button className='facebooks' type="button"> <FaFacebookF className='fb' /> Facebook</button>
                                </div>
                                <p>Already have an account? <Link className='login__linke' to="/login">Login</Link> </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

const errfucos = {
    border: "1px solid red"
}
const errfucos2 = {
    border: "none"
}

export default Signup