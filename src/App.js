import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Articles from "./components/Articles";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
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
      </Switch>
    </div>
  );
}

export default App;
