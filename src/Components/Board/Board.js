import React from 'react';
import Square from '../Square/Square.js'
import {pawnB, pawnW, knightB, knightW, bishopB, bishopW, rookB, rookW, queenB, queenW, kingB, kingW, empty} from './../../Pieces.js'

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']



const startingPiecePositions = [[rookB,   knightB,   bishopB,    queenB,    kingB, bishopB,   knightB,     rookB],
                                [pawnB,     pawnB,     pawnB,     pawnB,    pawnB,   pawnB,     pawnB,     pawnB],
                                [empty,     empty,     empty,     empty,    empty,   empty,     empty,     empty],
                                [empty,     empty,     empty,     empty,    empty,   empty,     empty,     empty],
                                [empty,     empty,     empty,     empty,    empty,   empty,     empty,     empty],
                                [empty,     empty,     empty,     empty,    empty,   empty,     empty,     empty],
                                [pawnW,     pawnW,     pawnW,     pawnW,    pawnW,   pawnW,     pawnW,     pawnW],
                                [rookW,   knightW,   bishopW,    queenW,    kingW, bishopW,   knightW,     rookW]];

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
// Then create 2D array of objects (for ease of component rendering)
let squaresToBuild = squarePositions.map(buildSquares);
let tempSquaresToBuild = [];
while (squaresToBuild.length > 0){
    tempSquaresToBuild.push(squaresToBuild.splice(0,8));
}
squaresToBuild = tempSquaresToBuild;

// Accept coordinate in "B4" format and return corresponding square object (not component)
let getSquareObjectFromCoordinate = (coordinate) => {
  let toReturn = "Fail"
  squaresToBuild.map((x, xIndex) => {
    x.map((y, yIndex) => {
      if (y.key == coordinate) {
        toReturn = squaresToBuild[xIndex][yIndex];
      }
    })
  })
  return toReturn;
}







class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      squaresArray: squaresToBuild,
      selecting: true, 
      selectedSquare: null,
      currentAvailableMoves: []
    };
  }
    
  // Move the piece on origin to destination
  updateSquare = (origin, destination) => {
    const originSquare      = getSquareObjectFromCoordinate(origin);
    const destinationSquare = getSquareObjectFromCoordinate(destination);
    const piece = originSquare.piece;
    originSquare.piece = empty;
    destinationSquare.piece = piece; 
  }

  setSelecting = (value) => {
    this.setState({
      selecting: value
    })
  }

  getSelecting = () => {
    return this.state.selecting
  }

  setcurrentAvailableMoves = (value) => {
    this.setState({
      currentAvailableMoves: value
    })
  }

  getcurrentAvailableMoves = () => {
    return this.state.currentAvailableMoves;
  }

  setSelectedSquare = (coordinate) => {
    const square = getSquareObjectFromCoordinate(coordinate)
    this.setState({
      selectedSquare: getSquareObjectFromCoordinate(coordinate)
    })
  }

  clearSelectedSquare = () => {
    this.setState({
      selectedSquare: null
    })
  }

  getSelectedSquare = () => {
    return this.state.selectedSquare
  }

    // Provide a piece and position, return the available squares
    // This ignores things like blocking pieces, check, pins, etc.
  getLegalMoves = (piece, position) => {
    const deltas = piece.positionDeltas;
    let toReturn = [];
    deltas.map((x) => {
      if ([position[0] + x[0]] > 0 && 
          [position[0] + x[0]] < 9 &&
          [position[1] + x[1]] > 0 && 
          [position[1] + x[1]] < 9){
        toReturn.push([letters[position[0] + x[0] -1]].toString() + [position[1] + x[1]].toString());
        }
    });
    // console.log(toReturn)
    return toReturn;
  }

  // Provide list of valid moves ( ["B4", "C3"] format) and selected position ( "B4" format) and return if move is valid or not
  checkIfValidMove = ((validMoves, proposedMove) => {
    let toReturn = false;
    // convert valid moves and proposed move to coordinates
    const validMoveIndices = []
    validMoves.map((x) => {
      validMoveIndices.push(this.getIndicesFromCoordinate(x))
    })
    const proposedMoveIndex = this.getIndicesFromCoordinate(proposedMove)
    // Check if valid moves contain proposed move
    validMoveIndices.map((x) => {
      if (x.toString() == proposedMoveIndex.toString()) {
        toReturn = true;
      }
    })
    return toReturn;
  })

  // Accepts coordinate in "B4" format and return [2, 4] format
  getIndicesFromCoordinate = (coordinate) => {
    let letter = coordinate.charAt(0);
    let first = letters.indexOf(letter)+1;
    let second = parseInt(coordinate.charAt(1));
    let toReturn = [first, second];
    return(toReturn);
  }

    render() {
      
      return (
        <div key={"innerDiv"} className={"Board"}>
          <ol key = {"selecting"}>{this.state.selecting ? "Selecting" : "Moving"}</ol>
          <ol key = {"selectedPiece"}>{this.state.selectedSquare ? this.state.selectedSquare.piece.name + " at " + this.state.selectedSquare.key : "No Piece Selected"}</ol>
          
          {this.state.squaresArray.map((x, index) => {
            return (
              <div key={"outerDiv" + index}>
                {x.map((y) => {
                  return (
                    <Square
                      c = {y.col}
                      r = {y.row}
                      l = {y.light}
                      p = {y.piece}
                      key = {y.key}
                      squareName = {y.key}
                      currentAvailableMoves = {[]}
                      updateSquare = {this.updateSquare}
                      clearSelectedSquare = {this.clearSelectedSquare}
                      setSelectedSquare = {this.setSelectedSquare}
                      getSelectedSquare = {this.getSelectedSquare}
                      setSelecting = {this.setSelecting}
                      getSelecting = {this.getSelecting}
                      getLegalMoves = {this.getLegalMoves}
                      checkIfValidMove = {this.checkIfValidMove}
                      getIndicesFromCoordinate = {this.getIndicesFromCoordinate}
                      setcurrentAvailableMoves = {this.setcurrentAvailableMoves}
                      getcurrentAvailableMoves = {this.getcurrentAvailableMoves}
                    />
                  )
                })}
              </div>
            )})}
          </div>
        )
      }
    }

    export default Board;