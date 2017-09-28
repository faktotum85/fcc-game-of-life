import React, { Component } from 'react';
import Gameboard from './Gameboard';
import Options from './Options';
import Generation from './Generation';

class App extends Component {
  constructor() {
    super();
    this.state = {
      board: {
        height: 20,
        width: 20
      },
      cells: [],
      generation: 0
    }

    this.setCells = this.setCells.bind(this);
    this.toggleAlive = this.toggleAlive.bind(this);
    this.runTurn = this.runTurn.bind(this);
    this.clearBoard = this.clearBoard.bind(this);
    this.randomBoard = this.randomBoard.bind(this);
    this.toggleRunning = this.toggleRunning.bind(this);
    this.stop = this.stop.bind(this);
  }

  componentWillMount() {
    this.setCells(true);
    const intervalId = setInterval(this.runTurn, 100);
    this.setState({
      turnTimer: intervalId
    });
  }

  clearBoard() {
    this.stop();
    this.setCells(false);
  }

  stop() {
    let intervalId = this.state.turnTimer;
    if (intervalId) {
      intervalId = clearInterval(intervalId);
      this.setState({
        turnTimer: intervalId
      });
    }
  }

  randomBoard() {
    this.stop();
    this.setCells(true);
  }

  setCells(random=false) { // call with random=true to generate random board;
    this.setState({generation: 0}); //reset generation count;

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
      cols.forEach((c) => {
        rows.forEach((r) => {
          cell = c + r * width;
          if (cell !== i) {
            neighbors.push(cell);
          }
        })
      })
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
    this.setState({
      cells,
      generation: this.state.generation + 1
    });
  }

  toggleRunning() {
    let intervalId = this.state.turnTimer;
    if (intervalId) {
      this.stop();
    } else {
      intervalId = setInterval(this.runTurn, 100);
      this.setState({
        turnTimer: intervalId
      });
    }
  }

  render() {
    return (
      <div>
        <h1>Game of Life</h1>
        <Gameboard board={this.state.board} cells={this.state.cells} toggleAlive={this.toggleAlive}></Gameboard>
        <Options
          runTurn={this.runTurn}
          clearBoard={this.clearBoard}
          randomBoard={this.randomBoard}
          running={this.state.turnTimer}
          toggleRunning={this.toggleRunning}>
        </Options>
        <Generation generation={this.state.generation}></Generation>

      </div>
    );
  }
}

export default App;
