const _apiUrl = "/api/Category";

export const getCategories = () => {
  return fetch(_apiUrl).then((res) => res.json());
};

export const deleteCategory = (id) => {
  return fetch(`${_apiUrl}/${id}`, {method: "DELETE"});
};

export const createCategory = (category) => {
  return fetch(_apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  }).then((res) => res.json);
};
