import { useEffect, useState } from "react";
import {
  getAllTags,
  createTag,
  updateTag,
  deleteTag,
} from "../managers/tagManager";
import {
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";

export default function Tags() {
  const [tags, setTags] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentTag, setCurrentTag] = useState(null);
  const [tagName, setTagName] = useState("");
  const [error, setError] = useState(null);

  const loadTags = () => {
    getAllTags()
      .then(setTags)
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    loadTags();
  }, []);

  const toggleCreateModal = () => {
    setIsCreateModalOpen(!isCreateModalOpen);
    setTagName("");
    setError(null);
  };

  const toggleEditModal = () => {
    if (isEditModalOpen) {
      setTagName("");
      setCurrentTag(null);
    }
    setIsEditModalOpen(!isEditModalOpen);
    setError(null);
  };

  const toggleDeleteModal = () => {
    if (isDeleteModalOpen) {
      setCurrentTag(null);
    }
    setIsDeleteModalOpen(!isDeleteModalOpen);
    setError(null);
  };

  const handleCreateTag = (e) => {
    e.preventDefault();
    setError(null);

    createTag({ name: tagName })
      .then(() => {
        toggleCreateModal();
        loadTags();
      })
      .catch((err) => setError(err.message));
  };

  const handleEditClick = (tag) => {
    setCurrentTag(tag);
    setTagName(tag.name);
    toggleEditModal();
  };

  const handleUpdateTag = (e) => {
    e.preventDefault();
    setError(null);

    updateTag(currentTag.id, { name: tagName })
      .then(() => {
        toggleEditModal();
        loadTags();
      })
      .catch((err) => setError(err.message));
  };

  const handleDeleteClick = (tag) => {
    setCurrentTag(tag);
    toggleDeleteModal();
  };

  const handleConfirmDelete = () => {
    setError(null);

    deleteTag(currentTag.id)
      .then(() => {
        toggleDeleteModal();
        loadTags();
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Tag Management</h1>
        <Button color="primary" onClick={toggleCreateModal}>
          Create New Tag
        </Button>
      </div>

      {error && (
        <Alert color="danger" toggle={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Table>
        <thead>
          <tr>
            <th>Tag Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tags.map((tag) => (
            <tr key={tag.id}>
              <td>{tag.name}</td>
              <td>
                <Button
                  color="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEditClick(tag)}
                >
                  Edit
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => handleDeleteClick(tag)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {tags.length === 0 && <p className="text-muted">No tags available.</p>}

      {/* Create Tag Modal */}
      <Modal isOpen={isCreateModalOpen} toggle={toggleCreateModal}>
        <ModalHeader toggle={toggleCreateModal}>Create New Tag</ModalHeader>
        <Form onSubmit={handleCreateTag}>
          <ModalBody>
            {error && <Alert color="danger">{error}</Alert>}
            <FormGroup>
              <Label for="tagName">Tag Name</Label>
              <Input
                type="text"
                id="tagName"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                required
                placeholder="Enter tag name"
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleCreateModal}>
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Save
            </Button>
          </ModalFooter>
        </Form>
      </Modal>

      {/* Edit Tag Modal */}
      <Modal isOpen={isEditModalOpen} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit Tag</ModalHeader>
        <Form onSubmit={handleUpdateTag}>
          <ModalBody>
            {error && <Alert color="danger">{error}</Alert>}
            <FormGroup>
              <Label for="editTagName">Tag Name</Label>
              <Input
                type="text"
                id="editTagName"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                required
                placeholder="Enter tag name"
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleEditModal}>
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Save
            </Button>
          </ModalFooter>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} toggle={toggleDeleteModal}>
        <ModalHeader toggle={toggleDeleteModal}>Confirm Delete</ModalHeader>
        <ModalBody>
          {error && <Alert color="danger">{error}</Alert>}
          Are you sure you want to delete the tag "
          {currentTag && currentTag.name}"?
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleDeleteModal}>
            Cancel
          </Button>
          <Button color="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}