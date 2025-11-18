import { useEffect, useState } from "react";
import { getPosts } from "../managers/postManager";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
} from "reactstrap";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then(setPosts)
  }, [])

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString();

  if (!posts.length) {
    return (
      <Container className="mt-5">
        <h2>Latest Posts</h2>
        <p>No posts</p>
      </Container>
    );
  }

  const bigPost = posts[0];
  const smallPosts = posts.slice(1);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Latest Posts</h2>
      <Row>
          <Col md="6">
            <Card className="mb-4">
              <CardBody>
                <CardTitle tag="h3">{bigPost.title}</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h5">
                  {bigPost.subTitle}
                </CardSubtitle>

                <CardText>
                  {bigPost.body}
                </CardText>

                <div className="d-flex justify-content-between text-muted small">
                  <span>Published: {formatDate(bigPost.publishedOn)}</span>
                  <span>Read Time: {bigPost.realTime} min</span>
                </div>
                <div className="text-muted small mt-1">
                  By {bigPost.author?.name} - {bigPost.category?.name}
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col md="4">
            {smallPosts.map((post) => (
              <Card className="mb-3" key={post.id}>
                <CardBody>
                  <CardTitle tag="h5" className="mb-1">
                    {post.title}
                  </CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    {post.subTitle}
                  </CardSubtitle>
                  <CardText className="text-muted">
                    {post.body}
                  </CardText>

                  <div className="d-flex justify-content-between text-muted small">
                    <span>Published: {formatDate(post.publishedOn)}</span>
                    <span>Read Time: {post.realTime} min</span>
                  </div>
                  <div className="text-muted small mt-1">
                    By {post.author?.name} • {post.category?.name}
                  </div>
                </CardBody>
              </Card>
            ))}
          </Col>
        </Row>
      <Col md="4">{/* Authors will go here later */}</Col>
    </Container>
  );
}
