import { getAuth, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useState } from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import { FaFacebookF } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import "../firebaseConfig";
import google from "../images/google1.png";
import loadingfile from "../images/Infinity.svg";
import team1 from "../images/team1.png";
import team2 from "../images/team2.png";
import team3 from "../images/team3.png";
import logo from "../images/text-logo.png";
import './login.css';


const Login = () => {
    const auth = getAuth();

    let navigate = useNavigate()
    const provider = new GoogleAuthProvider()

   
    let [email, setEmail] = useState("")
    let [erremail, setErrEmail] = useState("")
    let [password, setPassword] = useState("")
    let [errpassword, setErrPassword] = useState("")
    let [err, setErr] = useState("")
    let [loading, setLoading] = useState(false)
    let [resetloading, setResetLoading] = useState(false)
    let [googleloading, setGoogleLoading] = useState(false)
    let [resetemail, setResetEmail] = useState("")
    let [errResetemail, setErrResetEmail] = useState("")
    let [successResetemail, setSuccessResetEmail] = useState("")

    

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }


    const handlelogin = (e) => {
        e.preventDefault()
        if(!email && !password) {
            setErr("Please Enter the value all Filed !")
        }else if(!email) {
            setErrEmail("Please Your email address !")
        }else if(!password) {
            setErrPassword("Please Your password Emtry !")
        }
        else {
            setLoading(true)
            signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                setEmail("")
                setErrEmail("")
                setPassword("")
                setErrPassword("")
                setErr("")
                const user = userCredential.user;
                navigate("/")
                setLoading(false)
               
            })
            .catch((error) => {
                setLoading(false)
                const errorCode = error.code;
                if(errorCode.includes("auth/wrong-password")){
                    setErr("")
                    setErrPassword("Your password worng , Please try agen !")
                }else if(errorCode.includes("auth/user-not-found")){
                    setErrPassword("")
                    setErr("Your email not a account, Please create accounte !")
                }
                console.log(errorCode)
            });
           
        }

    }

    // reset password functionalty working 
    const handleResetChange = (e) => {
        setResetEmail(e.target.value)
    }

    const handleResetPassword = (e) => {
        e.preventDefault()
        if(!resetemail) {
            setErrResetEmail("please your email in flied !")
        }else {
            setErrResetEmail("")
            setResetLoading(true)
            sendPasswordResetEmail(auth, resetemail).then(() => {
                setSuccessResetEmail("Password Reset Successfull and check your email !")
                setResetEmail("")
                setResetLoading(false)
            })
            .catch((error) => {
                const errorCode = error.code;
                if(errorCode.includes("auth/user-not-found")){
                    setErrResetEmail("Yore email not found !")
                }
                console.log(errorCode)
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
        <div className="login">
           <div className="login__full__content">
               <div className="login__main">
                   <div className="login__left">
                       <div className="login__text">
                            <div className="shap1"></div>
                            <img src={team1} alt="team" />
                            <img className='team2' src={team2} alt="team" />
                           <h2>Gigstart your Project with Hoot</h2>
                            <div className="shap2"></div> 
                            <img className='team3' src={team3} alt="team" />
                       </div>
                   </div>
                   <div className="login__right">
                       <div className="login__logo">
                           <img src={logo} alt="easychat logo" />
                       </div>
                       <div className="right__container">
                           <div className="login__form">
                               <h2>Login hyce</h2>
                               <div className="form__filed">
                                   <form action="#">
                                      
                                       <div className="form__group">
                                           <label htmlFor="">Email</label>
                                           <input style={err.includes("all") || erremail.includes("email") ? errfucos: errfucos2}  onChange={handleEmail} type="email" value={email} placeholder='Enter email here' />
                                           {erremail? <p className="err mt-2">{erremail}</p> : ""}

                                       </div>
                                       <div className="form__group">
                                           <div className="pass">
                                            <label htmlFor="">Password</label>
                                            <span onClick={handleShow}  className='forgot'>Forgot?</span>
                                            <Modal show={show} onHide={handleClose} animation={true}>
                                                <Modal.Header closeButton>
                                                <Modal.Title>Your Passawod Reseting</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Form>
                                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                                            <Form.Control value={resetemail} className="reset__email" style={errResetemail.includes("email") ? errfucos: errfucos2} type="email" placeholder="Please your email here" onChange={handleResetChange} />
                                                            {errResetemail ?
                                                                <p className="err mt-2">{errResetemail}</p>
                                                            :
                                                            
                                                                ""
                                                            }
                                                            {successResetemail ?
                                                                <p className="success mt-2">{successResetemail}</p>
                                                            :
                                                            
                                                                ""
                                                            }
                                                           
                                                        </Form.Group>
                                                    </Form>
                                                    
                                                </Modal.Body>
                                                <Modal.Footer>
                                                <Button variant="primary" onClick={handleResetPassword}>
                                                    {resetloading?
                                                        <img style={{height: "30px"}} src={loadingfile} alt="loading" /> 
                                                    :

                                                    "Reset password"
                                                    
                                                    }
                                                    
                                                </Button>
                                                </Modal.Footer>
                                            </Modal>
                                           </div>
                                           <input style={err.includes("all") || errpassword.includes("password") ? errfucos: errfucos2}  onChange={handlePassword} type="password" value={password} placeholder='Enter password here' />
                                           {errpassword? <p className="err mt-2">{errpassword}</p> : ""}
                                       </div>
                                       
                                       {err?<p className='err'>{err}</p> : ""}
                                       <button onClick={handlelogin} type="submit">
                                        {loading ? 
                                            <img style={{height: "40px"}} src={loadingfile} alt="loading" /> 
                                        :
                                            "Login"
                                        }
                                       </button>
                                   </form>
                               </div>
                           </div>
                           <div className="social__login">
                               <h3>Or login with</h3>
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
                               <p>Don't have an account yet? <Link className='login__linke' to="/signup">Sign up</Link> </p>
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
export default Login