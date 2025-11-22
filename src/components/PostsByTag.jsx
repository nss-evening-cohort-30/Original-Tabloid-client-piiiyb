import { useEffect, useState } from "react";
import { getPostsByTag } from "../managers/postManager";
import { getAllTags } from "../managers/tagManager";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

export default function PostsByTag() {
  const [tags, setTags] = useState([]);
  const [selectedTagId, setSelectedTagId] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllTags()
      .then(setTags)
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    if (selectedTagId) {
      setLoading(true);
      setError(null);
      getPostsByTag(selectedTagId)
        .then((data) => {
          setPosts(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      setPosts([]);
    }
  }, [selectedTagId]);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString();

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Find Posts by Tag</h2>

      <Row>
        <Col md="12">
          <FormGroup>
            <Label for="tagSelect">Select a Tag</Label>
            <Input
              type="select"
              id="tagSelect"
              value={selectedTagId}
              onChange={(e) => setSelectedTagId(e.target.value)}
            >
              <option value="">-- Choose a tag --</option>
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Col>
      </Row>

      {error && (
        <Row>
          <Col>
            <div className="alert alert-danger">{error}</div>
          </Col>
        </Row>
      )}

      {loading && (
        <Row>
          <Col>
            <p>Loading posts...</p>
          </Col>
        </Row>
      )}

      {!loading && selectedTagId && posts.length === 0 && (
        <Row>
          <Col>
            <p className="text-muted">No posts found with this tag.</p>
          </Col>
        </Row>
      )}

      {!loading && posts.length > 0 && (
        <Row>
          <Col md="12">
            <h4 className="mb-3">Posts ({posts.length})</h4>
            {posts.map((post) => (
              <Card className="mb-3" key={post.id}>
                <CardBody>
                  <CardTitle tag="h5">{post.title}</CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    {post.subTitle}
                  </CardSubtitle>
                  <CardText>{post.body}</CardText>

                  <div className="d-flex justify-content-between text-muted small">
                    <span>Published: {formatDate(post.publishedOn)}</span>
                    <span>Read Time: {post.realTime} min</span>
                  </div>
                  <div className="text-muted small mt-1">
                    By {post.user?.firstName} {post.user?.lastName} •{" "}
                    {post.category?.name}
                  </div>
                </CardBody>
              </Card>
            ))}
          </Col>
        </Row>
      )}
    </Container>
  );
}
