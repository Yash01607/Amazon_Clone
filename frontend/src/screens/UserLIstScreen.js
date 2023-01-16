import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { listUsers, deleteUser } from '../actions/userActions';
import MessageBox from '../components/MessageBox';

export default function UserLIstScreen(props) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  useEffect(() => {
    dispatch(listUsers());
    dispatch({ type: 'USER_DETAILS_RESET' });
  }, [dispatch, successDelete]);

  const deleteUserHandler = (user) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(user._id));
    }
  };

  return (
    <div className="main-pad">
      <h1>Users</h1>
      {loadingDelete && <p>loading</p>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">User Delete Successfully.</MessageBox>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Is Admin</th>
              <th>Is Seller</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                {user.isAdmin ? (
                  <td className="success-sts">YES</td>
                ) : (
                  <td className="danger-sts">NO</td>
                )}
                {user.isSeller ? (
                  <td className="success-sts">YES</td>
                ) : (
                  <td className="danger-sts">NO</td>
                )}
                <td>
                  <button
                    type="button"
                    className="details"
                    onClick={() => navigate(`/user/${user._id}/edit`)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="delete"
                    onClick={() => deleteUserHandler(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
