import { getAuth } from "firebase/auth";
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import moment from "moment";
import React, { useEffect, useState } from 'react';
import './accept.css';


const Accept = () => {
    const db = getDatabase()
    const auth = getAuth()
    let [accept, setAccept] = useState([])
    let [one, setOne] = useState(false)
   

    useEffect(() => {
        const starCountRef = ref(db, 'RequestFriends/' );
        onValue(starCountRef, (snapshot) => {
            let acceptArr = []
            snapshot.forEach((acceptItem)=> {
                if(acceptItem.val().receiverId == auth.currentUser.uid){
                    let myAccetpt = {
                        ...acceptItem.val(),
                        acceptkey: acceptItem.key
                    }
                    acceptArr.push(myAccetpt)
                }
                setAccept(acceptArr)
            })
        });
       
    },[])

    const handleAcceptDelete = (id) => {
        const accetdeleteRef = ref(db, `RequestFriends/${id}` );
        remove(accetdeleteRef)
        setOne(!one)
        console.log("deltet")
    }


    // accept Friends 
    const handleAcceptFriends = (receiverId,receiverName,receiverPicture,senderId,senderName,senderPicture) => {
        set(push(ref(db, 'AcceptFriends/')), {
            senderName: senderName,
            sendId: senderId,
            senderPicture : senderPicture,
            receiverName: receiverName,
            receiverId: receiverId,
            receiverPicture: receiverPicture,
            
        });
    }
        
  return (
    <div className='accept__part'>
        {accept.map((itemAcc, i)=>(
            <div key={i}  className="accept__item">
                <div className="accept__img">
                    <img src={itemAcc.senderPicture} alt="prifile images" />
                </div>
                <div className="accept__details">
                    <div className="accept__name">
                        <h4>{itemAcc.senderName}</h4>
                    <h6>{moment(itemAcc.date).fromNow()}</h6>
                    </div>
                    <div className="accept__btn">
                        <button type="button" onClick={()=> handleAcceptFriends(itemAcc.receiverId, itemAcc.receiverName, itemAcc.receiverPicture, itemAcc.sendId, itemAcc.senderName, itemAcc.senderPicture)} >accept</button>
                        <button type="button" className="ms-2 bg-danger" onClick={()=> handleAcceptDelete(itemAcc.acceptkey)} >Delete</button>
                    </div>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Accept