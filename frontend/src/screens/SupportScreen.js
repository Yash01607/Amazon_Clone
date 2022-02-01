import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import socketIOClient from "socket.io-client";

import MessageBox from "../components/MessageBox";

let allUsers = [];
let allMessages = [];
let allSelectedUser = {};
const ENDPOINT = "http://127.0.0.1:5000";

const SupportScreen = () => {
  const [selectedUser, setselectedUser] = useState({});
  const [socket, setSocket] = useState(null);
  const uiMessagesRef = useRef(null);
  const [messageBody, setMessageBody] = useState("");
  const [messages, setmessages] = useState([]);
  const [users, setusers] = useState([]);

  const userSignIn = useSelector((state) => state.userSignIn);
  let userInfo = null;
  if (userSignIn.userInfo) {
    ({ userInfo } = userSignIn);
  }

  // console.log(messages, "allmessages");

  useEffect(() => {
    if (uiMessagesRef.current) {
      uiMessagesRef.current.scrollBy({
        top: uiMessagesRef.current.clientHeight,
        left: 0,
        behavior: "smooth",
      });
    }

    if (!socket) {
      const sk = socketIOClient(ENDPOINT);
      setSocket(sk);
      sk.emit("onLogin", {
        _id: userInfo.id,
        name: userInfo.name,
        isAdmin: userInfo.isAdmin,
      });
      sk.on("message", (data) => {
        if (allSelectedUser._id === data._id) {
          console.log("a");
          allMessages = [...allMessages, data];
        } else {
          const existUser = allUsers.find((user) => user._id === data._id);
          if (existUser) {
            allUsers = allUsers.map((user) =>
              user._id === existUser._id ? { ...user, unread: true } : user
            );
            setusers(allUsers);
          }
          allMessages = [...allMessages, data];
          // console.log(allMessages, "message");
        }
        setmessages(allMessages);
      });
      sk.on("updateUser", (updatedUser) => {
        const existUser = allUsers.find((user) => user._id === updatedUser._id);
        if (existUser) {
          allUsers = allUsers.map((user) =>
            user._id === existUser._id ? updatedUser : user
          );
          setusers(allUsers);
        } else {
          allUsers = [...allUsers, updatedUser];
          setusers(allUsers);
        }
      });
      sk.on("listUsers", (updatedUsers) => {
        allUsers = updatedUsers;
        setusers(allUsers);
      });
      sk.on("selectUser", (user) => {
        console.log(user, "a");
        allMessages = user && user.messages ? user.messages : [];
        setmessages(allMessages);
      });
    }
  }, [socket, users, userInfo]);

  const selectUser = (user) => {
    allSelectedUser = user;
    setselectedUser(allSelectedUser);
    const existUser = allUsers.find((x) => x._id === user._id);
    if (existUser) {
      allUsers = allUsers.map((x) =>
        x._id === existUser._id ? { ...x, unread: false } : x
      );
      setusers(allUsers);
    }
    socket.emit("onUserSelected", user);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!messageBody.trim()) {
      alert("Please type a message.");
    } else {
      allMessages = [
        ...allMessages,
        { body: messageBody, name: userInfo.name },
      ];
      setmessages(allMessages);
      setMessageBody("");
      setTimeout(() => {
        // console.log(selectedUser._id);
        if (selectedUser._id) {
          socket.emit("onMessage", {
            _id: selectedUser._id,
            body: messageBody,
            name: userInfo.name,
            isAdmin: userInfo.isAdmin,
          });
        }
      }, 1000);
    }
  };

  return (
    <div className="row top full-container main-pad">
      <div className="col-1 support-users">
        <div className="row">
          <strong>{userInfo.name}</strong>
        </div>
        {users.filter((x) => x._id !== userInfo.id).length === 0 ? (
          <MessageBox>No Users Online</MessageBox>
        ) : (
          <ul>
            {users
              .filter((x) => x._id !== userInfo.id)
              .map((user) => (
                <li
                  key={user._id}
                  className={user._id === selectedUser._id ? "selected" : " "}
                >
                  <button
                    // className="block"
                    type="button"
                    onClick={() => selectUser(user)}
                  >
                    {user.name}
                  </button>
                  <span
                    className={
                      user.unread
                        ? "unread"
                        : user.online
                        ? "online"
                        : "offline"
                    }
                  ></span>
                </li>
              ))}
          </ul>
        )}
      </div>
      <div className="col-3 support-messages">
        {!selectedUser._id ? (
          <MessageBox>Select a user to start a chat.</MessageBox>
        ) : (
          <div>
            <div className="row">
              <strong>Chat with {selectedUser.name}</strong>
            </div>
            <ul ref={uiMessagesRef}>
              {messages.length === 0 ? (
                <li>No Messages yet.</li>
              ) : (
                messages.map((msg, index) => (
                  <li key={index}>
                    <strong>{`${msg.name}: `}</strong>
                    {msg.body}
                  </li>
                ))
              )}
            </ul>
            <div>
              <form onSubmit={onSubmitHandler} className="chat-box row">
                <input
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  type={"text"}
                  placeholder="Type Message"
                ></input>
                <button type="submit">Send</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportScreen;
