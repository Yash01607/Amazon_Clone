import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { savePayment } from "../actions/CartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = (props) => {
  const cartDetails = useSelector((state) => state.cartDetails);
  const { shippingAddress } = cartDetails;
  if (!shippingAddress) {
    props.history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("");

  const dispatch = useDispatch();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(savePayment({ paymentMethod }));
    props.history.push("/placeorder");
  };

  return (
    <div>
      <CheckoutSteps step1={true} step2={true} step3={true}></CheckoutSteps>
      <div>
        <form className="form" onSubmit={onSubmitHandler}>
          <div>
            <h1 className="heading">Payment Method</h1>
          </div>
          <div>
            <div>
              <input
                type="radio"
                name="paymentMethod"
                id="paypal"
                value="paypal"
                key="paymentMethod"
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></input>
              <label htmlFor="paypal">Paypal</label>
            </div>
          </div>
          <div>
            <div>
              <input
                type="radio"
                name="paymentMethod"
                id="Net-Banking"
                value="Net-Banking"
                key="paymentMethod"
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></input>
              <label htmlFor="Net-Banking">Net-Banking</label>
            </div>
          </div>
          <div>
            <button type="submit" className="primary">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentScreen;
