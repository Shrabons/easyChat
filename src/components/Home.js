import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './home.css';
import Leftside from "./leftside/Leftside";
import Middle from "./middle/Middle";
import Rightside from "./rightside/Rightside";

const Home = () => {
    const auth = getAuth();
    let navigate = useNavigate()
  
    let [emailV, setEmailV] = useState(false)
    let [username, setUsername] = useState("")
    let [photoUrl, setPhotoUrl] = useState("")
   

    onAuthStateChanged(auth, (user) => {
        if (user) {
          setUsername(user.displayName)
          setPhotoUrl(user.photoURL)
        } else {
          navigate("/login")
        }
      });

   
  return (


    <>
    <div className="easychat__app">
        <Leftside />
        <Middle />
        <Rightside username={username} imagurl={photoUrl} />
    </div>
  </>
      /* <>
      {emailV?
            <>
                <div className="easychat__app">
                    <Leftside />
                    <Middle />
                    <Rightside />
                </div>
            </>
    
    :
        <>
        <h2>please Your email verification !</h2>
        <button onClick={handleLogout} type="button">log out</button>
        </>

    }
    </> */
  )
}

export default Home