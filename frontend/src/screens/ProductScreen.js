import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { detailsProduct } from "../actions/productActions";
import { addToCart } from "../actions/CartActions";
import Rating from "../components/Rating";
import MessageBox from "../components/MessageBox";

const ProductScreen = (props) => {
  const cart = useSelector((state) => state.cartDetails);
  let cartItems;
  if (cart) {
    ({ cartItems } = cart);
  }
  let initialQty = 1;
  const productId = props.match.params._id;
  const existingItem = cartItems.findIndex(
    (item) => item.product === productId
  );
  if (existingItem >= 0) {
    initialQty = cartItems[existingItem].qty;
  }

  const [qty, setQty] = useState(initialQty);

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);

  const { product, loading, error } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  const qtyChangeHandler = (event) => {
    setQty(event.target.value);
  };

  const AddtoCartHandler = () => {
    dispatch(addToCart(productId, qty));
    props.history.push("/cart");
  };

  return (
    <div>
      <div className="back-to-result">
        <Link to="/">Back to Home</Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <div className="row top">
            {/* <div className="details"> */}
            <div className="col-2 image">
              <img className="large" src={product.image} alt={product.id}></img>
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1 className="heading"> {product.name}</h1>
                </li>
                <li>
                  <Rating
                    rating={product.rating}
                    numReviews={+product.numreviews}
                  ></Rating>
                </li>
                <li>
                  Price: <b>INR {product.price}</b>
                </li>
                <li>
                  Description:
                  <div>{product.description}</div>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <div className="row">
                      <div>Price</div>
                      <div className="price">
                        <b>INR. {product.price}</b>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div> Status:</div>
                      <div>
                        {product.countInStock === 0 ? (
                          <span className="danger">Unavailable</span>
                        ) : (
                          <span className="success">In Stock</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {product.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          Qty:
                          <select value={qty} onChange={qtyChangeHandler}>
                            {[...Array(product.countInStock).keys()].map(
                              (x) => {
                                return (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                );
                              }
                            )}
                          </select>
                        </div>
                      </li>
                      <li>
                        {product.countInStock > 0 && (
                          <button
                            onClick={AddtoCartHandler}
                            className="block primary"
                          >
                            Add to Cart
                          </button>
                        )}
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <h1>{product.name}</h1>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
