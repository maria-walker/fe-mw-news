import { Link, useParams } from "react-router-dom";
import {
  getTopics,
  getArticleById,
  getArticles,
  getCommentsByArticleId,
  postComment,
  patchVote,
} from "../util/api";

import { useState, useEffect, useContext } from "react";

import { UserContext } from "../contexts/User.js";
import Expandable from "./Expandable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import {
  faSpinner,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";

const Article = () => {
  const { user } = useContext(UserContext);
  const [article, setArticle] = useState({});
  const [articles, setArticles] = useState([]);
  const { article_id } = useParams();
  const [topics, setTopics] = useState([]);
  const [comments, setComments] = useState([]);
  const [votes, setVotes] = useState("");
  const [newCommentBody, setCommentBody] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [commentError, setCommentError] = useState("");
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    getTopics().then((topicsFromApi) => {
      setTopics(topicsFromApi);
    });
    getArticles("", "comment_count").then((articlesFromApi) => {
      setArticles(articlesFromApi.slice(0, 10));
    });
  }, []);

  useEffect(() => {
    getArticleById(article_id).then((articleFromApi) => {
      setArticle(articleFromApi);
    });
  }, [article_id, votes]);

  useEffect(() => {
    getCommentsByArticleId(article_id).then((commentsFromApi) => {
      setComments(commentsFromApi);
      setIsLoading(false);
    });
  }, [article_id]);

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const newComment = {
      username: user,
      body: newCommentBody,
    };
    if (!newCommentBody) {
      setCommentError("Please enter your comment above");
      return;
    }
    postComment(article_id, newComment)
      .then((newComment) => {
        setComments((currComments) => {
          const newComments = [newComment, ...currComments];
          return newComments;
        });
      })
      .catch(() => {
        setCommentError(
          "Something went wrong... Please check your connection and try again"
        );
      });
  };

  const handleVote = (vote) => {
    if (!hasVoted) {
      patchVote(article_id, vote).then((newVotes) => {
        setVotes(newVotes);
        setHasVoted(true);
      });
    }
  };

  return isLoading ? (
    <h1>
      {" "}
      <FontAwesomeIcon icon={faSpinner} pulse />
    </h1>
  ) : (
    <div className="Article">
      <img
        src={
          article.topic === "football"
            ? "https://i.guim.co.uk/img/media/39b7e2c16abf0af92ff346d21cebcbf039a61ffb/0_208_5076_3045/master/5076.jpg?width=620&quality=85&auto=format&fit=max&s=8b12763b585cbedfdf9a210a30e366c2"
            : article.topic === "cooking"
            ? "https://i.guim.co.uk/img/media/8d01ff371d02e4f417b897c930cddb3aecd939b5/0_515_5771_3461/master/5771.jpg?width=700&quality=85&auto=format&fit=max&s=59051a4fdfd8cdbebdc2b98493c2c955"
            : article.topic === "coding"
            ? "https://devonblog.com/wp-content/uploads/2017/09/codeblauw.jpg"
            : null
        }
        alt="Article loading..."
      />
      <h3>{article.topic}</h3>
      <h1>{article.title}</h1>

      <h2>
        {" "}
        {article.body && article.body.slice(0, article.body.indexOf(". "))}
      </h2>

      <div className="line" />
      <div className="line" />
      <div className="line" />
      <div className="line" />

      <h3>
        {article.author} <span>{article.topic} correspondent</span>{" "}
      </h3>

      <p className="Article__info">
        <FontAwesomeIcon icon={faTwitter} /> @{article.author}
        <br />
        Published on {article.created_at && article.created_at.slice(0, 10)}
        <br />
        Votes: {article.votes}
        <br />
        {hasVoted ? "You have already voted" : null}
      </p>
      <div className="line" />
      <button
        className="Vote"
        disabled={hasVoted}
        onClick={() => {
          handleVote(1);
        }}
      >
        <FontAwesomeIcon icon={faThumbsUp} />
      </button>
      <button
        className="Vote"
        disabled={hasVoted}
        onClick={() => {
          handleVote(-1);
        }}
      >
        <FontAwesomeIcon icon={faThumbsDown} />
      </button>

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

      <h2 id="Comments-section">comments ({article.comment_count})</h2>

      <Expandable>
        <br />{" "}
        <div>
          {user ? <p>???? {user}</p> : <p>???? Please sign in to post a comment</p>}
        </div>
        <form
          onSubmit={
            user
              ? handleCommentSubmit
              : (e) => {
                  e.preventDefault();
                }
          }
        >
          <textarea
            value={newCommentBody}
            onChange={(event) => setCommentBody(event.target.value)}
            placeholder="Join the discussion"
            name="commentBody"
            id="commentBody"
            cols="30"
            rows="3"
          ></textarea>
          <br />
          <button
            onClick={
              !user
                ? () => {
                    window.scrollTo({
                      top: 1,
                      left: 1,
                      behavior: "smooth",
                    });
                  }
                : null
            }
            className="Comments__post-button"
          >
            {user ? "Post your comment" : "Please sign in first"}
          </button>
        </form>
        {commentError ? (
          <div>
            <h3>{commentError}</h3>
          </div>
        ) : null}
        <br />
        <br />
        <br />
        {comments
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map((comment) => {
            return (
              <li key={comment.comment_id} className="Comments__card">
                <div>
                  <h3>{comment.author}</h3>
                  <p>{comment.created_at.slice(0, 10)}</p>
                  <p>{comment.body}</p>
                  <p>Votes: {comment.votes || 0}</p>
                </div>
              </li>
            );
          })}
      </Expandable>

      <h2>Most popular articles (by number of comments)</h2>

      {articles.map((article, index) => {
        return (
          <li key={article.article_id}>
            <Link
              to={`/article/${article.article_id}`}
              onClick={() => {
                window.scrollTo({
                  top: 10,
                  left: 10,
                  behavior: "smooth",
                });
              }}
            >
              <div className="Articles__card">
                <h1 style={{ fontSize: "1.8em", width: "6%" }}>#{index + 1}</h1>
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
                <div style={{ width: "52%" }}>
                  <h3>
                    {" "}
                    <span className="Articles__topic">
                      {article.topic} {" / "}
                    </span>{" "}
                    {article.title}
                  </h3>

                  <p>by {article.author}</p>
                  <p>Published on {article.created_at.slice(0, 10)}</p>
                  <p>Comments({article.comment_count})</p>
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </div>
  );
};

export default Article;
