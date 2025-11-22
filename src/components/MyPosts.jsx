import { useState, useEffect } from "react";
import { getPostsByUser, deletePost, updatePost } from "../managers/postManager";
import { Table, Button } from "reactstrap";
import { Link } from "react-router-dom";

export default function MyPosts({ loggedInUser }) {
  const [myPosts, setMyPosts] = useState([]);

useEffect(() => {
  console.log(loggedInUser);
  if (loggedInUser) {
    
    getPostsByUser(loggedInUser.id).then((posts) => {
      const sortedPosts = posts.sort((a,b) => b.id - a.id);
      setMyPosts(sortedPosts);
    });
  }
}, [loggedInUser]);

const handleDelete = (postId) => {
  if (window.confirm("Are you sure you want to delete this post?")) {
    deletePost(postId).then(() => {
      // Refresh the list
      getPostsByUser(loggedInUser.id).then((posts) => {
        const sortedPosts = posts.sort((a,b) => b.id - a.id);
        setMyPosts(sortedPosts);
      });
    });
  }
};

const handlePublish = (post) => {
  const updatedPost = {
    ...post,
    publishedOn: new Date().toISOString()
  };

  updatePost(post.id, updatedPost).then(() => {
    // Refresh the list
    getPostsByUser(loggedInUser.id).then((posts) => {
      const sortedPosts = posts.sort((a,b) => b.id - a.id);
      setMyPosts(sortedPosts);
    });
  });
};

const handleUnpublish = (post) => {
  const updatedPost = {
    ...post,
    publishedOn: null
  };

  updatePost(post.id, updatedPost).then(() => {
    // Refresh the list
    getPostsByUser(loggedInUser.id).then((posts) => {
      const sortedPosts = posts.sort((a,b) => b.id - a.id);
      setMyPosts(sortedPosts);
    });
  });
};

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>My Posts</h2>
        <Link to="/posts/new" className="btn btn-primary">
          New Post
        </Link>
      </div>
      <Table striped>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Published</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {myPosts.map((post) => (
            <tr key={post.Id}>
              <td>{post.title}</td>
              <td>
                {post.user.firstName} {post.user.lastName}
              </td>
              <td>{post.category.name}</td>
              <td>
                {post.publishedOn ? (
                  <span className="badge bg-success">Published</span>
                ) : (
                  <span className="badge bg-secondary">Draft</span>
                )}
              </td>
              <td>
                <Link 
                  to={`/posts/${post.id}/edit`}
                  className="btn btn-sm btn-primary me-1"
                >
                  Edit
                </Link>
                {post.publishedOn ? (
                  <Button
                    color="warning"
                    size="sm"
                    className="me-1"
                    onClick={() => handleUnpublish(post)}
                  >
                    Unpublish
                  </Button>
                ) : (
                  <Button
                    color="success"
                    size="sm"
                    className="me-1"
                    onClick={() => handlePublish(post)}
                  >
                    Publish
                  </Button>
                )}
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}