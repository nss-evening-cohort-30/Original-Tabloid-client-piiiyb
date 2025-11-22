import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, updatePostTags } from "../managers/postManager";
import { getAllTags } from "../managers/tagManager";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [allTags, setAllTags] = useState([]);
  const [selectedTagIds, setSelectedTagIds] = useState([]);
  const [isManageTagsModalOpen, setIsManageTagsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPost();
    loadAllTags();
  }, [id]);

  const loadPost = () => {
    setLoading(true);
    getPostById(id)
      .then((data) => {
        setPost(data);
        setSelectedTagIds(data.tags?.map((t) => t.id) || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const loadAllTags = () => {
    getAllTags()
      .then(setAllTags)
      .catch((err) => setError(err.message));
  };

  const toggleManageTagsModal = () => {
    if (!isManageTagsModalOpen) {
      // Reset selected tags to current post tags when opening
      setSelectedTagIds(post?.tags?.map((t) => t.id) || []);
    }
    setIsManageTagsModalOpen(!isManageTagsModalOpen);
    setError(null);
  };

  const handleTagCheckboxChange = (tagId) => {
    setSelectedTagIds((prev) => {
      if (prev.includes(tagId)) {
        return prev.filter((id) => id !== tagId);
      } else {
        return [...prev, tagId];
      }
    });
  };

  const handleSaveTags = () => {
    setError(null);

    updatePostTags(id, selectedTagIds)
      .then(() => {
        toggleManageTagsModal();
        loadPost(); // Reload post to show updated tags
      })
      .catch((err) => setError(err.message));
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <p>Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mt-5">
        <Alert color="danger">Post not found</Alert>
        <Button color="primary" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <Card>
        <CardBody>
          <CardTitle tag="h2">{post.title}</CardTitle>
          <CardText>
            <strong>Subtitle:</strong> {post.subTitle}
          </CardText>
          <CardText>
            <strong>Author:</strong> {post.user ? `${post.user.firstName} ${post.user.lastName}` : "Unknown"}
          </CardText>
          <CardText>
            <strong>Category:</strong> {post.category?.name || "Uncategorized"}
          </CardText>
          <CardText>
            <strong>Published:</strong>{" "}
            {new Date(post.publishedOn).toLocaleDateString()}
          </CardText>
          <CardText>
            <strong>Read Time:</strong> {post.realTime} minutes
          </CardText>
          <CardText className="mt-3">{post.body}</CardText>

          <div className="mt-4">
            <h5>Tags:</h5>
            {post.tags && post.tags.length > 0 ? (
              <div>
                {post.tags.map((tag) => (
                  <Badge key={tag.id} color="primary" className="me-2">
                    {tag.name}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-muted">No tags assigned to this post.</p>
            )}
          </div>

          <div className="mt-4">
            <Button color="primary" onClick={toggleManageTagsModal}>
              Manage Tags
            </Button>
            <Button
              color="secondary"
              className="ms-2"
              onClick={() => navigate("/")}
            >
              Back
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Manage Tags Modal */}
      <Modal isOpen={isManageTagsModalOpen} toggle={toggleManageTagsModal}>
        <ModalHeader toggle={toggleManageTagsModal}>Manage Tags</ModalHeader>
        <ModalBody>
          {error && <Alert color="danger">{error}</Alert>}
          <p>Select tags to associate with this post:</p>
          {allTags.map((tag) => (
            <FormGroup check key={tag.id}>
              <Label check>
                <Input
                  type="checkbox"
                  checked={selectedTagIds.includes(tag.id)}
                  onChange={() => handleTagCheckboxChange(tag.id)}
                />{" "}
                {tag.name}
              </Label>
            </FormGroup>
          ))}
          {allTags.length === 0 && (
            <p className="text-muted">No tags available.</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleManageTagsModal}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleSaveTags}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
