const _apiUrl = "/api/post";

export const getAllPosts = () => {
  return fetch(_apiUrl, {
    method: "GET",
    credentials: "same-origin",
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Failed to fetch posts");
    }
  });
};

export const getPostById = (id) => {
  return fetch(`${_apiUrl}/${id}`, {
    method: "GET",
    credentials: "same-origin",
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else if (res.status === 404) {
      throw new Error("Post not found");
    } else {
      throw new Error("Failed to fetch post");
    }
  });
};

export const getPostTags = (postId) => {
  return fetch(`${_apiUrl}/${postId}/tags`, {
    method: "GET",
    credentials: "same-origin",
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else if (res.status === 404) {
      throw new Error("Post not found");
    } else {
      throw new Error("Failed to fetch post tags");
    }
  });
};

export const updatePostTags = (postId, tagIds) => {
  return fetch(`${_apiUrl}/${postId}/tags`, {
    method: "PUT",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tagIds),
  }).then((res) => {
    if (res.status === 204) {
      return Promise.resolve();
    } else if (res.status === 404) {
      throw new Error("Post not found");
    } else {
      throw new Error("Failed to update post tags");
    }
  });
};

export const getPostsByUser = (userId) => {
  return fetch(`${_apiUrl}/user/${userId}`).then((res) => res.json());
}


export const createPost = (post) => {
  return fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
    body: JSON.stringify(post),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to create post");
    }
    return res.json();
  });
};


export const deletePost = (id) => {
  return fetch(`${_apiUrl}/${id}`, {
    method: "DELETE",
  }).then(res => {
    if (!res.ok) {
      throw new Error("Failed to delete post");
    }
  });
};
