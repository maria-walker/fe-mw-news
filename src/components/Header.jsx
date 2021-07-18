import React from "react";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import { Link } from "react-router-dom";
import * as users from "../data/users";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const [newUser, setNewUser] = useState("");
  console.log(users);

  const handleLogin = (event) => {
    event.preventDefault();
    setUser(newUser);
  };
  return (
    <div className="Header">
      <div className="User">
        <p>
          {user ? (
            <p>
              {" "}
              <FontAwesomeIcon icon={faUserCircle} /> {user}
            </p>
          ) : (
            <p>
              <FontAwesomeIcon icon={faUserCircle} /> Sign in
            </p>
          )}
        </p>
        <form onSubmit={handleLogin}>
          <select
            value={newUser}
            onChange={(event) => setNewUser(event.currentTarget.value)}
          >
            <option selected value="Select user">
              Select user
            </option>
            {users.map((user) => {
              return <option value={user.username}>{user.username}</option>;
            })}
          </select>{" "}
          <button style={{ "border-radius": "7px", "border-style": "none" }}>
            Login
          </button>
        </form>
      </div>
      <Link to={`/`}>
        <h1 style={{ color: "white" }} id="Heading">
          Not The Guardian
        </h1>
      </Link>
    </div>
  );
};

export default Header;
