import React from "react";

import { useState, useEffect } from "react";

import { getArticles, getArticleById } from "../util/api";
import { Link, useParams } from "react-router-dom";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [firstArticle, setFirstArticle] = useState("");
  const { topic } = useParams();
  console.log(topic);

  useEffect(() => {
    getArticles(topic, "created_at")
      .then((articlesFromApi) => {
        console.log(articlesFromApi[0].article_id);
        setArticles(articlesFromApi);

        return getArticleById(articlesFromApi[0].article_id);
      })
      .then((firstArticleFromApi) => {
        console.log(firstArticleFromApi);
        setFirstArticle(firstArticleFromApi);
      });
  }, [topic]);

  return (
    <div>
      <div className="Articles">{topic ? <h2>{topic}</h2> : <p></p>}</div>

      <div className="Articles">
        {articles.map((article) => {
          return articles.indexOf(article) === 0 ? (
            <li key={article.article_id}>
              <Link
                className="Articles__card--first"
                to={`/article/${article.article_id}`}
              >
                <img
                  src={
                    article.topic === "football"
                      ? "https://i.guim.co.uk/img/media/39b7e2c16abf0af92ff346d21cebcbf039a61ffb/0_208_5076_3045/master/5076.jpg?width=620&quality=85&auto=format&fit=max&s=8b12763b585cbedfdf9a210a30e366c2"
                      : article.topic === "cooking"
                      ? "https://i.guim.co.uk/img/media/8d01ff371d02e4f417b897c930cddb3aecd939b5/0_515_5771_3461/master/5771.jpg?width=700&quality=85&auto=format&fit=max&s=59051a4fdfd8cdbebdc2b98493c2c955"
                      : "https://devonblog.com/wp-content/uploads/2017/09/codeblauw.jpg"
                  }
                  alt="article thumb"
                />
                <div>
                  <h3>
                    {" "}
                    <span className="Articles__topic">
                      {article.topic} {" / "}
                    </span>{" "}
                    {article.title}
                  </h3>

                  <p>by {article.author}</p>
                  <p>Published on {article.created_at.slice(0, 10)}</p>
                  <h3 style={{ "font-weight": "400" }}>
                    {firstArticle.body &&
                      firstArticle.body.slice(
                        0,
                        firstArticle.body.indexOf(". ")
                      )}
                  </h3>
                </div>
              </Link>
              {"  "}
            </li>
          ) : (
            <li key={article.article_id}>
              <Link
                className="Articles__card"
                to={`/article/${article.article_id}`}
              >
                <img
                  src={
                    article.topic === "football"
                      ? "https://i.guim.co.uk/img/media/39b7e2c16abf0af92ff346d21cebcbf039a61ffb/0_208_5076_3045/master/5076.jpg?width=620&quality=85&auto=format&fit=max&s=8b12763b585cbedfdf9a210a30e366c2"
                      : article.topic === "cooking"
                      ? "https://i.guim.co.uk/img/media/8d01ff371d02e4f417b897c930cddb3aecd939b5/0_515_5771_3461/master/5771.jpg?width=700&quality=85&auto=format&fit=max&s=59051a4fdfd8cdbebdc2b98493c2c955"
                      : "https://devonblog.com/wp-content/uploads/2017/09/codeblauw.jpg"
                  }
                  alt="article thumb"
                />
                <div>
                  <h3>
                    {" "}
                    <span className="Articles__topic">
                      {article.topic} {" / "}
                    </span>{" "}
                    {article.title.length > 45
                      ? `${article.title.slice(0, 45)}...`
                      : article.title}
                  </h3>

                  <p>by {article.author}</p>
                  <p>Published on {article.created_at.slice(0, 10)}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default Articles;
