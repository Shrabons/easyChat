import { getAuth } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import prifile from '../../../images/profile.png';
import prifile2 from '../../../images/profile2.jpeg';
import prifile3 from '../../../images/team2.png';
import Friends from './friends/Friends';
import './leftmessage.css';
import Request from './request/Request';



const MessageMember = () => {
  const db = getDatabase()
  const auth = getAuth()
  let dispatch = useDispatch()
  let [search, setSearch] = useState(false)
  let [allConversation, setAllConversation] = useState(true)
  let [myFrieds, setMyFriends] = useState(false)
  let [myRequest, setMyRequest] = useState(false)
  let [gorup, setGroup] = useState(false)
  let [allfriend, setAllFriend] = useState([])
  let [select, setSelect] = useState([])
 

  const handleSearch = () => {
    setAllConversation(false)
    setMyFriends(false)
    setMyRequest(false)
    setGroup(false)
    setSearch(true)
  }

  const handleSearchClose = () => {
    
    setSearch(false)
  }
  const handleAllConversatons = () =>{
    setMyFriends(false)
    setMyRequest(false)
    setGroup(false)
    setSearch(false)
    setAllConversation(true)
  }
  const handleFrieds = () =>{
    setMyRequest(false)
    setGroup(false)
    setSearch(false)
    setAllConversation(false)
    setMyFriends(true)
  }
  const handleGroup = () =>{
    setMyFriends(false)
    setMyRequest(false)
    setSearch(false)
    setAllConversation(false)
    setGroup(true)
  }
  const handleFriedsRequest = () =>{
    setMyFriends(false)
    setSearch(false)
    setAllConversation(false)
    setGroup(false)
    setMyRequest(true)
  }
  useEffect(()=>{
    const allfriendAcceptRef = ref(db, 'AcceptFriends/');
    onValue(allfriendAcceptRef, (snapshot) => {
      let allfriendArr = []
      snapshot.forEach((friend)=>{
        if(friend.val().receiverId == auth.currentUser.uid){
          allfriendArr.push(friend.val())
        }
      })
      setAllFriend(allfriendArr)
    });
  },[])

  const handleSelectUser = (senderId,senderName,senderPicture) => {
    setSelect(senderId)
    dispatch({type:"ACTIVE_USER", payload:{userid:senderId, username:senderName, userpic: senderPicture }})
    
  }

  return (
    <div className='messsage__app'>
      {/* message head  */}
      <div className="head">
        <div className="message__head d-flex justify-content-between align-items-center">
        <div className="logo">
          <h2>EasyChat</h2>
        </div>
          <div className="search">
            <button onClick={handleSearch}><FaSearch /></button>
          </div>
        </div>
        {search?
          <div className="search__input">
            <input type="text" placeholder="Searching the value" />
            <button onClick={handleSearchClose} type="submit">Search</button>
            
          </div>
          :
          ""
        }
      </div>

        {/* messsage menu start  */}
      <div className="message__menu">
        <ul className='d-flex justify-content-between align-items-center mt-4'>
          <li onClick={handleAllConversatons} className="current">All</li>
          <li onClick={handleFrieds}>Friends</li>
          <li onClick={handleFriedsRequest}>Request</li>
          <li onClick={handleGroup}>Group</li>
        </ul>
      </div>

     {/* person start */}
     {allConversation?
      <div className="all__convsatons">
        <div className="personal">
          <h3 className='personal__title'>personal</h3>
          <div className="member">
            {allfriend.map((itemFAll, i)=>(
              <div key={i} className="member__item" onClick={()=>handleSelectUser(itemFAll.sendId,itemFAll.senderName,itemFAll.senderPicture)} style={select == itemFAll.sendId ? selectMan :noselectMan}>
                <div className="member__img">
                  <img src={itemFAll.senderPicture} alt="prifile images" />
                </div>
                <div className="member__details">
                  <div className="member__name">
                    <h4 style={select == itemFAll.sendId ? selectTitle : noselectTitle}>{itemFAll.senderName}</h4>
                    <h6>2 hour ago</h6>
                  </div>
                  <div className="list__message">
                    <p>{itemFAll.sendId}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="team">
          <h3 className='team__title'>Team</h3>
          <div className="team__member">
            <div className="team__item">
              <div className="team__img">
                <img className="team__one" src={prifile} alt="prifile images" />
                <img className="team__two" src={prifile2} alt="prifile images" />
                <img className="team__three" src={prifile3} alt="prifile images" />
              </div>
              <div className="team__details">
                <div className="team__name">
                  <h4>javascript bangla</h4>
                  <h6>54 minutes ago</h6>
                </div>
                <div className="team__list__message">
                  <p>amader new group kaj cholitec. dekhat jak ki hy.</p>
                </div>
              </div>
            </div>
            <div className="team__item">
              <div className="team__img">
                <img className="team__one" src={prifile} alt="prifile images" />
                <img className="team__two" src={prifile2} alt="prifile images" />
                <img className="team__three" src={prifile3} alt="prifile images" />
              </div>
              <div className="team__details">
                <div className="team__name">
                  <h4>mern bangledesh</h4>
                  <h6>54 minutes ago</h6>
                </div>
                <div className="team__list__message">
                  <p>amader new group kaj cholitec. dekhat jak ki hy.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      :
      ""
     }
     { myFrieds ?<Friends />: ""}
     { myRequest ?<Request  />: ""}
     
  </div>
  )
}
// #e30a0a 
const selectMan = {
  background: "linear-gradient(0deg, #E5E5E5 0%, #F9F9FC 54.8%)",
  borderBottom: "3px solid rgb(72, 73, 161)"
}
const noselectMan = {
  background: "transparent"
}
const selectTitle = {
  color: "rgb(72, 73, 161)"
}
const noselectTitle = {
  color: "#000"
}
export default MessageMember