import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const TodoFilter: React.FC = () => {
  const { pathname } = useLocation();
  
  return (
    <div>
      <Link to={{ pathname, search: '' }}>All</Link>{' '}
      <Link to={`${pathname}?filter=active`}>Active</Link>{' '}
      <Link to={`${pathname}?filter=completed`}>Completed</Link>
    </div>
  );
};

export default TodoFilter;
