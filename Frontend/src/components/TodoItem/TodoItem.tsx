import React, { useState } from 'react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  toggleCompletion: (id: number) => void;
  removeTodo: (id: number) => void;
  editTodo: (id: number, newTitle: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleCompletion, removeTodo, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    editTodo(todo.id, newTitle);
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleCompletion(todo.id)}
      />
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <span onDoubleClick={handleDoubleClick} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
          {todo.title}
        </span>
      )}
      <button onClick={() => removeTodo(todo.id)}>Remove</button>
    </li>
  );
};

export default TodoItem;
