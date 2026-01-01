import React, { useState } from "react";

interface TodoItemProps {
  initialText?: string;
}

const TodoItem: React.FC<TodoItemProps> = ({
  initialText = "My first todo",
}) => {
  const [isDone, setIsDone] = useState(false);

  const handleClick = () => {
    setIsDone(!isDone);
  };

  return (
    <li
      onClick={handleClick}
      style={{
        cursor: "pointer",
        textDecoration: isDone ? "line-through" : "none",
      }}
    >
      {initialText}
    </li>
  );
};

export default TodoItem;
