import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listCategories, saveCategory } from "../actions/CategoryActions";
import { images } from "../utils";
import MessageBox from "../components/MessageBox";
import axios from "axios";

const HomeScreen = (props) => {
  // const productList = useSelector((state) => state.productList);
  // const { products, loading, error } = productList;
  // const dispatch = useDispatch();
  const [name, setName] = useState(" ");
  const [image, setImage] = useState(" ");
  const [description, setDescription] = useState(" ");

  // const [index, setindex] = useState(0);

  const [loadingUpload, setloadingUpload] = useState(false);
  const [errorUpload, seterrorUpload] = useState("");

  const categoryList = useSelector((state) => state.categoryList);
  const { categories, loading, error } = categoryList;
  const dispatch = useDispatch();

  const categorySave = useSelector((state) => state.categorySave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = categorySave;

  const userSignIn = useSelector((state) => state.userSignIn);
  let userInfo = null;
  if (userSignIn.userInfo) {
    ({ userInfo } = userSignIn);
  }

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  const uploadFileHandler = async (e) => {
    // console.log(e.target.files);
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setloadingUpload(true);
    try {
      const { data } = await axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer${userInfo.token}`,
        },
      });
      setImage(data);
      setloadingUpload(false);
    } catch (error) {
      setloadingUpload(false);
      seterrorUpload(error.message);
    }
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(
      saveCategory({
        name,
        image,
        description,
      })
    );
  };

  // const increaseIndex = () => {
  //   if (index === images.length - 1) {
  //     setindex(0);
  //   } else {
  //     clearTimeout(mytimeout);
  //     setindex(index + 1);
  //   }
  // };

  // const mytimeout = setInterval(increaseIndex, 8000);

  // console.log(`backgroundImage :url("${images[index]}")`);

  return (
    <div className="homescreen">
      <div id="slideshow-cont">
        {images.map((image) => (
          <img src={image} alt={image}></img>
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
                    <img src={category.image} alt={category.name} />
                  </div>
                </Link>
              );
            })}
          </div>
          {userInfo && userInfo.isAdmin && (
            <form className="form" onSubmit={onSubmitHandler}>
              <div>
                <h1>Add New category</h1>
              </div>
              <div>
                {loadingSave && <div>Loading...</div>}
                {errorSave && <div>{errorSave}</div>}
              </div>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter Name"
                  value={name}
                  key="name"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="imageFile">Image File</label>
                <input
                  type="file"
                  id="imageFile"
                  label="choose Image"
                  placeholder="Upload Image"
                  onChange={uploadFileHandler}
                ></input>
                {loadingUpload && <p>Uploading...</p>}
                {errorUpload && <p>{errorUpload}</p>}
              </div>

              <div>
                <label htmlFor="decsription">Single Line description</label>
                <textarea
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Describe your product"
                  value={description}
                  key="description"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div>
                <button type="submit" className="button primary">
                  Add category
                </button>
              </div>
              <div></div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
