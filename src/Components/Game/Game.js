import React from 'react';
import Board from '../Board/Board.js'

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            isWhitesTurn: true,
            moves: []
        };
      }

    updateTurn = () => {
        this.setState({isWhitesTurn: !this.state.isWhitesTurn})
        //console.log(`isWhitesTurn Updated to ${this.state.isWhitesTurn}`)
    }
    getTurn = () => {
        return this.state.isWhitesTurn;
    }


    render() {
      return (
          <div>
            <ol key = {"Is White's Turn"}>{this.state.isWhitesTurn ? "White's Turn" : "Black's Turn"}</ol>
            <div className="game">
                <Board 
                isWhitesTurn = {this.state.isWhitesTurn}
                updateTurn = {this.updateTurn}
                getTurn = {this.getTurn}/>
            </div>
        </div>
      );
    }
  }

  export default Game;