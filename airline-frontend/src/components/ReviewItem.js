import React from "react";
import { Card } from "react-bootstrap";

const ReviewItem = ({ review }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Airline: {review.airline}</Card.Title>
        <Card.Text>Review: {review.review}</Card.Text>
        <Card.Text>
          <small className="text-muted">Rating: {review.rating}</small>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ReviewItem;
