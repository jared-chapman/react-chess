import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import blackKing from './piece_images/blackKing.png'
import blackQueen from './piece_images/blackQueen.png'
import blackRook from './piece_images/blackRook.png'
import blackBishop from './piece_images/blackBishop.png'
import blackKnight from './piece_images/blackKnight.png'
import blackPawn from './piece_images/blackPawn.png'
import whiteKing from './piece_images/whiteKing.png'
import whiteQueen from './piece_images/whiteQueen.png'
import whiteRook from './piece_images/whiteRook.png'
import whiteBishop from './piece_images/whiteBishop.png'
import whiteKnight from './piece_images/whiteKnight.png'
import whitePawn from './piece_images/whitePawn.png'


const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

//Initialize pieces
const pawnB = {
  name: "Pawn",
  hasMoved: false,
  range: 2,
  r: 1,
  c: 1,
  image: blackPawn,
  availableSquares(position) {
      return position;
  }
}
const pawnW = {
  name: "Pawn",
  hasMoved: false,
  range: 2,
  r: 1,
  c: 1,
  image: whitePawn,
  availableSquares(position) {
      return position;
  }
}
const knightB = {
  name: "Knight",
  r: 1,
  c: 1,
  image: blackKnight,
  availableSquares(position) {
      return position;
  }
}
const knightW = {
  name: "Knight",
  r: 1,
  c: 1,
  image: whiteKnight,
  availableSquares(position) {
      return position;
  }
}
const bishopB = {
  name: "Bishop",
  r: 1,
  c: 1,
  image: blackBishop,
  availableSquares(position) {
      return position;
  }
}
const bishopW = {
  name: "Bishop",
  r: 1,
  c: 1,
  image: whiteBishop,
  availableSquares(position) {
      return position;
  }
}
const rookB = {
  name: "Rook",
  r: 1,
  c: 1,
  image: blackRook,
  availableSquares(position) {
      return position;
  }
}
const rookW = {
  name: "Rook",
  r: 1,
  c: 1,
  image: whiteRook,
  availableSquares(position) {
      return position;
  }
}
const queenB = {
  name: "Queen",
  r: 1,
  c: 1,
  image: blackQueen,
  availableSquares(position) {
      return position;
  }
}
const queenW = {
  name: "Queen",
  r: 1,
  c: 1,
  image: whiteQueen,
  availableSquares(position) {
      return position;
  }
}
const kingB = {
  name: "King",
  r: 1,
  c: 1,
  image: blackKing,
  availableSquares(position) {
      return position;
  }
}
const kingW = {
  name: "King",
  r: 1,
  c: 1,
  image: whiteKing,
  availableSquares(position) {
      return position;
  }
}

const startingPiecePositions = [[rookB, knightB, bishopB, queenB, kingB, bishopB, knightB, rookB],
                                [pawnB, pawnB,   pawnB,   pawnB,  pawnB, pawnB,   pawnB,   pawnB],
                                [NaN,     NaN,     NaN,     NaN,    NaN,   NaN,     NaN,     NaN],
                                [NaN,     NaN,     NaN,     NaN,    NaN,   NaN,     NaN,     NaN],
                                [NaN,     NaN,     NaN,     NaN,    NaN,   NaN,     NaN,     NaN],
                                [NaN,     NaN,     NaN,     NaN,    NaN,   NaN,     NaN,     NaN],
                                [pawnW, pawnW,   pawnW,   pawnW,  pawnW, pawnW,   pawnW,   pawnW],
                                [rookW, knightW, bishopW, queenW, kingW, bishopW, knightW, rookW]];


class Square extends React.Component {
    constructor(props){
        super(props);
        
        
        

        this.state = {
            c: this.props.c,
            r: this.props.r,
            l: this.props.l,
            p: this.props.p,
            visible: false
        }
    }
    render() {
      if (this.state.l) {
        return (
            <button 
              style = {{background: "#227F32" }}
              className="square" 
              key = {this.props.keyName}
              onClick = {() => {
                console.log("keyValue: " + this.props.keyName)
                // Trying to move a piece
                // console.log("click");
                //let piece = this.state.p;
                //squaresToBuild[this.state.r+1][this.state.c+1].state.p = piece;
              }}
              >
            {<img src={this.state.p.image} ></img>}
            
            </button>
        ); 
    } else {
        return (
            <button
                style = {{background: "#D5C798" }}
                className="square"
                key = {this.props.keyName}
                onClick = {() => {
                  console.log("keyValue: " + this.props.keyName)
                }}
                >
                {<img src={this.state.p.image}></img>}
            </button>
            );   
    }
  }}

    // Create a simple array of row/col values
    // This is what is mapped over
    let squarePositions = [];
    for (let i=7; i>-1; i--){
        for (let j=0; j<8; j++){
            squarePositions.push([i, j, (i+j+1)%2]);
        }
    }

    // Function to build square objects
    // This will be called in the map function below
    let buildSquares = (x) => {
        let squareToPush     = {};
        squareToPush.row     = x[0]+1;
        squareToPush.col     = x[1];
        squareToPush.light   = x[2];
        squareToPush.piece   = startingPiecePositions[x[0]][x[1]];
        squareToPush.keyName = letters[x[1]] + (x[0]+1).toString();
        return squareToPush;
    }
    
    // Create single array of objects
    let squaresToBuild = squarePositions.map(buildSquares);
    let tempSquaresToBuild = [];
    while (squaresToBuild.length > 0){
        tempSquaresToBuild.push(squaresToBuild.splice(0,8));
    }
    squaresToBuild = tempSquaresToBuild;

  let squareComponents = [];
    
   class Board extends React.Component {

    

    render() {
      return (
        <div key = {1}>
          {squaresToBuild.map((x) => {
            return (
              <div>
                {x.map((y) => {
                  squareComponents.push()
                  return (
                    <Square
                      c = {y.col}
                      r = {y.row}
                      l = {y.light}
                      p = {y.piece}
                      keyName = {y.keyName}
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
  