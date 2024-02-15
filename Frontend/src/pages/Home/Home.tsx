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

  const ClearTaskCompleted = () => {
    const hasCompleted = todos.some(todo => todo.completed);
    if (hasCompleted) {
      setTodos(todos.filter(todo => !todo.completed));
    } else {
      setTodos(todos.map(todo => ({
        ...todo,
        completed: true,
      })));
    }
  };

  const remainingTodos = todos.filter(todo => !todo.completed).length;

  // Filtra os itens com base no estado showIncomplete
  const filteredTodos = showIncomplete ? todos.filter(todo => !todo.completed) : todos;

  const hasCompleted = todos.some(todo => todo.completed); // Declarado aqui

  return (
    <div className='bg-gray-100 w-full h-screen flex flex-col justify-center items-center'>
      <div className='flex flex-col items-center'>
        <h1 className='font-sans font-normal text-8xl mb-5 text-red-800 opacity-80'>todos</h1>
        <div className='input-container'>
          <button onClick={() => setShowIncomplete(!showIncomplete)}>
            <FaAngleDown />
          </button>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={inputText}
            onChange={handleInputChange}
            onKeyPress={handleInputKeyPress}
          />
        </div>
        {todos.length > 0 && (
          <div className='bg-white flex flex-col items-start'>
            <TodoList
              todos={filteredTodos} 
              toggleCompletion={toggleTodoCompletion}
              removeTodo={removeTodo}
              editTodo={editTodo}
            />
            <div className='flex flex-row items-start'>
              <span className='ml-2 mr-5'>{remainingTodos} item(s) left</span>
              <TodoFilter />
              {hasCompleted && <button onClick={ClearTaskCompleted}>Clear Completed</button>}
            </div>
          </div>
        )}

        
      </div>
    </div>
  );
};

export default Home;
