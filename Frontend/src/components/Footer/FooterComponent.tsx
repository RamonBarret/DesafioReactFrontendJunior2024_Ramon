import React from 'react';

const FooterComponent: React.FC = () => {
  return (
    <footer className='mt-14 text-xs font-sans font-normal text-center'>
      <p>Double-click to edit a todo</p>
      <p>Template by <a target='_blank' href="#">Sindre Sorthus</a></p>
      <p>Created by <a target='_blank' href="#">Chau Than</a></p>
      <p>Utilized <a target='_blank' href="#">XState</a> by <a target='_blank' href="#">David K.</a></p>
      <p>Part of <a target='_blank' href="https://github.com/EnkiGroup/DesafioReactFrontendJunior2024">TodoMVC</a></p>
    </footer>
  );
};

export default FooterComponent;
