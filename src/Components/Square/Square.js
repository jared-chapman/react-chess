import React from 'react';

class Square extends React.Component {
  selected = null
    render() {
      return (
        <button 
          style = {this.props.l ? {background: "#227F32" } : {background: "#D5C798" }}
          className="square" 
          key = {this.props.squareName}
          //let currentAvailableMoves = {null}
          
          onClick = {() => {
            const name = this.props.squareName
                              
            // If "selecting", set selecting to false and set selected to the clicked square's piece
            if (this.props.getSelecting()) {
              console.log("Picking up the %s on %s", this.props.p.name, name);
              this.props.setcurrentAvailableMoves(this.props.getValidMoves(this.props.p, this.props.getIndicesFromCoordinate(name)))
              this.props.setSelectedSquare(name)
              this.props.setSelecting(false)
              // This should be set to show "this.props.getcurrentAvailableMoves", but it is not set in time
              // TODO add async functions
              console.log("Available moves: " + this.props.getValidMoves(this.props.p, this.props.getIndicesFromCoordinate(name)))
              
            } else {
              console.log("Trying to place on " + name)
              // If not selecting, check if selected square is an available square
              if (this.props.checkIfValidMove(this.props.getcurrentAvailableMoves(), name)){
                console.log("This is a valid move. Turn Complete")
                // update the clicked square with the selected piece, set selected piece to null, and set selecting to true
                  this.props.clearSelectedSquare()
                  this.props.setSelecting(true)
                  this.props.updateSquare(this.props.getSelectedSquare().key, name); 
              } else {
                // Act like first click didn't happen
                console.log("This is not a valid move. Resetting")
                this.props.clearSelectedSquare()
                this.props.setSelecting(true)
              }
                  
              }
            }}
          >
        {<img src={this.props.p.image}></img>}
        </button>
      ); 
    }}

export default Square;