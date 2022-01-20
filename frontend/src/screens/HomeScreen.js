import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listCategories } from "../actions/CategoryActions";
import { images } from "../utils";
import MessageBox from "../components/MessageBox";
import { Image } from "cloudinary-react";

const HomeScreen = (props) => {

  const categoryList = useSelector((state) => state.categoryList);
  const { categories, loading, error } = categoryList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  return (
    <div className="homescreen">
      <div id="slideshow-cont">
        {images.map((image) => (
          <Image cloudName="df7lcoica" publicId={image}></Image>
        ))}
      </div>

      <div className="title">
        <h3 className="title-intro">
          We have the best agricultural products...
        </h3>
        <h1 className="title-name">
          {" "}
          Welcome to<br></br> KAPIL AGENCIES
        </h1>
        <Link
          to={`/search/category/all/name/all/min/0/max/99999/rating/0/order/newest`}
        >
          <button className="title-button">Discover More</button>
        </Link>
      </div>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="categories-div">
          {categories.length === 0 && (
            <MessageBox>No Categories Found.</MessageBox>
          )}
          <div className="row center">
            {categories.map((category) => {
              // console.log(product.numReviews);
              return (
                <Link
                  to={`/search/category/${category.name}/name/all/min/0/max/99999/rating/0/order/newest`}
                >
                  <div key={category._id} className="category">
                    <h2>{category.name}</h2>
                    <p>{category.description}</p>
                    {category && category.image && category.image.data && (
                      <Image
                        cloudName="df7lcoica"
                        publicId={category.image.data.public_id}
                      ></Image>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
