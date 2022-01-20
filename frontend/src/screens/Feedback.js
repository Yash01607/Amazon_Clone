import React, { useState } from "react";
import MessageBox from "../components/MessageBox";

function Feedback() {
  const [isSubmitted, setisSubmitted] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setisSubmitted(true);
  };

  return (
    <div className="main-pad">
      <form className="Msg-form" onSubmit={onSubmitHandler}>
        <div>
          <p>HAVE A SUGGESTION</p>
        </div>
        <div>
          <h1>{"Write Us A Message"}</h1>
        </div>
        <div className="row">
          <div>
            {/* <label htmlFor="name">Name</label> */}
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Your Name"
              key="name"
            ></input>
          </div>
          <div>
            {/* <label htmlFor="price">Email Address</label> */}
            <input
              type="text"
              name="price"
              placeholder="Email Address"
              id="price"
              key="price"
            ></input>
          </div>
        </div>
        <div className="row">
          <div>
            {/* <label htmlFor="imageFile">Phone Number</label> */}
            <input
              type="text"
              name="price"
              placeholder="Phone Number"
              id="price"
              key="price"
            ></input>
          </div>
          <div>
            {/* <label htmlFor="countInStock">Subject</label> */}
            <input
              type="text"
              name="countInStock"
              placeholder="Subject"
              id="countInStock"
              key="countInStock"
            ></input>
          </div>
        </div>
        <div>
          {/* <label htmlFor="decsription">Write Message</label> */}
          <textarea
            type="text"
            name="description"
            id="description"
            placeholder="Write Message"
            key="description"
          ></textarea>
          {isSubmitted && (
            <div>
              <MessageBox variant="success">Message Sent.</MessageBox>
            </div>
          )}
          <div>
            <button type="submit" className="button primary">
              {"Send Message"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Feedback;
