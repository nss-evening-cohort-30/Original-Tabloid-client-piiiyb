const _apiUrl = "/api/post";

export const getPostComments = (postId) => {
  return fetch(`${_apiUrl}/${postId}`).then((res) => res.json());
};
