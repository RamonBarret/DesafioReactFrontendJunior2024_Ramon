import React, { useState } from 'react';
import TodoList from '../../components/TodoList/TodoList';
import TodoFilter from '../../components/TodoFilter/TodoFilter';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addTodo();
    }
  };

  const addTodo = () => {
    if (inputText.trim() !== '') {
      const newTodo: Todo = {
        id: todos.length + 1,
        title: inputText,
        completed: false,
      };
      setTodos([newTodo, ...todos]);
      setInputText('');
    }
  };

  const toggleTodoCompletion = (id: number) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      })
    );
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: number, newTitle: string) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            title: newTitle,
          };
        }
        return todo;
      })
    );
  };

  const handleToggleAllComplete = () => {
    const allCompleted = todos.every(todo => todo.completed);
    setTodos(
      todos.map(todo => ({
        ...todo,
        completed: !allCompleted,
      }))
    );
  };

  const remainingTodos = todos.filter(todo => !todo.completed).length;

  return (
    <div>
      <h1>Todos</h1>
      <input
        className='addTaskName'
        type="text"
        placeholder="Add todo"
        value={inputText}
        onChange={handleInputChange}
        onKeyPress={handleInputKeyPress}
      />
      <button className='addTask' onClick={addTodo}>Add</button>
      <TodoList
        todos={todos}
        toggleCompletion={toggleTodoCompletion}
        removeTodo={removeTodo}
        editTodo={editTodo}
      />
      <div>
        <span>{remainingTodos} item(s) left</span>
        <button className='ToggleAllComplete' onClick={handleToggleAllComplete}>Toggle all completed</button>
      </div>
      <TodoFilter />
    </div>
  );
};

export default Home;