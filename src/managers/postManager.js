const _apiUrl = "/api/post";

export const getPosts = () => {
  return fetch(_apiUrl).then((res) => res.json());
};

export const getPostsByUser = (userId) => {
  return fetch(`${_apiUrl}/user/${userId}`).then((res) => res.json());
}
