import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const TodoFilter: React.FC = () => {
  const { pathname } = useLocation();
  const filter = new URLSearchParams(useLocation().search).get('filter');

  return (
    <div>
      <Link to={{ pathname, search: '' }} className={ filter === null ? 'active-filter' : ''}>All</Link>{' '}
      <Link to={{ pathname, search: '?filter=active' }} className={filter === 'active' ? 'active-filter' : ''}>Active</Link>{' '}
      <Link to={{ pathname, search: '?filter=completed' }} className={filter === 'completed' ? 'active-filter' : ''}>Completed</Link>
    </div>
  );
};

export default TodoFilter;
