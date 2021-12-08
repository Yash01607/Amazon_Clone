import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  saveProduct,
  listPoducts,
  deleteProduct,
} from "../actions/productActions";
import axios from "axios";
import MessageBox from "../components/MessageBox";
import Cookies from "js-cookie";

const ProductsScreen = (props) => {
  const [modalVisible, setModalVisilbe] = useState(false);
  const [createProduct, setCreateProduct] = useState(false);

  const [id, setid] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const numreviews = 0;

  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successSave) {
      setModalVisilbe(false);
    }
    dispatch(listPoducts());
  }, [successSave, dispatch, successDelete]);

  const openModal = (product) => {
    setModalVisilbe(true);
    setid(product._id);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
    setDescription(product.description);
    setRating(product.rating);
  };

  const openCreateProductForm = () => {
    setModalVisilbe(true);
    setid("");
    setName("");
    setPrice("");
    setImage("");
    setBrand("");
    setCategory("");
    setCountInStock("");
    setDescription("");
  };

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
  };

  const deleteHandler = (product) => {
    if (window.confirm("Are you sure you want to delete this Product?")) {
      dispatch(deleteProduct(product._id));
    }
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

  return (
    <React.Fragment>
      <div className="row">
        <h1>Products</h1>
      </div>

      {modalVisible && (
        <form className="form" onSubmit={onSubmitHandler}>
          <div>
            <h1>{createProduct ? "Create Product" : `Edit ${name}`}</h1>
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
            <input
              type="text"
              name="category"
              placeholder="Enter Category of Product"
              id="category"
              value={category}
              key="category"
              onChange={(e) => setCategory(e.target.value)}
            ></input>
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
              {id ? "Update" : "Create"}
            </button>
          </div>
          <div>
            <button
              type="button"
              className="button secondary"
              onClick={() => setModalVisilbe(false)}
            >
              Close Form
            </button>
          </div>
        </form>
      )}
      {loadingDelete && <p>Deleting...</p>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <button
                      className="details"
                      onClick={() => {
                        openModal(product);
                        setCreateProduct(false);
                      }}
                    >
                      Edit
                    </button>
                    {"  "}
                    <button
                      className="delete"
                      onClick={() => deleteHandler(product)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <div className="row">
        <button
          type="button"
          className="primary"
          onClick={() => {
            openCreateProductForm({});
            setCreateProduct(true);
          }}
        >
          {" "}
          Create New Product
        </button>
      </div>
    </React.Fragment>
  );
};

export default ProductsScreen;
