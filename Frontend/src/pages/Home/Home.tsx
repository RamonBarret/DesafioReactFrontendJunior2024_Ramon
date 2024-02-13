import React, { useState } from 'react';
import TodoList from '../../components/TodoList/TodoList';
import TodoFilter from '../../components/TodoFilter/TodoFilter';
import { FaAngleDown } from "react-icons/fa6";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [showIncomplete, setShowIncomplete] = useState<boolean>(false); 

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

  // Filtra os itens com base no estado showIncomplete
  const filteredTodos = showIncomplete ? todos.filter(todo => !todo.completed) : todos;

  return (
    <div className='main'>
      <div className='body'>
        <h1>todos</h1>
        <div className='input-container'>
          <button className='list_incomplete_tasks' onClick={() => setShowIncomplete(!showIncomplete)}><FaAngleDown /></button>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={inputText}
            onChange={handleInputChange}
            onKeyPress={handleInputKeyPress}
          />
        </div>
        
        <TodoList
          todos={filteredTodos} 
          toggleCompletion={toggleTodoCompletion}
          removeTodo={removeTodo}
          editTodo={editTodo}
        />
        <div className='itens-information'>
          <span>{remainingTodos} item(s) left</span>
          <button onClick={handleToggleAllComplete}>Toggle all completed</button>
        </div>
        <TodoFilter />
      </div>
    </div>
  );
};

export default Home;
