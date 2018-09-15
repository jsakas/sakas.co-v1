
import React from 'react';
import ReactDOM from 'react-dom';

import './App.scss';

const Thing = () => {
  return (
    <h1>Hello!</h1>
  );
};

ReactDOM.render(
  <Thing />,
  document.getElementById('app')
);
