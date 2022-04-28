import { getAuth } from "firebase/auth";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import React, { useEffect, useState } from 'react';
import './request.css';


const Request = () => {
    const db = getDatabase();
    const auth = getAuth();

    let [requers, setRequest] = useState([])
    let [reqPic, setReqPic] = useState("")
    let [requersClose, setRequestClose] = useState(false)

    useEffect(()=>{
        const userRef = ref(db, 'users/');
        onValue(userRef, (snapshot) => {
            let userReqArr = []
            snapshot.forEach((userReqman)=> {
                
                if(userReqman.val().id !== auth.currentUser.uid){
                    userReqArr.push(userReqman.val())
                }else{
                    setReqPic(userReqman.val().picture)
                }
                setRequest(userReqArr)
            })
        
        });
    },[])

    let timeset = new Date()
    let d = timeset.toJSON()
    const handleRequestFriend = (id, username, imageurl) => {
        set(push(ref(db, 'RequestFriends/')), {
            senderName: auth.currentUser.displayName,
            sendId: auth.currentUser.uid,
            senderPicture : reqPic,
            receiverName: username,
            receiverId: id,
            receiverPicture: imageurl,
            date: d
          });
        
    }

  return (
    <div className="request__part">
        <h3 className='request__title'>friends request</h3>
        <div className="request__control">
            {requers.map((requestItem, i) =>(
                <div key={i} className="request__item">
                    <div className="request__img">
                        <img src={requestItem.picture} alt="prifile images" />
                    </div>
                    <div className="request__details">
                        <div className="request__name">
                        <h4>{requestItem.username}</h4>
                        <h6>author</h6>
                        </div>
                        <div className="request__btn">
                        <button type="button" onClick={()=>handleRequestFriend(requestItem.id, requestItem.username, requestItem.picture)}>request</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Request