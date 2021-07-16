import React from "react";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import * as users from "../data/users";

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
          <button>Login</button>
        </form>
        <p>{user ? <p>👤 {user}</p> : <p>👤 Please login</p>}</p>
      </div>
      <h1 className="Heading">
        Not The <br /> Guardian
      </h1>
    </div>
  );
};

export default Header;
