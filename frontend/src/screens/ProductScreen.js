import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { detailsProduct } from "../actions/productActions";
import { addToCart } from "../actions/CartActions";
import Rating from "../components/Rating";
import { Image } from "cloudinary-react";
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
  if (product && product.image && product.image.data) {
    console.log(product.image.data.public_id);
  }
  return (
    <div className="product-screen main-pad">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <div className="row top">
            {/* <div className="details"> */}
            <div className="col-1 image">
              {product && product.image && product.image.data && (
                <Image
                  cloudName="df7lcoica"
                  publicId={product.image.data.public_id}
                ></Image>
              )}
              {/* <img className="large" src={product.image} alt={product.id}></img> */}
            </div>
            <div className="col-1 prod">
              <ul>
                <li>
                  <h1 className="heading"> {product.name}</h1>
                </li>
                <li className="row price-rating">
                  <b>INR {product.price}/-</b>
                  <Rating
                    rating={product.rating}
                    numReviews={+product.numreviews}
                  ></Rating>
                </li>
                <li className="price-description">
                  <div>{product.description}</div>
                </li>
                <li>
                  <div className="row">Category : {product.category}</div>
                </li>
                <li>
                  <div className="row">Brand : {product.brand}</div>
                </li>
              </ul>
              <ul>
                <li>
                  <div className="row">
                    <div>
                      {" "}
                      Status :{" "}
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
                      Qty : {"  "}
                      <input
                        value={qty}
                        onChange={qtyChangeHandler}
                        type={"number"}
                        min={0}
                      ></input>
                      {qty > product.countInStock && (
                        <MessageBox variant="danger">
                          Only {product.countInStock} Available. Please enter a
                          value less than {product.countInStock}
                        </MessageBox>
                      )}
                    </li>
                    <li>
                      {product.countInStock > 0 && (
                        <>
                          <button
                            onClick={AddtoCartHandler}
                            className="block primary"
                          >
                            Add to Cart
                          </button>
                          <Link to="/cart">
                            <button
                              onClick={AddtoCartHandler}
                              className="block primary"
                            >
                              Buy Now
                            </button>
                          </Link>
                        </>
                      )}
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
          <h1>{product.name}</h1>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
