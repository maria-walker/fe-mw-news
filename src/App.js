import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Articles from "./components/Articles";
import Article from "./components/Article";
import { UserContext } from "./contexts/User";
import { Route, Switch } from "react-router-dom";
import { useState } from "react";

function App() {
  const [user, setUser] = useState("");
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        <Header />
        <Nav />
        <Switch>
          <Route exact path="/">
            <Articles />
          </Route>
          <Route exact path="/articles/:topic">
            <Articles />
          </Route>
          <Route exact path="/article/:article_id">
            <Article />
          </Route>
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;
