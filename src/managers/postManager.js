const _apiUrl = "/api/post";

export const getPosts = () => {
  return fetch(_apiUrl).then((res) => res.json());
};


export const getPostById = (id) => {
  return fetch(_apiUrl+ `/${id}`).then((res) => res.json());
};

export const updatePost = (id, updatedPost) => {
  return fetch(`${_apiUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPost), 
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to update post. Status: ${res.status}`);
      }
      return res.json();
    });
};



export const createPost = (createdPost) => {
  return fetch(_apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createdPost),
  }).then((res) => res.json);
};

export const deletePost = (id) => {
  return fetch(`${_apiUrl}/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to delete post. Status: ${res.status}`);
      }
      return res.json(); 
    });
};
