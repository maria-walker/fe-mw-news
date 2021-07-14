import { Link, useParams } from "react-router-dom";
import { getArticleById } from "../util/api";
import { useEffect, useState } from "react";

const Article = () => {
  const [article, setArticle] = useState({});
  const { article_id } = useParams();

  console.log(article_id);

  useEffect(() => {
    getArticleById(article_id).then((articleFromApi) => {
      setArticle(articleFromApi);
      console.log(article);
    });
  }, [article_id]);
  return (
    <div>
      <img
        className="Articles__img"
        src={
          article.topic === "football"
            ? "https://i.guim.co.uk/img/media/39b7e2c16abf0af92ff346d21cebcbf039a61ffb/0_208_5076_3045/master/5076.jpg?width=620&quality=85&auto=format&fit=max&s=8b12763b585cbedfdf9a210a30e366c2"
            : article.topic === "cooking"
            ? "https://i.guim.co.uk/img/media/8d01ff371d02e4f417b897c930cddb3aecd939b5/0_515_5771_3461/master/5771.jpg?width=700&quality=85&auto=format&fit=max&s=59051a4fdfd8cdbebdc2b98493c2c955"
            : "https://devonblog.com/wp-content/uploads/2017/09/codeblauw.jpg"
        }
        alt="article thumb"
      />
      <h2>{article.topic}</h2>
      <h1>{article.title}</h1>

      <h3>
        {article.author} <span>{article.topic} correspondent</span>{" "}
      </h3>

      <p>
        Published on {article.created_at && article.created_at.slice(0, 10)}
      </p>

      <p>{article.body}</p>
    </div>
  );
};
export default Article;
