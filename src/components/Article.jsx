import { Link, useParams } from "react-router-dom";
import { getArticleById } from "../util/api";
import { useEffect, useState } from "react";
import { getTopics } from "../util/api";

const Article = () => {
  const [article, setArticle] = useState({});
  const { article_id } = useParams();
  const [topics, setTopics] = useState([]);

  console.log(article_id);

  useEffect(() => {
    getTopics().then((topicsFromApi) => {
      setTopics(topicsFromApi);
    });
  }, []);

  useEffect(() => {
    getArticleById(article_id).then((articleFromApi) => {
      setArticle(articleFromApi);
      console.log(article);
    });
  }, [article_id]);
  return (
    <div className="Article">
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
      <h3>{article.topic}</h3>
      <h1>{article.title}</h1>

      <h2>
        {" "}
        {article.body && article.body.slice(0, article.body.indexOf("."))}
      </h2>

      <div className="line" />
      <div className="line" />
      <div className="line" />
      <div className="line" />

      <h3>
        {article.author} <span>{article.topic} correspondent</span>{" "}
      </h3>

      <p className="Article__info">
        🐦@{article.author}
        <br />
        Published on {article.created_at && article.created_at.slice(0, 10)}
      </p>
      <div className="line" />

      <p>{article.body}</p>
      <div className="line" />
      <div className="line" />
      <div className="line" />
      <div className="line" />
      <p className="Article__info">Topics </p>
      <h3>{article.topic}</h3>
      <h3>
        {topics.map((topic) => {
          return (
            <span key={topic.slug}>
              <Link to={`/articles/${topic.slug}`}>{topic.slug} / </Link>
            </span>
          );
        })}
      </h3>

      <h2>comments ({article.comment_count})</h2>
    </div>
  );
};
export default Article;
