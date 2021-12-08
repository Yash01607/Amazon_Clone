import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listPoducts } from "../actions/productActions";
import Rating from "../components/Rating";
import MessageBox from "../components/MessageBox";

const HomeScreen = (props) => {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listPoducts());
  }, [dispatch]);

  // console.log(products);

  return loading ? (
    <div className="loading">Loading...</div>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <div className="row center">
        {products.map((product) => {
          // console.log(product.numReviews);
          return (
            <Link to={"/product/" + product._id} key={product._id}>
              <div key={product._id} className="card prod">
                <img
                  className="medium"
                  src={product.image}
                  alt={product.name}
                />
                <div className="card-body">
                    <h2 className="product-name">{product.name}</h2>
                  <Rating
                    rating={product.rating}
                    numReviews={+product.numreviews}
                  ></Rating>
                  <div className="price">
                    <b>INR. {product.price}</b>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HomeScreen;
