import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { createComment, detailsProduct } from '../actions/productActions';
import { addToCart } from '../actions/CartActions';
import Rating from '../components/Rating';
import { Image } from 'cloudinary-react';
import MessageBox from '../components/MessageBox';

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

  const [rating, setrating] = useState('');
  const [comment, setcomment] = useState('');

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successReviewCreate,
    loading: loadingReviewCreate,
    error: errorReviewCreate,
  } = productReviewCreate;

  const userSignIn = useSelector((state) => state.userSignIn);
  let userInfo = null;
  if (userSignIn.userInfo) {
    ({ userInfo } = userSignIn);
  }

  useEffect(() => {
    if (successReviewCreate) {
      window.alert('Review SUbmitted Successfully');
      setrating('');
      setcomment('');
      dispatch({ type: 'PRODUCT_REVIEW_CREATE_RESET' });
    }
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, successReviewCreate]);

  const qtyChangeHandler = (event) => {
    setQty(event.target.value);
  };

  const AddtoCartHandler = () => {
    dispatch(addToCart(productId, qty));
    navigate('/cart');
  };

  const reviewSubmitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createComment(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert('Please Enter Comment and Rating');
    }
  };

  if (errorReviewCreate) {
    console.log(errorReviewCreate);
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
                  <b>
                    <i className="fa fa-inr"></i>
                    {product.price}
                  </b>
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
                      {' '}
                      Status :{' '}
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
                      Qty : {'  '}
                      <input
                        value={qty}
                        onChange={qtyChangeHandler}
                        type={'number'}
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
          <div className="reviews">
            <h2>Reviews</h2>
            {product.reviews && product.reviews.length === 0 && (
              <MessageBox>There are no reviews yet.</MessageBox>
            )}
            {product.reviews && product.reviews.length > 0 && (
              <ul>
                {product.reviews.map((review) => (
                  <li key={review._id}>
                    <div className="row">
                      <div className="row">
                        <strong>{review.name} </strong>
                        <p className="review_date">
                          {' '}
                          Reviewd on {review.createdAt.substring(0, 10)}
                        </p>
                      </div>
                      <Rating rating={review.rating} numReviews=""></Rating>
                    </div>
                    <p>{review.comment}</p>
                  </li>
                ))}
              </ul>
            )}
            {userInfo ? (
              <form className="form" onSubmit={reviewSubmitHandler}>
                <div>
                  <h2>Write A Review</h2>
                </div>
                <div>
                  <select
                    id="rating"
                    value={rating}
                    onChange={(e) => setrating(e.target.value)}
                  >
                    <option value="">Select Rating</option>
                    <option value="1">1- Poor</option>
                    <option value="2">2- Fair</option>
                    <option value="3">3- Good</option>
                    <option value="4">4- Very Good</option>
                    <option value="5">5- Excellent</option>
                  </select>
                </div>
                <div>
                  <input
                    placeholder="Write A Review"
                    id="comment"
                    value={comment}
                    onChange={(e) => setcomment(e.target.value)}
                  ></input>
                </div>
                <div>
                  <button className="block primary" type="submit">
                    Submit Review
                  </button>
                </div>
                <div>
                  {loadingReviewCreate && <div>Saving...</div>}
                  {errorReviewCreate && (
                    <MessageBox variant="danger">
                      {errorReviewCreate}
                    </MessageBox>
                  )}
                </div>
              </form>
            ) : (
              <MessageBox>
                Please <Link to="/signin">Sign In</Link> to write a review.
              </MessageBox>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
