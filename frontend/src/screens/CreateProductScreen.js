import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { listCategories } from '../actions/CategoryActions';
import { saveProduct } from '../actions/productActions';
import MessageBox from '../components/MessageBox';
import { useNavigate } from 'react-router';

const ProductEditScreen = (props) => {
  const dispatch = useDispatch();

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

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const numreviews = 0;

  const navigate = useNavigate();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (!previewSource) {
      return;
    }
    if (!successUpload) {
      uploadImage(previewSource);
    }
    dispatch(
      saveProduct({
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
    navigate('/products');
  };

  const [previewSource, setpreviewSource] = useState();
  const [loadingUpload, setloadingUpload] = useState(false);
  const [successUpload, setsuccessUpload] = useState(false);
  const [errorUpload, seterrorUpload] = useState('');

  let userInfo = {};
  if (Cookies.get('userInfo')) {
    userInfo = JSON.parse(Cookies.get('userInfo'));
  }

  const uploadFileHandler = (e) => {
    // console.log(e.target.files);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setpreviewSource(reader.result);
    };
    if (!previewSource) return;
    uploadImage(previewSource);
  };

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  const categoryChangeHandler = (e) => {
    setCategory(e.target.value);
  };

  const uploadImage = async (image) => {
    setloadingUpload(true);
    try {
      const { data } = await axios.post(
        '/api/uploads',
        { data: image },
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer${userInfo.token}`,
          },
        }
      );
      // console.log(data);
      setImage(data);
      setloadingUpload(false);
      setsuccessUpload(true);
    } catch (error) {
      setloadingUpload(false);
      seterrorUpload(error.message);
    }
  };

  return (
    <div className="main-pad">
      <form className="form " onSubmit={onSubmitHandler}>
        <div>
          <h1>{'Create Product'}</h1>
        </div>
        <div>
          {loadingSave && <div>Loading...</div>}
          {errorSave && <MessageBox variant="danger">{errorSave}</MessageBox>}
          {successSave && (
            <MessageBox variant="success">
              Product Created Successfully
            </MessageBox>
          )}
        </div>
        <div>
          {/* <label htmlFor="name">Name</label> */}
          <input
            type="text"
            required
            name="name"
            id="name"
            placeholder="Enter Name"
            value={name}
            key="name"
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          {/* <label htmlFor="price">Price</label> */}
          <input
            type="number"
            required
            name="price"
            placeholder="Enter Price"
            id="price"
            value={price}
            key="price"
            onChange={(e) => setPrice(e.target.value)}
          ></input>
        </div>
        <div>
          {/* <label htmlFor="imageFile">Image File</label> */}
          {previewSource && (
            <div className="row">
              <img
                src={previewSource}
                alt="uploaded_image"
                style={{ height: '30rem', width: '29rem' }}
              ></img>
              <button
                type="button"
                className="upload-button"
                onClick={() => {
                  uploadImage(previewSource);
                }}
              >
                Please click to Upload Image
              </button>
            </div>
          )}
          <input
            type="file"
            name="image"
            id="imageFile"
            required
            label="choose Image"
            placeholder="Upload Image"
            onChange={uploadFileHandler}
          ></input>
          {loadingUpload && <p>Uploading...</p>}
          {errorUpload && (
            <MessageBox variant="danger">{errorUpload}</MessageBox>
          )}
          {successUpload && (
            <MessageBox variant="success">
              Image Uploaded Successfully
            </MessageBox>
          )}
        </div>
        <div>
          {/* <label htmlFor="countInStock">Conut In Stock</label> */}
          <input
            type="text"
            name="countInStock"
            required
            placeholder="Enter Stock Quantity"
            id="countInStock"
            value={countInStock}
            key="countInStock"
            onChange={(e) => setCountInStock(e.target.value)}
          ></input>
        </div>
        <div>
          {/* <label htmlFor="brand">Brand</label> */}
          <input
            type="text"
            required
            name="brand"
            id="brand"
            placeholder="Enter Brand Name"
            value={brand}
            key="brand"
            onChange={(e) => setBrand(e.target.value)}
          ></input>
        </div>
        <div>
          {/* <label htmlFor="rating">Initial Rating</label> */}
          <input
            type="text"
            name="rating"
            id="rating"
            required
            placeholder="Enter Initial Rating"
            value={rating}
            key="rating"
            max={5}
            onChange={(e) => setRating(e.target.value)}
          ></input>
        </div>
        <div>
          {/* <label htmlFor="category">Category</label> */}
          {loadingCategories ? (
            <p>Loading...</p>
          ) : errorCategories ? (
            <MessageBox variant="danger">{errorCategories}</MessageBox>
          ) : (
            <select value={category} required onChange={categoryChangeHandler}>
              <option value="default" hidden>
                Select Category
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
        <div>
          {/* <label htmlFor="decsription">description</label> */}
          <textarea
            type="text"
            name="description"
            id="description"
            required
            placeholder="Describe your product"
            value={description}
            key="description"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <button type="submit" className="button primary">
            {'Create'}
          </button>
        </div>
        <div>
          <button
            type="button"
            className="button secondary"
            onClick={() => navigate('/products')}
          >
            Close Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductEditScreen;
