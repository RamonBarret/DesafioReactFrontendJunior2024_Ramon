import React from 'react';
import TodoItem from '../TodoItem/TodoItem';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  toggleCompletion: (id: number) => void;
  removeTodo: (id: number) => void;
  editTodo: (id: number, newTitle: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleCompletion, removeTodo, editTodo }) => {
  return (
    <ul className='text-xl custom-ul-width'>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleCompletion={toggleCompletion}
          removeTodo={removeTodo}
          editTodo={editTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;