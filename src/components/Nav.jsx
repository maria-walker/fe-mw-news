import React from "react";
import { useState, useEffect } from "react";
import { getTopics } from "../util/api";
import { Link } from "react-router-dom";

const Nav = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then((topicsFromApi) => {
      setTopics(topicsFromApi);
    });
  }, []);

  return (
    <div className="Nav">
      <span className="Nav__element">
        <Link to={`/`} key="home">
          News
        </Link>
      </span>
      {topics.map((topic) => {
        return (
          <span className="Nav__element">
            <Link to={`/articles/${topic.slug}`} key={topic.slug}>
              {topic.slug}
            </Link>
          </span>
        );
      })}
    </div>
  );
};

export default Nav;
