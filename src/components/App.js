import React, { Component } from 'react';
import Gameboard from './Gameboard';
import Options from './Options';

class App extends Component {
  constructor() {
    super();
    this.state = {
      board: {
        height: 10,
        width: 10
      },
      cells: []
    }

    this.setCells = this.setCells.bind(this);
    this.toggleAlive = this.toggleAlive.bind(this);
    this.runTurn = this.runTurn.bind(this);
    this.clearBoard = this.clearBoard.bind(this);
    this.randomBoard = this.randomBoard.bind(this);
  }

  componentWillMount() {
    this.setCells(true);
  }

  clearBoard() {
    this.setCells(false);
  }

  randomBoard() {
    this.setCells(true);
  }

  setCells(random=false) { // call with random=true to generate random board;
    const cells = [];
    const width = this.state.board.width;
    const height = this.state.board.height;
    const cellCount = width * height;

    for (let i=0; i < cellCount; i++) {

      cells.push({
        alive: random && (Math.random() > 0.7),
        next: false,
        index: i,
        neighbors: getNeighbors(i)
      });
    }

    this.setState({ cells });

    function getNeighbors(i) {
      const neighbors = [];

      let col = i % width;
      let row = Math.floor(i / width);

      let cols = [col - 1 >= 0 ? col - 1 : width - 1, col, col + 1 < width ? col + 1 : 0];
      let rows = [row - 1 >= 0 ? row - 1 : height - 1, row, row + 1 < height ? row + 1 : 0];

      let cell;
      for (let c of cols) {
        for (let r of rows) {
          cell = c + r * width;
          if (cell !== i) {
            neighbors.push(cell);
          }
        }
      }
      return neighbors;
    }
  }

  toggleAlive(index) {
    const cells = [...this.state.cells];
    cells[index].alive = !cells[index].alive;
    this.setState({cells});
  }

  runTurn() {
    const cells = [...this.state.cells]
    // simulate turn
    cells.forEach((cell) => {
      // count number of alive neighbors.
      let count = 0;
      cell.neighbors.forEach((neighbor) => {
        if (cells[neighbor].alive) {
          count++;
        }
      });
      // apply rules and update next property.
      if (cell.alive) {
        if (count < 2 || count >= 4) {
          cell.next = false;
        } else {
          cell.next = true;
        }
      } else {
        if (count === 3) {
          cell.next = true;
        } else {
          cell.next = false;
        }
      }
    });
    // run turn
    cells.forEach((cell) => {
      cell.alive=cell.next;
    });
    // update state
    this.setState({cells});
  }

  render() {
    return (
      <div>
        <Gameboard board={this.state.board} cells={this.state.cells} toggleAlive={this.toggleAlive}></Gameboard>
        <Options runTurn={this.runTurn} clearBoard={this.clearBoard} randomBoard={this.randomBoard}></Options>
      </div>
    );
  }
}

export default App;
