import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { listCategories } from "../actions/CategoryActions";
import { detailsProduct, saveProduct } from "../actions/productActions";
import MessageBox from "../components/MessageBox";

const ProductEditScreen = (props) => {
  const productId = props.match.params.id;

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);

  let { product, loading, error } = productDetails;

  const [id, setid] = useState(" ");
  const [name, setName] = useState(" ");
  const [price, setPrice] = useState(" ");
  const [image, setImage] = useState(" ");
  const [brand, setBrand] = useState(" ");
  const [category, setCategory] = useState(" ");
  const [countInStock, setCountInStock] = useState(" ");
  const [description, setDescription] = useState(" ");
  const [rating, setRating] = useState(" ");
  const numreviews = 0;
  //   console.log(product);

  useEffect(() => {
    if (!product || !product.name || product._id !== productId) {
      // console.log("Product dont exist");
      dispatch(detailsProduct(productId));
    } else {
      // console.log("Product exist");
      setid(product._id);
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
      setRating(product.rating);
    }
  }, [productId, dispatch, product]);

  const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;

  const categoryList = useSelector((state) => state.categoryList);
  const {
    categories,
    loading: loadingCategories,
    error: errorCategories,
  } = categoryList;

  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
        numreviews,
        rating,
      })
    );
    product = null;
    props.history.push("/products");
  };

  const [loadingUpload, setloadingUpload] = useState(false);
  const [errorUpload, seterrorUpload] = useState("");

  let userInfo = {};
  if (Cookies.get("userInfo")) {
    userInfo = JSON.parse(Cookies.get("userInfo"));
  }

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

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  const categoryChangeHandler = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className="main-pad">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <form className="form" onSubmit={onSubmitHandler}>
          <div>
            <h1>{`Edit ${name}`}</h1>
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
            <label htmlFor="price">Price</label>
            <input
              type="text"
              name="price"
              placeholder="Enter Price"
              id="price"
              value={price}
              key="price"
              onChange={(e) => setPrice(e.target.value)}
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
            <label htmlFor="countInStock">Conut In Stock</label>
            <input
              type="text"
              name="countInStock"
              placeholder="Enter Stock Quantity"
              id="countInStock"
              value={countInStock}
              key="countInStock"
              onChange={(e) => setCountInStock(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="brand">Brand</label>
            <input
              type="text"
              name="brand"
              id="brand"
              placeholder="Enter Brand Name"
              value={brand}
              key="brand"
              onChange={(e) => setBrand(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="rating">Initial Rating</label>
            <input
              type="text"
              name="rating"
              id="rating"
              placeholder="Enter Initial Rating"
              value={rating}
              key="rating"
              max={5}
              onChange={(e) => setRating(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="category">Category</label>
            {loadingCategories ? (
              <p>Loading...</p>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              <select value={category} onChange={categoryChangeHandler}>
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
          <div>
            <label htmlFor="decsription">description</label>
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
              {"Update"}
            </button>
          </div>
          <div>
            <button
              type="button"
              className="button secondary"
              onClick={() => props.history.push("/products")}
            >
              Close Form
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProductEditScreen;
