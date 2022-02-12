import React from 'react';
import Square from '../Square/Square.js'
import {pawnB, pawnW, knightB, knightW, bishopB, bishopW, rookB, rookW, queenB, queenW, kingB, kingW, empty, enPassantB, enPassantW} from './../../Pieces.js'

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
      currentAvailableMoves: [],
      canCastle: [1, 1, 1, 1] // clockwise from top left
    };
  }
    
  // Move the piece on origin to destination. 
  // Handles removing piece captured by en passant
  updateSquare = (origin, destination) => {
    const originSquare      = getSquareObjectFromCoordinate(origin);
    const destinationSquare = getSquareObjectFromCoordinate(destination);
    const piece = originSquare.piece;
    // This just copies the origin square to squareToKill, which ALWAYS gets cleared on a move anyway
    // If en passant, updates it to the pawn that is getting captured
    let squareToKill = getSquareObjectFromCoordinate(origin);
    if (destinationSquare.piece.name == "enPassant") {
      const destinationCoordinate = this.getCRFromCoordinate(destination)
      let rToKill = originSquare.row;
      let cToKill = destinationCoordinate[0]+1;
      let coordinateToKill = this.getCoordinateFromCR(cToKill, rToKill);
      squareToKill = getSquareObjectFromCoordinate(coordinateToKill);
    }

    // Castling
    // This can definitely be cleaned up
    if (piece.name == "King" && originSquare.key == "E8" && destinationSquare.key == "C8" && this.state.canCastle[0]) {
      let squares = this.state.squaresArray
      squares.forEach((row,) => {
        let newRow = [];
        row.forEach((square,) => {
          newRow.push(square)
          if (square.key == "C8") {
            square.piece = kingB;
          }
          if (square.key == "E8") {
            square.piece = empty;
          }
          if (square.key == "D8") {
            square.piece = rookB;
          }
          if (square.key == "A8") {
            square.piece = empty;
          }
        })
      })
      this.setState({
        squaresArray: squares
      })
  }

    if (piece.name == "King" && originSquare.key == "E8" && destinationSquare.key == "G8" && this.state.canCastle[1]) {
      let squares = this.state.squaresArray
      squares.forEach((row,) => {
        let newRow = [];
        row.forEach((square,) => {
          newRow.push(square)
          if (square.key == "G8") {
            square.piece = kingB;
          }
          if (square.key == "E8") {
            square.piece = empty;
          }
          if (square.key == "F8") {
            square.piece = rookB;
          }
          if (square.key == "H8") {
            square.piece = empty;
          }
        })
      })
      this.setState({
        squaresArray: squares
      })
  }

    if (piece.name == "King" && originSquare.key == "E1" && destinationSquare.key == "G1" && this.state.canCastle[2]) {
      let squares = this.state.squaresArray
      squares.forEach((row,) => {
        let newRow = [];
        row.forEach((square,) => {
          newRow.push(square)
          if (square.key == "G1") {
            square.piece = kingW;
          }
          if (square.key == "E1") {
            square.piece = empty;
          }
          if (square.key == "F1") {
            square.piece = rookW;
          }
          if (square.key == "H1") {
            square.piece = empty;
          }
        })
      })
      this.setState({
        squaresArray: squares
      })
  }

    if (piece.name == "King" && originSquare.key == "E1" && destinationSquare.key == "C1" && this.state.canCastle[3]) {
      let squares = this.state.squaresArray
      squares.forEach((row,) => {
        let newRow = [];
        row.forEach((square,) => {
          newRow.push(square)
          if (square.key == "C1") {
            square.piece = kingW;
          }
          if (square.key == "E1") {
            square.piece = empty;
          }
          if (square.key == "D1") {
            square.piece = rookW;
          }
          if (square.key == "A1") {
            square.piece = empty;
          }
        })
      })
      this.setState({
        squaresArray: squares
      })
  }

    // Remove ability to castle
    // This may be a cleaner way to do this :shrug:
    if (originSquare.key == "A8") {
      this.setState({
        canCastle: [0, this.state.canCastle[1], this.state.canCastle[2], this.state.canCastle[3]]
      })
    }
    if (originSquare.key == "H8") {
      this.setState({
        canCastle: [this.state.canCastle[0], 0, this.state.canCastle[2], this.state.canCastle[3]]
      })
    }
    if (originSquare.key == "H1") {
      this.setState({
        canCastle: [this.state.canCastle[0], this.state.canCastle[1], 0, this.state.canCastle[3]]
      })
    }
    if (originSquare.key == "A1") {
      this.setState({
        canCastle: [this.state.canCastle[0], this.state.canCastle[1], this.state.canCastle[2], 0]
      })
    }
    if (originSquare.key == "E8") {
      this.setState({
        canCastle: [0, 0, this.state.canCastle[2], this.state.canCastle[3]]
      })
    }
    if (originSquare.key == "E1") {
      this.setState({
        canCastle: [this.state.canCastle[0], this.state.canCastle[1], 0, 0]
      })
    }
    console.log(this.state.canCastle)


    // This is the normal movement loop for non-enPassant and non-castling moves
    let squares = this.state.squaresArray
    squares.forEach((row,) => {
      let newRow = [];
      row.forEach((square,) => {
        newRow.push(square)
        if (square.key == originSquare.key || square.key == squareToKill.key) {
          square.piece = empty;
        }
        if (square.key == destinationSquare.key) {
          square.piece = piece;
        }
      })
    })
    this.setState({
      squaresArray: squares
    })
  }

  placeEnPassant = (coordinate, isWhite) => {
    const square = getSquareObjectFromCoordinate(coordinate)
    isWhite ? square.piece = enPassantW : square.piece = enPassantB;
  }

  clearEnPassant = (isWhite) => {
    let squares = this.state.squaresArray
    squares.forEach((row, indexA) => {
      let newRow = [];
      row.forEach((square, indexB) => {
        newRow.push(square)
        if (square.piece.isWhite == isWhite && (square.piece.name == "enPassant")) {
          console.log("clearing en passant")
          square.piece = empty;
        }
      })
    })
    this.setState({
      squaresArray: squares
    })
  }

  // Pass col and row (2, 2) and return B2 format
  getCoordinateFromCR = (col, row) => {
    return letters[col-1] + (row).toString()
  }

  // Pass coordinate in B2 format and return col and row (2, 2)
  getCRFromCoordinate = (coordinate) => {
    const row = letters.indexOf(coordinate[0]);
    const col = coordinate[1];
    const CR = [row, col]
    console.log(CR);
    return CR;
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
  getLegalMoves = (piece, position) => {
    let deltas = piece.positionDeltas;
    // Pawn Logic for 4th rank movement on first move only
    // Remove second positionDelta from pawn if it's not on the 2nd (or 7th) rank
    if (piece.name === "Pawn" && piece.isWhite && position[1] != 2) {
      deltas = [[[0, 1]],
                [[1, 1]],
                [[-1, 1]]]
    } else {
      if (piece.name === "Pawn" && !piece.isWhite && position[1] != 7) {
        deltas = [[[0, -1]],
                    [[1, -1]],
                    [[-1, -1]]]
      }
    }    

    // Create "Rays" of movement
    // This is so pieces can't move "through" other pieces
    let moveRays = [];
    deltas.map((x) => {
      let ray = [];
      x.map((y) => {
        ray.push([y[0] + position[0], y[1] + position[1]])
      })
      moveRays.push(ray)
    })
    
    let toReturn = [];
    for (let i = 0; i < moveRays.length; i++) {
      for (let j = 0; j < moveRays[i].length; j++) {
        const checkingOn = moveRays[i][j];
        
        // Make sure we're only looking at squares within the bounds of the board
        if (checkingOn[0] < 9 && 
          checkingOn[0] > 0 && 
          checkingOn[1] < 9 &&
          checkingOn[1] > 0)  {
            const checkingOnName = letters[checkingOn[0]-1] + checkingOn[1].toString();
            const checkingOnPiece = getSquareObjectFromCoordinate(checkingOnName).piece;

              if (checkingOnPiece.name != "Empty Square") {
                if (checkingOnPiece.isWhite == piece.isWhite){
                  // Code if square to check contains a matching piece
                  break;
                } else {
                  // Code if square to check contains a piece of a different color
                  // console.log(`checkingOn[0]: ${checkingOn[0]}  position[0]: ${position[0]}`)
                  if (piece.name === "Pawn"){
                    // Don't let a pawn capture unless it's diagonally
                    if (checkingOn[0] === position[0]) {
                     break;
                    } else {
                      toReturn.push(checkingOnName);
                    }
                  } else {
                    toReturn.push(checkingOnName);
                    break;
                  }
                }
              } else { 
                // Code if square does not have a piece
                // Don't let pawn move diagonally unless square contains a piece of a different color
                if (piece.name === "Pawn" && position[0] != checkingOn[0]) {
                  break;

                // Castling
                } 
                if (piece.name === "King" && !piece.isWhite) {
                  console.log(`this.state.canCastle[0] ${this.state.canCastle[0]}  B8 piece ${getSquareObjectFromCoordinate("B8").piece.name}  C8 piece ${getSquareObjectFromCoordinate("C8").piece.name}   D8 piece ${getSquareObjectFromCoordinate("D8").piece.name}   `) 
                  if (this.state.canCastle[0] && getSquareObjectFromCoordinate("B8").piece.name == "Empty Square" && getSquareObjectFromCoordinate("C8").piece.name == "Empty Square" && getSquareObjectFromCoordinate("D8").piece.name == "Empty Square") {
                    toReturn.push("C8")
                  }
                  if (this.state.canCastle[1] && getSquareObjectFromCoordinate("F8").piece.name == "Empty Square" && getSquareObjectFromCoordinate("G8").piece.name == "Empty Square") {
                    toReturn.push("G8")
                  }
                }
                if (piece.name === "King" && piece.isWhite) {
                  if (this.state.canCastle[2] && getSquareObjectFromCoordinate("F1").piece.name == "Empty Square" && getSquareObjectFromCoordinate("G1").piece.name == "Empty Square") {
                    toReturn.push("G1")
                  }
                  if (this.state.canCastle[3] && getSquareObjectFromCoordinate("B1").piece.name == "Empty Square" && getSquareObjectFromCoordinate("C1").piece.name == "Empty Square" && getSquareObjectFromCoordinate("D1").piece.name == "Empty Square") {
                    toReturn.push("C1")
                  }
                }
                  toReturn.push(checkingOnName)
              
              } 
            }
          }
        }
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
                      getCoordinateFromCR = {this.getCoordinateFromCR}
                      placeEnPassant = {this.placeEnPassant}
                      clearEnPassant = {this.clearEnPassant}
                      updateTurn = {this.props.updateTurn}
                      getTurn = {this.props.getTurn}
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