import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import ReviewItem from "./ReviewItem";

const Reviews = () => {
  const [airline, setAirline] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/reviews");
        setReviews(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newReview = { airline, review, rating };
      const response = await axios.post(
        "http://localhost:5000/api/reviews",
        newReview
      );
      setReviews([...reviews, response.data]);
      setAirline("");
      setReview("");
      setRating("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Reviews and Ratings</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Airline</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter airline name"
            value={airline}
            onChange={(e) => setAirline(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Review</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Write your review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Rating</Form.Label>
          <Form.Control
            as="select"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="">Select rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit Review
        </Button>
      </Form>
      <div className="mt-4">
        {reviews.map((rev, index) => (
          <ReviewItem key={index} review={rev} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
