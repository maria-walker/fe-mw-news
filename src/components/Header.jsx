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

  const handleLogin = (event) => {
    event.preventDefault();
    setUser(newUser);
  };
  return (
    <div className="Header">
      <div className="User">
        <div>
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
        </div>
        <form onSubmit={handleLogin}>
          <select
            defaultValue="Select user"
            onChange={(event) => setNewUser(event.currentTarget.value)}
          >
            <option key="Select user">Select user</option>
            {users.map((user) => {
              return (
                <option key={user.username} value={user.username}>
                  {user.username}
                </option>
              );
            })}
          </select>{" "}
          <button style={{ borderRadius: "7px", borderStyle: "none" }}>
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
