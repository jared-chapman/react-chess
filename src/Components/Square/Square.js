import React from 'react';

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      isSelectable: false,
      showDot: false
    };
  }
  selected = null
    render() {
      return (
        <button 
          style = {this.state.isSelectable ? {background: "#bdb2db"} : this.props.l ? {background: "#227F32" } : {background: "#D5C798" }}
          className="square" 
          key = {this.props.squareName}
          
          onClick = {() => {
            const name = this.props.squareName
            // If "selecting" and clicking an empty square, do nothing
            if (this.props.getSelecting() && this.props.getTurn() !== this.props.p.isWhite){
            // If it's not appropriate turn, do nothing
            } else if (this.props.getSelecting() && this.props.getTurn() !== this.props.p.isWhite){
              console.log("It's not your turn")
            // If "selecting" and appropriate turn, set selecting to false and set selected to the clicked square's piece
            } else if (this.props.getSelecting() && this.props.getTurn() == this.props.p.isWhite) {
              console.log("Picking up the %s on %s", this.props.p.name, name);
              this.props.setcurrentAvailableMoves(this.props.getLegalMoves(this.props.p, this.props.getIndicesFromCoordinate(name)))
              this.props.setSelectedSquare(name)
              this.props.setSelecting(false)
              // This should be set to show "this.props.getcurrentAvailableMoves", but it is not set in time
              // TODO add async functions
              console.log("Available moves: " + this.props.getLegalMoves(this.props.p, this.props.getIndicesFromCoordinate(name)))
              
              // Keep track of pawn position for en passant


            } else {
              console.log("Trying to place on " + name)
              // If not selecting, check if selected square is an available square
              const validMoves = this.props.checkIfValidMove(this.props.getcurrentAvailableMoves(), name);
              if (validMoves){
                console.log("This is a valid move. Turn Complete")
                // update the clicked square with the selected piece, set selected piece to null, and set selecting to true

                // Keep track of moved from row to track en passant
                const movedFromRow = this.props.getSelectedSquare().row;
                const movedFromCol = this.props.getSelectedSquare().col;
                const movedPiece = this.props.getSelectedSquare().piece;
                const landedOnRow = this.props.r;

                // Create En Passant piece when a pawn make a double
                if (movedPiece.name == "Pawn" && Math.abs(landedOnRow - movedFromRow) == 2) {
                  // Pawn moved double. Set skipped square as en passant
                  const epCol = movedFromCol;
                  const epRow = (movedPiece.isWhite ? movedFromRow + 1 : movedFromRow - 1)
                  const coordinate = this.props.getCoordinateFromCR(epCol, epRow);
                  this.props.placeEnPassant(coordinate, movedPiece.isWhite);
                }


                // Clean up
                this.props.clearSelectedSquare()
                this.props.setSelecting(true)
                this.props.updateSquare(this.props.getSelectedSquare().key, name); 
                this.props.clearEnPassant(!movedPiece.isWhite)
                this.props.updateTurn();

                

                
              } else {
                // Act like first click didn't happen
                console.log("This is not a valid move. Resetting")
                this.props.clearSelectedSquare()
                this.props.setSelecting(true)
              }
                  
              }
            }}
          >
        {/* {cool little hack to use a blank image if there is no image source (for enPassant pieces)} */}
        {<img src={this.props.p.image? this.props.p.image : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="}></img>}
        {<img src={this.props.p.image? this.props.p.image : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="}></img>}
        </button>
      ); 
    }}

export default Square;