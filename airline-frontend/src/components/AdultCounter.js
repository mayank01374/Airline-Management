import React from "react";
import { Button } from "react-bootstrap";

const AdultCounter = ({ count, onIncrement, onDecrement }) => {
  return (
    <div>
      <span>
        Adults:{"  "}
        <Button variant="outline-primary" onClick={onIncrement}>
          +
        </Button>
        {"  "}
        {count}
        {"  "}
        <Button variant="outline-primary" onClick={onDecrement}>
          -
        </Button>
      </span>
    </div>
  );
};

export default AdultCounter;
