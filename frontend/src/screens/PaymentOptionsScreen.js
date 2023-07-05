import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { savePayment } from '../actions/CartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { useNavigate } from 'react-router';

const PaymentScreen = (props) => {
  const cartDetails = useSelector((state) => state.cartDetails);

  const navigate = useNavigate();

  const { shippingAddress } = cartDetails;
  if (!shippingAddress) {
    navigate('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('');

  const dispatch = useDispatch();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(savePayment({ paymentMethod }));
    navigate('/placeorder');
  };

  return (
    <div className="main-pad">
      <CheckoutSteps step1={true} step2={true} step3={true}></CheckoutSteps>
      <div>
        <form className="payment-option-form" onSubmit={onSubmitHandler}>
          <div>
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentScreen;
