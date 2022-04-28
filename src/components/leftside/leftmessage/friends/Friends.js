import { getAuth } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from 'react';
import { FaEllipsisV } from "react-icons/fa";
import './friends.css';

const Friends = () => {
  const db = getDatabase()
  const auth = getAuth()

  let [friend, setFriend] = useState([])

  useEffect(()=>{
    const friendAcceptRef = ref(db, 'AcceptFriends/');
    onValue(friendAcceptRef, (snapshot) => {
      let friendArr = []
      snapshot.forEach((friend)=>{
        if(friend.val().receiverId !== auth.currentUser.uid){
        friendArr.push(friend.val())
        }
      })
      setFriend(friendArr)
    });
  },[])

  return (
    <div className='friend__part'>
        <h3 className='friend__title'> MY friends</h3>
        {friend.map((itemF,i)=>(
          <div key={i}  className="friend__item">
                <div className="friend__img">
                    <img src={itemF.senderPicture} alt="prifile images" />
                </div>
                <div className="friend__details">
                    <div className="friend__name">
                        <h4>{itemF.senderName}</h4>
                    <h6>jjarjoiad</h6>
                    </div>
                    <div className="friend__btn">
                        <button type="button" ><FaEllipsisV /></button>
                    </div>
                </div>
            </div>
        ))}
           
      
    </div>
  )
}

export default Friends