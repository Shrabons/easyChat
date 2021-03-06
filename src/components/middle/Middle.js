import { getAuth } from "firebase/auth";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { getDownloadURL, getStorage, ref as imgRef, uploadBytesResumable } from "firebase/storage";
import moment from "moment";
import React, { useEffect, useState } from 'react';
import { BsThreeDots } from "react-icons/bs";
import { FaEllipsisV, FaFileImage, FaMicrophone, FaPaperPlane, FaPhoneAlt, FaVideo } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import attachFile from '../../images/attach_file.png';
import './middle.css';



const Middle = () => {
  const auth = getAuth()
  const db = getDatabase();
  const storage = getStorage();
  let [message, setMessage] = useState("")

  let [messageImg, setMessageImg] = useState()

  let [messageShow, setMessageShow] = useState([])


  let m = 101
  let useData = useSelector((item)=> item.activeManSelect)



  const handleChangeMessage = (e) => {
    setMessage(e.target.value)
  }
  let dateAndTime = new Date();
  let d = dateAndTime.toJSON()

  const handleImageSelect = (e) => {
    setMessageImg(e.target.files[0])
  }

  const handleSendMessage = () => {
    if(message){
      set(push(ref(db, 'messages/')), {
        mes: message,
        receiverId: auth.currentUser.uid,
        receiverName: auth.currentUser.displayName,
        senderId: useData.userId,
        senderName: useData.userName,
        date: d
      });
      setMessage("")
    }else if(messageImg) {
      // setMessageImgEnd(messageImg)
      console.log(messageImg)
      console.log("this is a pic update")
      const storageRef = imgRef(storage, `userImageSend/${auth.currentUser.uid}/${messageImg.name}`);
      const uploadTask = uploadBytesResumable(storageRef, messageImg);
        uploadTask.on('state_changed', (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          
          
        },
        (error) => {
          console.log(error)
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            set(push(ref(db, 'messages/')), {
              pic: downloadURL,
              receiverId: auth.currentUser.uid,
              receiverName: auth.currentUser.displayName,
              senderId: useData.userId,
              senderName: useData.userName,
              date: d
            });
          });
        },
        setMessageImg("")
        );
    }else{
      console.log("this is not message and pic")
    }
    
  
  }


  useEffect(()=>{
    const messageRef = ref(db, 'messages/');
    onValue(messageRef, (snapshot) => {
      let messageArr = []
      snapshot.forEach((mes)=>{
        let mesGet = {
          ...mes.val(),
          meskey: mes.key
        }
        messageArr.push(mesGet)
      })
      setMessageShow(messageArr)
    });
  },[])


  return (
    <div className='middle'>
      <div className="message__head">
        <div className="message__users">
          <div className="message__bio">
            <div className="message__bio__img">
              <img src={useData.picture} alt="progile" />
            </div>
            <div className="message__user_name">
              <h3>{useData.userName}</h3>
              <span>Active now</span>
            </div>
          </div>
          <div className="message__opation">
            <ul>
              <li><FaPhoneAlt /></li>
              <li><FaVideo /></li>
              <li><FaEllipsisV /></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="message__body">
      {messageShow.map((mesItem, i) => (
        mesItem.receiverId == useData.userId || mesItem.senderId == useData.userId  ?
        <div key={i} className="message__card mb-3" style={mesItem.senderId == useData.userId ? recieve : send}>
          <div className="message__img" style={mesItem.senderId == useData.userId ? imaghide : imagshow}>
             <img src={useData.picture} alt="pictures" /> 
          </div>
          <div className="message__text">
            <div className="text__card" style={mesItem.senderId == useData.userId ? texCartMe : texCartYou}>
            { mesItem.pic ?<Link to={mesItem.pic}> <img width={330} src={mesItem.pic} alt="se" /></Link> : <p>{mesItem.mes}</p>}
            </div>
            <span> {moment(mesItem.date).fromNow()}</span>
          </div>
          <div className="message__setting" style={mesItem.senderId == useData.userId ? btnwidth : imagshow}>
            <button type="button"> <BsThreeDots /></button>
          </div>
        </div>
        :
        ""
      ))}
        
      </div>
      <div className="message__footer">
        <div className="message__filed">
          <div className="message__input">
            <input value={message} onChange={handleChangeMessage} type="text" placeholder='Type your message....' />
              <button className="microphones"><FaMicrophone /></button>
            <div className="input__group">
              <button><img src={attachFile} alt="attach file iamge" /></button>
   
              <input  onChange={handleImageSelect} type="file" id="myfilesend" name="myfile" hidden/>
              <button> 
                <label  htmlFor="myfile"><FaFileImage /></label>
              </button>
            </div>
          </div>
          <div className="message__send">
           <button onClick={handleSendMessage} className="send__btn" type="button"><FaPaperPlane /></button>
          </div>
        </div>
      </div>
    </div>
  )
}

let send = {
  width: "450px",
  marginRight: "auto"
}
let recieve = {
  width: "450px",
  marginLeft: "auto",
  flexDirection:" row-reverse",
  marginRight: "5px"
}
let imaghide = {
  display: "none"
}
let imagshow = {
  display: "block"
}
let texCartMe = {
  background: "#F0F0F6",
  padding: "10px 15px",
  color: "#000",
  borderRadius: "15px",
  borderBottomRightRadius: 0,
}
let texCartYou = {
  background: "#4849a1",
  padding: "10px 15px",
  color: "#fff",
  borderRadius: "15px",
  borderBottomLeftRadius: 0,
}
let btnwidth = {
  width: "17%",
  textAlign: "end"
}
export default Middle