import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="Error">
      <h1 style={{ fontSize: "4em" }}>Error 404</h1>
      <h1>Sorry – we haven’t been able to serve the page you asked for.</h1>
      <h2>You may have followed an outdated link, or have mistyped a URL. </h2>
      <Link to="/">
        <button className="Error__button">
          Return to Not-The-Guardian homepage
        </button>
      </Link>
    </div>
  );
};

export default Error404;
