import { getAuth, signOut } from "firebase/auth";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { getDownloadURL, getStorage, ref as imgRef, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from 'react';
import { Dropdown, Modal, ProgressBar } from 'react-bootstrap';
import { FaPencilAlt, FaRegBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import groupPic from '../../images/group.png';
import media1 from '../../images/media1.jpg';
import media2 from '../../images/media2.jpg';
import media3 from '../../images/media3.jpg';
import myprofile from '../../images/myprofile.jpeg';
import groupAdminPic from '../../images/profile.png';
import groupmember from '../../images/profile2.jpeg';
import Accept from "./accept/Accept";
import './rightside.css';




const Rightside = (props) => {

  const db = getDatabase();
  const storage = getStorage();

  const auth = getAuth();
  let navigate = useNavigate()
  const [loadingProgress, setLoadingProgress] = useState("");
  const [profileshow, setProfileShow] = useState(false);
  const [profileUp, setProfileUp] = useState("");
  const [suProfileUp, setSuProfileUp] = useState("");
  const [errprofileUp, setErrProfileUp] = useState("");
  const [usernames, setusername] = useState("");
  const [images, setImages] = useState("");
  const [upname, setUpname] = useState("");
  const [errupname, setErrUpname] = useState("");
  let [usernameEdit, setUsernameEdit] = useState(false)
  const [reqshow, setReqShow] = useState(false);
  

  const handleNameEdit = () => {
    setUsernameEdit(true)
  }

  const handleNameClose = () => {
    setUsernameEdit(false)
   
  }
 

  const handleCloseReq = () => setReqShow(false);
  const handleShowReq = () => setReqShow(true);

  const handleCloseProfile = () => setProfileShow(false);
  const handleShowProfile = () => setProfileShow(true);

  let handleLogout = () => {
    signOut(auth).then(() => {
        navigate("/login")
      }).catch((error) => {
        console.log(error)
      });
  }

  useEffect(()=> {
    const usersRef = ref(db, 'users/');
    onValue(usersRef, (snapshot) => {
      snapshot.forEach((myuser)=> {
        if(myuser.val().id == auth.currentUser.uid){
          
          setProfileUp(myuser.val().picture)
          setusername(myuser.val().username)
          
        }
       
      })
     
    });
  },[])

  // profile image update and user name or email 

  const handleImage = (e) => {
    setImages(e.target.files[0])
  }

  const handleUpName = (e) => {
    setUpname(e.target.value)
  }


  const handleProfileEdit = () => {
    if(!images){
      setErrProfileUp("Please Your profile Picture not a chocse !")
    }else{
      setErrProfileUp("")
      const storageRef = imgRef(storage, `userProfileImage/${auth.currentUser.uid}/${images.name}`);
      const uploadTask = uploadBytesResumable(storageRef, images);
        uploadTask.on('state_changed', (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          setLoadingProgress(progress)
          
        },
        (error) => {
          console.log(error)
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            set(ref(db, 'users/' + auth.currentUser.uid), {
              username: auth.currentUser.displayName,
              email: auth.currentUser.email,
              picture : downloadURL,
              id: auth.currentUser.uid,
              
            });
          });
        },
        setSuProfileUp("Succuss full Your profile picture !")
        );
    }
   
  }

  const handleUserNameEdit = (e) => {
    e.preventDefault()
    if(!upname) {
      setErrUpname("Please Your username in a field !")
    }else {
      set(ref(db, 'users/' + auth.currentUser.uid), {
        username: upname,
        email: auth.currentUser.email,
        picture : profileUp,
        id: auth.currentUser.uid
      });
      setUsernameEdit(false)
    }
  }

  return (
      <>
        <div className='right'> 
          <div className="right__main">
            <div className="right__profile">
              <div className="right__notifcation">
                <button onClick={handleShowReq} className="btn__bell"><FaRegBell /></button>
                <div className="notifaction__active"></div>
                <Modal show={reqshow} onHide={handleCloseReq}>
                  <Modal.Header closeButton>
                    <Modal.Title>Friends Request</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                     <Accept />
                  </Modal.Body>
                </Modal>
              </div>
                <div className="right__user">
                  <div className="profile__img">
                    <img src={profileUp} alt="my profile" />
                  </div>
                  
                    <div className="profile__name">
                      <Dropdown>
                        <Dropdown.Toggle className="profile__title" id="dropdown-basic">
                        {usernames}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={handleShowProfile} > My Profile</Dropdown.Item>
                          <Dropdown.Item onClick={handleLogout} >Log out</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      {/* profile edit  */}
                      <Modal show={profileshow} onHide={handleCloseProfile}>
                        <Modal.Header closeButton>
                          <Modal.Title>Profile Edit</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <div  className="my__profile">
                            <h5>My Id : </h5>
                            <div className="change__img d-flex  ">
                              <div className="profile__img__edit mr-3">
                                <img src={profileUp} alt="update images" />
                                <label className="create__file" htmlFor="myfile"><FaPencilAlt /></label>
                                <input onChange={handleImage}  type="file" id="myfile" name="myfile" hidden/>
                              </div>
                              <div className="ms-4 update__btn">
                                <button className="pic__updeate mb-2" onClick={handleProfileEdit} type="button">Update</button>
                                {errprofileUp? <p className="err">{errprofileUp}</p> : ""}
                                
                                {loadingProgress? <ProgressBar className="my-2" variant="success" now={loadingProgress} label={`${loadingProgress}%`} /> : ""}
                                {suProfileUp? <p className="success">{suProfileUp}</p> : ""}
                              </div>
                            </div>
                            <div className="profile__details">
                            {usernameEdit?
                            <form action="#" >
                                <div className="form__group">
                                  <label htmlFor="">User Name</label>
                                  <input onChange={handleUpName} id="username" type="text" placeholder="Enter the value" />
                                </div>
                                {errupname? <p className="err">{errupname}</p> : ""}
                                <button onClick={handleUserNameEdit} className="username__save"  type="submit">Save</button>
                                <button onClick={handleNameClose} className="username__close"  type="button">Close</button>
                              </form>
                            :
                              <div className="profile_title_user">
                              <h4>User Name</h4>
                              <span>{usernames}</span>
                              <button onClick={handleNameEdit} type="button" className="name__edit"><FaPencilAlt /></button>
                            </div>
                            
                            } 
                            </div>
                          </div>
                        </Modal.Body>
                      </Modal>
                    </div>
                </div>
            
            </div>
            <div className="right__body">
              <div className="group">
                <img className="group__profile__img" src={groupPic} alt="group" />
                <h3>group name</h3>
                <div className="group__main">
                  <div className="group__admin">
                    <img src={groupAdminPic} alt="admin images" />
                    <h4>name name</h4>
                    <span>Admin</span>
                  </div>
                  <div className="group__member">
                    <img src={groupmember} alt="member images" />
                    <img src={groupPic} alt="member images" />
                    <img src={myprofile} alt="member images" />
                    <img src={groupmember} alt="member images" />
                    <img src={myprofile} alt="member images" />
                    <img src={groupmember} alt="member images" />
                    <img src={groupAdminPic} alt="member images" />
                    <img src={groupPic} alt="member images" />
                  </div>
                </div>
              </div>
              <div className="photo">
                <div className="photo__resent">
                  <h3>photos & muultimedia</h3>
                  <div className="photo__img">
                    <img src={media1} alt="media images" />
                    <img src={media2} alt="media images" />
                    <img src={media3} alt="media images" />
                    <img src={media1} alt="media images" />
                    <img src={media2} alt="media images" />
                    <img src={media3} alt="media images" />
                  </div>
                </div>
              </div>
              <div className="attachment"></div>
            </div>
          </div>
        </div>  
      </>
  )
}

export default Rightside