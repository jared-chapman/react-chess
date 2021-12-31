import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

class Square extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            c: this.props.c,
            r: this.props.r,
            l: this.props.l,
            visible: false

            
        }
    }
    render() {
      if (this.state.l) {
        return (
            <button 
                style = {{background: "#227F32" }}
                className="square" 
                onMouseEnter={() => {
                    this.setState({visible: true});
                    }}
                onMouseLeave={() => {
                    this.setState({visible: false});
                }}
                >
            {this.state.visible ? letters[this.state.c] + ":" + (this.state.r+1) : ""}
            {/*this.state.l ? {style = {backgroundColor: "red"}} : hello=2*/}
            </button>
        ); 
    } else {
        return (
            <button
                style = {{background: "#D5C798" }}
                className="square" 
                onMouseEnter={() => {
                    this.setState({visible: true});
                    }}
                onMouseLeave={() => {
                    this.setState({visible: false});
                }}
                >
                {this.state.visible ? letters[this.state.c] + ":" + (this.state.r+1) : ""}
                {/*this.state.l ? {style = {backgroundColor: "red"}} : hello=2*/}
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