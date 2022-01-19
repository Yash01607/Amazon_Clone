import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listPoducts } from "../actions/productActions";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";
import { prices, ratings } from "../utils";
import { Image } from "cloudinary-react";
import { listCategories } from "../actions/CategoryActions";

function SearchScreen(props) {
  const {
    name = "all",
    category = "all",
    min = 0,
    max = 99999,
    rating = 0,
    order = "newest",
  } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      listPoducts({
        name: name !== "all" ? name : " ",
        category: category !== "all" ? category : " ",
        min,
        max,
        rating,
        order,
      })
    );
    dispatch(listCategories());
  }, [dispatch, name, category, max, min, rating, order]);

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  // const productCategoryList = useSelector((state) => state.productCategoryList);
  // const {
  //   loading: loadingCategories,
  //   error: errorCategories,
  //   categories,
  // } = productCategoryList;

  const categoryList = useSelector((state) => state.categoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = categoryList;

  // useEffect(() => {
  //   dispatch(listCategories());
  // }, [dispatch]);

  const getFilterUrl = (filter) => {
    // console.log(filter);
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;

    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}`;
  };

  return (
    <div className="main-pad">
      <div className="row">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>{products.length} Results</div>
        )}
      </div>
      <div className="row top">
        <div className="col-1 search-sidebar">
          <div>
            <h3>Category</h3>
            <div>
              {loadingCategories ? (
                <p>Loading...</p>
              ) : errorCategories ? (
                <MessageBox variant="danger">{errorCategories}</MessageBox>
              ) : categories === undefined ? (
                <p>No product found</p>
              ) : categories.length === 0 ? (
                <MessageBox variant="danger">No Products Found</MessageBox>
              ) : (
                <select
                  value={category}
                  onChange={(e) => {
                    props.history.push(
                      getFilterUrl({ category: e.target.value })
                    );
                  }}
                >
                  <option value="all" key="all">
                    All
                  </option>
                  {categories.map((category) => {
                    return (
                      <option key={category.name} value={category.name}>
                        {category.name}
                      </option>
                    );
                  })}
                </select>
              )}
            </div>
          </div>
          <div>
            <h3>Sort by:</h3>
            <select
              value={order}
              onChange={(e) => {
                props.history.push(getFilterUrl({ order: e.target.value }));
              }}
            >
              <option key="newest" value="newest">
                Newest Arrival
              </option>
              <option key="lowest" value="lowest">
                Price Low to High
              </option>
              <option key="highest" value="highest">
                Price High to Low
              </option>
              <option key="toprated" value="toprated">
                Avg. Customer Reviews
              </option>
            </select>
          </div>
          <div>
            <h3>Price Range</h3>
            <ul>
              {prices.map((p) => (
                <Link
                  className={
                    `${p.min}-${p.max}` === `${min}-${max}` ? "active" : ""
                  }
                  to={getFilterUrl({ min: p.min, max: p.max })}
                >
                  <li key={p.name}>{p.name}</li>
                </Link>
              ))}
            </ul>
          </div>
          <div>
            <h3>Avg. Customer Review</h3>
            <ul>
              {ratings.map((r) => (
                <li key={r.name}>
                  <Link
                    className={`${r.rating}` === `${rating}` ? "active" : ""}
                    to={getFilterUrl({ rating: r.rating })}
                  >
                    <Rating caption={` &up`} rating={r.rating}></Rating>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-3">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <div>
              {products.length === 0 && (
                <MessageBox>No Products Found.</MessageBox>
              )}
              <div className="row center">
                {products.map((product) => {
                  return (
                    <Link to={"/product/" + product._id} key={product._id}>
                      <div key={product._id} className="card">
                        {product && product.image && product.image.data && (
                          <Image
                            cloudName="df7lcoica"
                            publicId={product.image.data.public_id}
                          ></Image>
                        )}
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
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchScreen;
