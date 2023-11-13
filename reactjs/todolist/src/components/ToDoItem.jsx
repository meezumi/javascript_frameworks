import React, { useState } from "react";

function ToDoItem(props) {
  const [clicked, setclicked] = useState(false);

  function handleClick() {
    setclicked((prevValue) => {
      return !prevValue;
    });
  }

  return (
    <div onClick={handleClick}>
      <li style={{ textDecoration: clicked ? "line-through" : "none" }}>
        {props.text}
      </li>
    </div>
  );
}

// props are readonly

export default ToDoItem;
