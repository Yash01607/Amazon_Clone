import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteCategory,
  listCategories,
  saveCategory,
} from "../actions/CategoryActions";
import MessageBox from "../components/MessageBox";
import axios from "axios";
import { Image } from "cloudinary-react";

function CategoryListScreen(props) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const [previewSource, setpreviewSource] = useState();
  const [loadingUpload, setloadingUpload] = useState(false);
  const [successUpload, setsuccessUpload] = useState(false);
  const [errorUpload, seterrorUpload] = useState("");

  const categoryList = useSelector((state) => state.categoryList);
  const { categories, loading, error } = categoryList;
  const dispatch = useDispatch();

  const categoryDelete = useSelector((state) => state.categoryDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = categoryDelete;

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

  const deleteHandler = (product) => {
    if (window.confirm("Are you sure you want to delete this Category?")) {
      dispatch(deleteCategory(product._id));
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

  const uploadImage = async (image) => {
    setloadingUpload(true);
    try {
      const { data } = await axios.post(
        "/api/uploads",
        { data: image },
        {
          headers: {
            "Content-Type": "application/json",
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

  const editHandler = (category) => {
    setName(category.name);
    setDescription(category.description);
  };

  return (
    <div className="main-pad">
      <div className="row">
        <h1>Categories</h1>
      </div>

      {loadingDelete && <p>Deleting...</p>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">{"Deleted Successfully"}</MessageBox>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>IMAGE</th>
              <th>NAME</th>
              <th>DESCRIPTION</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => {
              return (
                <tr key={category._id}>
                  <td>
                    <Link to={"/product/" + category._id}>
                      {category && category.image && category.image.data && (
                        <Image
                          cloudName="df7lcoica"
                          publicId={category.image.data.public_id}
                        ></Image>
                      )}
                    </Link>
                  </td>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>
                    <button
                      className="details"
                      onClick={() => editHandler(category)}
                    >
                      Edit
                    </button>
                    {"  "}
                    <button
                      className="delete"
                      onClick={() => deleteHandler(category)}
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
      <form className="form" onSubmit={onSubmitHandler}>
        <div>
          <h1>Add New category</h1>
        </div>
        <div>
          {loadingSave && <div>Loading...</div>}
          {errorSave && <div>{errorSave}</div>}
        </div>
        <div>
          {/* <label htmlFor="name">Name</label> */}
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
          {/* <label htmlFor="imageFile">Image File</label> */}
          {previewSource && (
            <div className="row">
              <img
                src={previewSource}
                alt="uploaded_image"
                style={{ height: "300px", width: "50%" }}
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
          {/* <label htmlFor="decsription">Single Line description</label> */}
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
          {successSave && (
            <MessageBox variant="success">Category Added.</MessageBox>
          )}
        </div>
      </form>
    </div>
  );
}

export default CategoryListScreen;
