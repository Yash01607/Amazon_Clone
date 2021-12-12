import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function SearchBox(props) {
  const [name, setname] = useState("all");
  const { category = "all" } = useParams();

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const getFilterUrl = (filter) => {
    const filterCategory = category;
    const filterName = filter.name || "all";
    // console.log(
    //   `/search/category/${filterCategory}/name/${filterName}/min/0/max/99999`
    // );
    return `/search/category/${filterCategory}/name/${filterName}/min/0/max/99999/rating/0/order/newest`;
  };

  return (
    <form className="search" onSubmit={submitHandler}>
      <div className="row">
        <input
          type="text"
          name="q"
          id="q"
          onChange={(e) => setname(e.target.value)}
        ></input>
        <button className="primary" type="submit">
          <Link to={getFilterUrl({ name: name })}>
            <i className="fa fa-search"></i>
          </Link>
        </button>
      </div>
    </form>
  );
}

export default SearchBox;
