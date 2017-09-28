import React from 'react';

class Cell extends React.Component {

  render() {
    const index = this.props.index;
    const cell = this.props.cell;
    return (
      <div className={"cell" + (cell.alive ? " alive" : "")} onClick={() => this.props.toggleAlive(index)}>

      </div>
    )
  }
}

export default Cell;
