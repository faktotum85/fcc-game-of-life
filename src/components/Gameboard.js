import React from 'react';
import Cell from './Cell';

class Gameboard extends React.Component {
  render() {
    return (
      <div className="board">
        {this.props.cells.map((cell) => {
          return <Cell key={cell.index} index={cell.index} toggleAlive={this.props.toggleAlive} cell={cell}></Cell>
        })}
      </div>
    )
  }
}

export default Gameboard;
