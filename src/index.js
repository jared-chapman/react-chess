import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './Components/Board/Board.js'


  class Game extends React.Component {
    render() {
      return (
        <div className="game">
            <Board />
        </div>
      );
    }
  }
  
  
  ReactDOM.render(
      <Game />,
    document.getElementById('root')
  );
  