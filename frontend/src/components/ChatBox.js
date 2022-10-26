import React, { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { ENDPOINT } from '../utils';

const ChatBox = (props) => {
  const { userInfo } = props;
  // console.log(userInfo);
  const [socket, setsocket] = useState(null);
  const uiMessagesRef = useRef(null);
  const [isOpen, setisOpen] = useState(false);
  const [messageBody, setmessageBody] = useState('');
  const [messages, setmessages] = useState([
    { name: 'Admin', body: 'Hello there, Please Ask your Question.' },
  ]);

  useEffect(() => {
    if (uiMessagesRef.current) {
      uiMessagesRef.current.scrollBy({
        top: uiMessagesRef.current.clientHeight,
        left: 0,
        behavior: 'smooth',
      });
    }
    if (socket) {
      socket.emit('onLogin', {
        _id: userInfo.id,
        name: userInfo.name,
        isAdmin: userInfo.isAdmin,
      });
      socket.on('message', (data) => {
        setmessages([...messages, { body: data.body, name: data.name }]);
      });
    }
  }, [messages, isOpen, socket, userInfo]);

  const supportHandler = () => {
    setisOpen(true);
    if (!socket) {
      const sk = socketIOClient(ENDPOINT);
      // console.log(sk);
      setsocket(sk);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    e.preventDefault();
    if (!messageBody.trim()) {
      alert('Please type a message.');
    } else {
      setmessages([...messages, { body: messageBody, name: userInfo.name }]);
      setmessageBody('');
      setTimeout(() => {
        socket.emit('onMessage', {
          body: messageBody,
          name: userInfo.name,
          isAdmin: userInfo.isAdmin,
          _id: userInfo.id,
        });
      }, 1000);
    }
  };

  const closeHandler = () => {
    setisOpen(false);
  };

  return (
    <div className="chatbox">
      {!isOpen ? (
        <button type="button" onClick={supportHandler}>
          <i className="fa fa-support"></i>
        </button>
      ) : (
        <div className="card card-body">
          <div className="row">
            <strong>Support</strong>
            <button type="button" onClick={closeHandler}>
              <i className="fa fa-close"></i>
            </button>
          </div>
          <ul ref={uiMessagesRef}>
            {messages.map((msg, index) => (
              <li key={index}>
                <strong>{`${msg.name}: `}</strong>
                {msg.body}
              </li>
            ))}
          </ul>
          <div>
            <form onSubmit={onSubmitHandler} className="row">
              <input
                value={messageBody}
                onChange={(e) => setmessageBody(e.target.value)}
                type="text"
                placeholder="Type Message"
              ></input>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
