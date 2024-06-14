import React from "react";
import { Button } from "react-bootstrap";

const ChildrenCounter = ({ count, onIncrement, onDecrement }) => {
  return (
    <div>
      <span>
        Children:{"  "}
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

export default ChildrenCounter;
