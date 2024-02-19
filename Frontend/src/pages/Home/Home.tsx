import React, { useState, useEffect } from 'react';
import TodoList from '../../components/TodoList/TodoList';
import TodoFilter from '../../components/TodoFilter/TodoFilter';
import FooterComponent from '../../components/Footer/FooterComponent';
import DivListFooter from '../../components/DivListFooter/DivListFooter';
import { FaAngleDown } from "react-icons/fa6";

import { useLocation } from 'react-router-dom';
import axios from 'axios';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [buttonOpacity, setButtonOpacity] = useState<number>(20); // Estado para controlar a opacidade do botão

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const filter = params.get('filter');

  // Chamando a Api via GET DA URL para aparecer os dados no Console
  const getPosts = async() => {
    try {
      const response = await axios.get(
        'https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos'
        );
        const data = response.data
        console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPosts();
  }), [];

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
    setButtonOpacity(100); // Atualiza o estado para remover a opacidade
    setTimeout(() => {
      setButtonOpacity(20); // Restaure a opacidade original após um breve atraso
    }, 1000); // 1000 milissegundos = 1 segundo
  }
  

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
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    } else if (filter === 'completed') {
      return todo.completed;
    }
    return true; // Se nenhum filtro estiver presente, mostrar todas as tarefas
  });

  const hasCompleted = todos.some(todo => todo.completed); // Declarado aqui

  return (
    <div className='bg-gray-100 w-full h-screen flex flex-col justify-center items-center'>
      <div className='flex flex-col items-center'>
        <h1 className='font-sans font-normal text-8xl mb-5 text-red-800 opacity-80'>todos</h1>
          <div className='relative'>
            <button className={`absolute left-2 top-1/2 transform -translate-y-1/2 ${buttonOpacity === 100 ? '' : 'opacity-20'}`} onClick={handleToggleAllComplete}>
              <FaAngleDown />
            </button>
            <input
              className='custom-input-width h-14 pl-10 border border-gray-300 text-xl font-normal custom-placeholder'
              type='text'
              placeholder='What needs to be done?'
              value={inputText}
              onChange={handleInputChange}
              onKeyPress={handleInputKeyPress}
            />
          </div>
          {todos.length > 0 && (
            <div className='bg-white flex flex-col border border-gray-200 pb-2'>
              <TodoList
                todos={filteredTodos} 
                toggleCompletion={toggleTodoCompletion}
                removeTodo={removeTodo}
                editTodo={editTodo}
              />
              <div className='flex flex-row  items-start'>
                <span className='ml-2 mr-20'>{remainingTodos} item(s) left</span>
                <TodoFilter />
                {hasCompleted && 
                  <button className='ml-10' onClick={ClearTaskCompleted}>Clear Completed</button>}
              </div>
            </div>
          )}
          {todos.length > 0 && (
            <DivListFooter />
          )}
        
        <FooterComponent />
      </div>
    </div>
  );
};

export default Home;
