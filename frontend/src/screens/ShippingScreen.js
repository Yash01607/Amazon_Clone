import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { saveShipping } from "../actions/CartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = (props) => {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  // const cartDetails = useSelector((state) => state.cartDetails);
  // let shippingAddress = {};
  // if (cartDetails) {
  //   ({ shippingAddress } = cartDetails);
  // }
  if (!userInfo) {
    props.history.push("/signin");
  }

  // console.log(shippingAddress);

  const [fullName, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const dispatch = useDispatch();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(
      saveShipping({ fullName, address, city, postalCode, state, country })
    );
    props.history.push("/payment");
  };

  return (
    <div className="main-pad">
      <CheckoutSteps step1={true} step2={true}></CheckoutSteps>
      <form onSubmit={onSubmitHandler} className="form">
        <div>
          <h1 className="heading">Shipping Address</h1>
        </div>
        <div>
          {/* <label htmlFor="name">Full Name</label> */}
          <input
            value={fullName}
            type="text"
            name="text"
            id="address"
            key="address"
            required={true}
            placeholder="Enter Full Name"
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          {/* <label htmlFor="address">Address</label> */}
          <input
            value={address}
            type="text"
            required={true}
            name="address"
            id="address"
            key="address"
            placeholder="Enter Address"
            onChange={(e) => setAddress(e.target.value)}
          ></input>
        </div>
        <div>
          {/* <label htmlFor="city">City</label> */}
          <input
            value={city}
            type="text"
            required={true}
            name="city"
            id="city"
            key="city"
            placeholder="Enter City"
            onChange={(e) => setCity(e.target.value)}
          ></input>
        </div>
        <div>
          {/* <label htmlFor="state">State</label> */}
          <input
            value={state}
            type="text"
            name="state"
            id="state"
            required={true}
            key="state"
            placeholder="Enter State"
            onChange={(e) => setState(e.target.value)}
          ></input>
        </div>
        <div>
          {/* <label htmlFor="postalCode">Postal Code</label> */}
          <input
            value={postalCode}
            required={true}
            type="text"
            name="postalCode"
            id="postalCode"
            placeholder="Enter Postal Code"
            key="postalCode"
            onChange={(e) => setPostalCode(e.target.value)}
          ></input>
        </div>
        <div>
          {/* <label htmlFor="country">Country</label> */}
          <input
            value={country}
            type="text"
            name="country"
            required={true}
            id="country"
            key="country"
            placeholder="Enter Country"
            onChange={(e) => setCountry(e.target.value)}
          ></input>
        </div>
        <div>
          <button type="submit" className="button primary">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingScreen;
