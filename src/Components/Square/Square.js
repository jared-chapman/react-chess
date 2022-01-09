import React from 'react';

class Square extends React.Component {
    selected = null
      render() {
          return (
              <button 
                style = {this.props.l ? {background: "#227F32" } : {background: "#D5C798" }}
                className="square" 
                key = {this.props.squareName}
                
                onClick = {() => {
                  const name = this.props.squareName
                  console.log(name);
                  
                  // If "selecting", set selecting to false and set selected to the clicked square's piece
                  if (this.props.getSelecting()) {
                    this.props.setSelectedSquare(name)
                    this.props.setSelecting(false)
                  } else {
                  // If not selecting, update the clicked square with the selected piece, set selected piece to null, and set selecting to true
                    this.props.clearSelectedSquare()
                    this.props.setSelecting(true)
                    this.props.updateSquare(this.props.getSelectedSquare().key, name); 
                  }
                }}
                >
              {<img src={this.props.p.image}></img>}
              </button>
          ); 
    }}

export default Square;