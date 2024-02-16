import React, { useState } from 'react';
import { FaX } from "react-icons/fa6";

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
  const [isHovered, setIsHovered] = useState(false);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    editTodo(todo.id, newTitle);
  };

  return (
    <li className='custom-li-width ml-4 my-4 flex' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <input
        className='mr-5'
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleCompletion(todo.id)}
      />
      {isEditing ? (
        <input
          className='mr-5 block'
          type="text"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <span 
          onDoubleClick={handleDoubleClick} 
          className= {`inline-block transition-opacity duration-300 ${todo.completed ? 'line-through' : ''} ${todo.completed ? 'opacity-50' : ''}`}
        >
          {todo.title}
        </span>
      )}
      {isHovered && (
        <button className='ml-auto custom-button-FaX' onClick={() => removeTodo(todo.id)}>
          <FaX />
        </button>
      )}
    </li>
  );
};

export default TodoItem;
