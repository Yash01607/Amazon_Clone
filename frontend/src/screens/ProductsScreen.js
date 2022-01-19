import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { listPoducts, deleteProduct } from "../actions/productActions";
import MessageBox from "../components/MessageBox";
import { Image } from "cloudinary-react";

const ProductsScreen = (props) => {
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listPoducts({ name: "", category: "", order: "categories" }));
  }, [dispatch, successDelete]);

  const deleteHandler = (product) => {
    if (window.confirm("Are you sure you want to delete this Product?")) {
      dispatch(deleteProduct(product._id));
    }
  };

  return (
    <div className="main-pad">
      <div className="row">
        <h1>Products</h1>
      </div>
      <div className="row">
        <button
          type="button"
          className="primary small-block"
          onClick={() => {
            props.history.push(`/Createprodct`);
          }}
        >
          {" "}
          Create New Product
        </button>
      </div>

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
              <th>PRODUCT</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>Stock Count</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product._id}>
                  <td>
                    <Link to={"/product/" + product._id}>
                      {product && product.image && product.image.data && (
                        <Image
                          cloudName="df7lcoica"
                          publicId={product.image.data.public_id}
                        ></Image>
                      )}
                    </Link>
                  </td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>{product.countInStock}</td>
                  <td>
                    <button
                      className="details"
                      onClick={() => {
                        props.history.push(`/ProductEditScreen/${product._id}`);
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
    </div>
  );
};

export default ProductsScreen;
