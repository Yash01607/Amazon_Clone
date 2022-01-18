import React, { useState } from "react";
import MessageBox from "../components/MessageBox";

function ContactScreen() {
  const [isSubmitted, setisSubmitted] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setisSubmitted(true);
  };

  return (
    <div className="main-pad">
      <h1>Contact US</h1>
      <h2>
        <strong>Address: </strong>
        Kapil Agencies, Maruti Mandir Complex, Marked Rd. Mehkar
      </h2>
      <h2>
        <strong>E-Mail: </strong>
        kapilagencies@yahoo.com admin-yash@kapilagencies.com
      </h2>
      <h2>
        <strong>Phone: </strong>
        1212121212, 4545454545, 9090909090
      </h2>

      <form className="Msg-form" onSubmit={onSubmitHandler}>
        <div>
          <p>CONTACT WITH US</p>
        </div>
        <div>
          <h1>{"Write Us A message"}</h1>
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

export default ContactScreen;
