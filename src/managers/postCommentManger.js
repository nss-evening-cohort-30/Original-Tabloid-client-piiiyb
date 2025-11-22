const _apiUrl = "/api/post";

export const getPostComments = (postId) => {
  return fetch(`${_apiUrl}/${postId}`).then((res) => res.json());
};

export const CreatePostComments = (postComment) => {
  return fetch(_apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postComment),
  }).then((res) => res.json);
};
