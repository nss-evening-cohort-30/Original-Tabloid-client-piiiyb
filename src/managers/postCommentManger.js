const _apiUrl = "/api/postComment";

export const getPostComments = (postId) => {
  return fetch(`${_apiUrl}/${postId}`).then((res) => res.json());
};

export const createPostComments = (postComment) => {
  return fetch(_apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postComment),
  }).then((res) => res.json);
};

export const deletePostComment = (id) => {
  return fetch(`${_apiUrl}/${id}`, {method: "DELETE"});
};

export const updatePostComment = (id, postComment) => {
  return fetch(`${_apiUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postComment),
  }).then((res) => res.json);
};
