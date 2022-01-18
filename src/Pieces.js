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


//Initialize pieces
const pawnB = {
    name: "Pawn",
    image: blackPawn,
    positionDeltas: [[0, -1],
                     [0, -2],
                     [1, -1],
                     [-1, -1]]
  }
  const pawnW = {
    name: "Pawn",
    image: whitePawn,
    positionDeltas: [[0, 1],
                     [0, 2],
                     [1, 1],
                     [-1, 1]]
  }
  const knightB = {
    name: "Knight",
    image: blackKnight,
    positionDeltas:  [[1, 2],
                      [1, -2],
                      [2, 1],
                      [2, -1],
                      [-1, 2],
                      [-1, -2],
                      [-2, 1],
                      [-2, -1]] 
  }
  const knightW = {
    name: "Knight",
    image: whiteKnight,
    positionDeltas:  [[1, 2],
                      [1, -2],
                      [2, 1],
                      [2, -1],
                      [-1, 2],
                      [-1, -2],
                      [-2, 1],
                      [-2, -1]]               
  }
  const bishopB = {
    name: "Bishop",
    image: blackBishop,
    positionDeltas:  [[1, 1],
                      [2, 2],
                      [3, 3],
                      [4, 4],
                      [5, 5],
                      [6, 6],
                      [7, 7],
                      [-1, -1],
                      [-2, -2],
                      [-3, -3],
                      [-4, -4],
                      [-5, -5],
                      [-6, -6],
                      [-7, -7],
                      [1, -1],
                      [2, -2],
                      [3, -3],
                      [4, -4],
                      [5, -5],
                      [6 -6],
                      [7, -7],
                      [-1, 1],
                      [-2, 2],
                      [-3, 3],
                      [-4, 4],
                      [-5, 5],
                      [-6, 6],
                      [-7, 7]]
  }
  const bishopW = {
    name: "Bishop",
    image: whiteBishop,
    positionDeltas:  [[1, 1],
                      [2, 2],
                      [3, 3],
                      [4, 4],
                      [5, 5],
                      [6, 6],
                      [7, 7],
                      [-1, -1],
                      [-2, -2],
                      [-3, -3],
                      [-4, -4],
                      [-5, -5],
                      [-6, -6],
                      [-7, -7],
                      [1, -1],
                      [2, -2],
                      [3, -3],
                      [4, -4],
                      [5, -5],
                      [6 -6],
                      [7, -7],
                      [-1, 1],
                      [-2, 2],
                      [-3, 3],
                      [-4, 4],
                      [-5, 5],
                      [-6, 6],
                      [-7, 7]]
  }
  const rookB = {
    name: "Rook",
    image: blackRook,
    positionDeltas:  [[1, 0],
                      [2, 0],
                      [3, 0],
                      [4, 0],
                      [5, 0],
                      [6, 0],
                      [7, 0],
                      [-1, 0],
                      [-2, 0],
                      [-3, 0],
                      [-4, 0],
                      [-5, 0],
                      [-6, 0],
                      [-7, 0],
                      [0, 1],
                      [0, 2],
                      [0, 3],
                      [0, 4],
                      [0, 5],
                      [0, 6],
                      [0, 7],
                      [0, -1],
                      [0, -2],
                      [0, -3],
                      [0, -4],
                      [0, -5],
                      [0, -6],
                      [0, -7]]
  }
  const rookW = {
    name: "Rook",
    image: whiteRook,
    positionDeltas:  [[1, 0],
                      [2, 0],
                      [3, 0],
                      [4, 0],
                      [5, 0],
                      [6, 0],
                      [7, 0],
                      [-1, 0],
                      [-2, 0],
                      [-3, 0],
                      [-4, 0],
                      [-5, 0],
                      [-6, 0],
                      [-7, 0],
                      [0, 1],
                      [0, 2],
                      [0, 3],
                      [0, 4],
                      [0, 5],
                      [0, 6],
                      [0, 7],
                      [0, -1],
                      [0, -2],
                      [0, -3],
                      [0, -4],
                      [0, -5],
                      [0, -6],
                      [0, -7],
                    ]
  }
  const queenB = {
    name: "Queen",
    image: blackQueen,
    positionDeltas:  [[1, 0],
                      [2, 0],
                      [3, 0],
                      [4, 0],
                      [5, 0],
                      [6, 0],
                      [7, 0],
                      [-1, 0],
                      [-2, 0],
                      [-3, 0],
                      [-4, 0],
                      [-5, 0],
                      [-6, 0],
                      [-7, 0],
                      [0, 1],
                      [0, 2],
                      [0, 3],
                      [0, 4],
                      [0, 5],
                      [0, 6],
                      [0, 7],
                      [0, -1],
                      [0, -2],
                      [0, -3],
                      [0, -4],
                      [0, -5],
                      [0, -6],
                      [0, -7],
                      [1, 0],
                      [2, 0],
                      [3, 0],
                      [4, 0],
                      [5, 0],
                      [6, 0],
                      [7, 0],
                      [-1, 0],
                      [-2, 0],
                      [-3, 0],
                      [-4, 0],
                      [-5, 0],
                      [-6, 0],
                      [-7, 0],
                      [0, 1],
                      [0, 2],
                      [0, 3],
                      [0, 4],
                      [0, 5],
                      [0, 6],
                      [0, 7],
                      [0, -1],
                      [0, -2],
                      [0, -3],
                      [0, -4],
                      [0, -5],
                      [0, -6],
                      [0, -7],
                      [1, 1],
                      [2, 2],
                      [3, 3],
                      [4, 4],
                      [5, 5],
                      [6, 6],
                      [7, 7],
                      [-1, -1],
                      [-2, -2],
                      [-3, -3],
                      [-4, -4],
                      [-5, -5],
                      [-6, -6],
                      [-7, -7],
                      [1, -1],
                      [2, -2],
                      [3, -3],
                      [4, -4],
                      [5, -5],
                      [6 -6],
                      [7, -7],
                      [-1, 1],
                      [-2, 2],
                      [-3, 3],
                      [-4, 4],
                      [-5, 5],
                      [-6, 6],
                      [-7, 7]]
  }
  const queenW = {
    name: "Queen",
    image: whiteQueen,
    positionDeltas:  [[1, 0],
                      [2, 0],
                      [3, 0],
                      [4, 0],
                      [5, 0],
                      [6, 0],
                      [7, 0],
                      [-1, 0],
                      [-2, 0],
                      [-3, 0],
                      [-4, 0],
                      [-5, 0],
                      [-6, 0],
                      [-7, 0],
                      [0, 1],
                      [0, 2],
                      [0, 3],
                      [0, 4],
                      [0, 5],
                      [0, 6],
                      [0, 7],
                      [0, -1],
                      [0, -2],
                      [0, -3],
                      [0, -4],
                      [0, -5],
                      [0, -6],
                      [0, -7],
                      [1, 0],
                      [2, 0],
                      [3, 0],
                      [4, 0],
                      [5, 0],
                      [6, 0],
                      [7, 0],
                      [-1, 0],
                      [-2, 0],
                      [-3, 0],
                      [-4, 0],
                      [-5, 0],
                      [-6, 0],
                      [-7, 0],
                      [0, 1],
                      [0, 2],
                      [0, 3],
                      [0, 4],
                      [0, 5],
                      [0, 6],
                      [0, 7],
                      [0, -1],
                      [0, -2],
                      [0, -3],
                      [0, -4],
                      [0, -5],
                      [0, -6],
                      [0, -7],
                      [1, 1],
                      [2, 2],
                      [3, 3],
                      [4, 4],
                      [5, 5],
                      [6, 6],
                      [7, 7],
                      [-1, -1],
                      [-2, -2],
                      [-3, -3],
                      [-4, -4],
                      [-5, -5],
                      [-6, -6],
                      [-7, -7],
                      [1, -1],
                      [2, -2],
                      [3, -3],
                      [4, -4],
                      [5, -5],
                      [6 -6],
                      [7, -7],
                      [-1, 1],
                      [-2, 2],
                      [-3, 3],
                      [-4, 4],
                      [-5, 5],
                      [-6, 6],
                      [-7, 7]]
  }
  const kingB = {
    name: "King",
    image: blackKing,
    positionDeltas: [[-1, -1],
                     [-1, 0],
                     [-1, 1],
                     [0, -1],
                     [0, 1],
                     [1,-1],
                     [1, 0],
                     [1, 1]]
  }
  const kingW = {
    name: "King",
    image: whiteKing,
    positionDeltas: [[-1, -1],
                     [-1, 0],
                     [-1, 1],
                     [0, -1],
                     [0, 1],
                     [1,-1],
                     [1, 0],
                     [1, 1]]
  }
  const empty = {
    name: "Empty Square",
    r: 1,
    c: 1,
    image: emptyImage,
    positionDeltas: []
  }

export {pawnB, pawnW, knightB, knightW, bishopB, bishopW, rookB, rookW, queenB, queenW, kingB, kingW, empty}