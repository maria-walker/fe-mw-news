import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://mw-news-api.herokuapp.com/api",
});

export const getTopics = async () => {
  const { data } = await newsApi.get("/topics");
  return data.topics;
};

export const getArticles = async (topic, sort_by) => {
  const { data } = await newsApi.get("/articles", {
    params: {
      topic: topic,
      sort_by: sort_by,
      order: "desc",
    },
  });
  return data.articles;
};

export const getArticleById = async (article_id) => {
  const { data } = await newsApi.get(`/articles/${article_id}`);

  return data.article;
};

export const getCommentsByArticleId = async (article_id) => {
  const { data } = await newsApi.get(`/articles/${article_id}/comments`);

  return data.comments;
};

export const postComment = async (article_id, newComment) => {
  const { data } = await newsApi.post(
    `/articles/${article_id}/comments`,
    newComment
  );

  return data.comment;
};

export const patchVote = async (article_id, vote) => {
  const { data } = await newsApi.patch(`/articles/${article_id}`, {
    inc_votes: vote,
  });
  console.log(data.votes);
  return data.votes;
};
