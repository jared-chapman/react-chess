import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

//Initialize pieces
const pawn = {
  name: "Pawn",
  hasMoved: false,
  range: 2,
  r: 1,
  c: 1,
  image: "<img src=/pawn.png>",
  availableSquares(position) {
      return position;
  }

}
const knight = {
  name: "Knight",
  r: 1,
  c: 1,
  availableSquares(position) {
      return position;
  }
}
const bishop = {
  name: "Bishop",
  r: 1,
  c: 1,
  availableSquares(position) {
      return position;
  }
}
const rook = {
  name: "Rook",
  r: 1,
  c: 1,
  availableSquares(position) {
      return position;
  }
}
const queen = {
  name: "Queen",
  r: 1,
  c: 1,
  availableSquares(position) {
      return position;
  }
}
const king = {
  name: "King",
  r: 1,
  c: 1,
  availableSquares(position) {
      return position;
  }
}

const startingPiecePositions = [[rook, knight, bishop, queen, king, bishop, knight, rook],
                             [pawn, pawn,   pawn,   pawn,  pawn, pawn,   pawn,   pawn],
                             ["", "",   "",   "",  "", "",   "",   ""],
                             ["", "",   "",   "",  "", "",   "",   ""],
                             ["", "",   "",   "",  "", "",   "",   ""],
                             ["", "",   "",   "",  "", "",   "",   ""],
                             [pawn, pawn,   pawn,   pawn,  pawn, pawn,   pawn,   pawn],
                             [rook, knight, bishop, queen, king, bishop, knight, rook]]

class Square extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            c: this.props.c,
            r: this.props.r,
            l: this.props.l,
            p: this.props.p,
            //pieceName: this.props.piece.name,
            visible: false
        }
    }
    render() {
      if (this.state.l) {
        return (
            <button 
                style = {{background: "#227F32" }}
                className="square" 

                >
            {this.state.p.name}
            </button>
        ); 
    } else {
        return (
            <button
                style = {{background: "#D5C798" }}
                className="square"
                >
                {this.state.p.name}
            </button>
            );   
    }
  }}



    // Create a simple array of row/col values
    let squarePositions = [];
    for (let i=7; i>-1; i--){
        for (let j=0; j<8; j++){
            squarePositions.push([i, j, (i+j+1)%2]);
        }
    }

    // Function to build square objects
    // This will be called in the map function below
    let buildSquares = (x) => {
        let squareToPush   = {};
        squareToPush.row   = x[0];
        squareToPush.col   = x[1];
        squareToPush.light = x[2];
        squareToPush.piece = startingPiecePositions[x[0]][x[1]];
        return squareToPush;
    }
    
    // Create single array of objects
    let squaresToBuild = squarePositions.map(buildSquares);
    let test = [];
    while (squaresToBuild.length > 0){
        test.push(squaresToBuild.splice(0,8));
    }
    squaresToBuild = test;
    


   class Board extends React.Component {
    
    
    render() {
        return (
                <div>
                    {squaresToBuild.map((x) => {
                        return (
                            <div>
                                {x.map((y) => {
                                    return (
                                        <Square
                                            c = {y.col}
                                            r = {y.row}
                                            l = {y.light}
                                            p = {y.piece}
                                        />
                                    )
                                })}
                            </div>
                     )})}
                </div>
            )
        }
    }

    
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  