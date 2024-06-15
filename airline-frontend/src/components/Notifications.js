import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Notifications = () => {
  const [notificationType, setNotificationType] = useState("");
  const [contactMethod, setContactMethod] = useState("");

  const handleSetNotification = (e) => {
    e.preventDefault();

    console.log({ notificationType, contactMethod });
  };

  return (
    <div>
      <Form onSubmit={handleSetNotification}>
        <Form.Group>
          <Form.Label>Notification Type</Form.Label>
          <Form.Control
            as="select"
            value={notificationType}
            onChange={(e) => setNotificationType(e.target.value)}
          >
            <option value="">Select notification type</option>
            <option value="Flight Reminder">Flight Reminder</option>
            <option value="Price Alert">Price Alert</option>
            <option value="Check-in Reminder">Check-in Reminder</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Contact Method</Form.Label>
          <Form.Control
            as="select"
            value={contactMethod}
            onChange={(e) => setContactMethod(e.target.value)}
          >
            <option value="">Select contact method</option>
            <option value="Email">Email</option>
            <option value="SMS">SMS</option>
            <option value="Push Notification">Push Notification</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Set Notification
        </Button>
      </Form>
    </div>
  );
};

export default Notifications;
