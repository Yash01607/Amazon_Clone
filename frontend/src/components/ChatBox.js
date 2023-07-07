import React, { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { ENDPOINT } from '../utils';
import { Image, Transformation } from 'cloudinary-react';

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
        <div className="chatbox-icon">
          <Image
            onClick={supportHandler}
            cloudName="df7lcoica"
            publicId={'Chatbox_Icon_jquxck'}
          >
            <Transformation width="100" height="100" crop="limit" />
          </Image>
        </div>
      ) : (
        <div className="card card-body chatbox-box">
          <div className="row">
            <strong>Support</strong>
            <button type="button" onClick={closeHandler}>
              <i className="fa fa-close"></i>
            </button>
          </div>
          <div className="chatbox-msglist">
            <ul ref={uiMessagesRef}>
              {messages.map((msg, index) => (
                <li
                  key={index}
                  className={`chatbox-li-${
                    msg.name === 'Admin' ? 'grey' : 'blue'
                  }`}
                >
                  <strong>{`${msg.name}: `}</strong>
                  {msg.body}
                </li>
              ))}
            </ul>
          </div>
          <div className="chatbox-send">
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
