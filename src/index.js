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
import emptyImage from './piece_images/empty.png'


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
const empty = {
  name: "Empty Square",
  r: 1,
  c: 1,
  image: emptyImage,
  availableSquares(position) {
      return position;
  }
}

const startingPiecePositions = [[rookB, knightB, bishopB, queenB, kingB, bishopB, knightB, rookB],
                                [pawnB, pawnB,   pawnB,   pawnB,  pawnB, pawnB,   pawnB,   pawnB],
                                [empty,     empty,     empty,     empty,    empty,   empty,     empty,     empty],
                                [empty,     empty,     empty,     empty,    empty,   empty,     empty,     empty],
                                [empty,     empty,     empty,     empty,    empty,   empty,     empty,     empty],
                                [empty,     empty,     empty,     empty,    empty,   empty,     empty,     empty],
                                [pawnW, pawnW,   pawnW,   pawnW,  pawnW, pawnW,   pawnW,   pawnW],
                                [rookW, knightW, bishopW, queenW, kingW, bishopW, knightW, rookW]];


class Square extends React.Component {

    render() {
        return (
            <button 
              style = {this.props.l ? {background: "#227F32" } : {background: "#D5C798" }}
              className="square" 
              key = {this.props.squareName}
              onClick = {() => {
                const name = this.props.squareName
                console.log(name);
                //console.log(getOriginFromCoordinate(name));
                this.props.updateSquare("A8", this.props.squareName);
              }}
              >
            {<img src={this.props.p.image}></img>}
            </button>
        ); 
    
  }}

    // Create a simple array of row/col values
    // This is what is mapped over
    let squarePositions = [];
    for (let i=0; i<8; i++){
        for (let j=0; j<8; j++){
            squarePositions.push([i, j, (i+j)%2]);
        }
    }

    // Function to build square objects
    // This will be called in the map function below
    let buildSquares = (x) => {
        let squareToPush     = {};
        squareToPush.row     = 8-x[0];
        squareToPush.col     = x[1]+1;
        squareToPush.light   = x[2];
        squareToPush.piece   = startingPiecePositions[x[0]][x[1]];
        squareToPush.key     = letters[x[1]] + (8-x[0]).toString();
        return squareToPush;
    }
    
    // Map over squarePositions and feed in buildSquares
    // To create an array of square objects (NOT components)
    // Then create 2D array of objects
    let squaresToBuild = squarePositions.map(buildSquares);
    let tempSquaresToBuild = [];
    while (squaresToBuild.length > 0){
        tempSquaresToBuild.push(squaresToBuild.splice(0,8));
    }
    squaresToBuild = tempSquaresToBuild;
    console.log(squaresToBuild)


    let getSquareObjectFromCoordinate = (coordinate) => {
      let toReturn = "Fail"
      console.log("Looking for " + coordinate)
      squaresToBuild.map((x, xIndex) => {
        x.map((y, yIndex) => {
          if (y.key == coordinate) {
            //console.log("A: " + xIndex + " B: " + yIndex)
            toReturn = squaresToBuild[xIndex][yIndex];
          }
        })
      })
      return toReturn;
    }
  
    
   class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state = { squaresArray: squaresToBuild };
    }
    
    // Move a piece from origin to destination
    updateSquare = (origin, destination) => {
      const originSquare      = getSquareObjectFromCoordinate(origin);
      const destinationSquare = getSquareObjectFromCoordinate(destination);
      console.log("This should move the " + originSquare.piece.name + " on " + originSquare.key + " to " + destinationSquare.key)
      const piece = originSquare.piece;
      originSquare.piece = empty;
      destinationSquare.piece = piece;
      
      
      this.setState({
        squaresArray: squaresToBuild
      })
    }

    

    

    render() {
      

      return (
        <div>
          {this.state.squaresArray.map((x) => {
            return (
              <div>
                {x.map((y) => {
                  return (
                    <Square
                      c = {y.col}
                      r = {y.row}
                      l = {y.light}
                      p = {y.piece}
                      key = {y.key}
                      squareName = {y.key}
                      updateSquare = {this.updateSquare}
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
            <Board />
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  