import React from 'react';

class Options extends React.Component {
  render() {
    return (
      <div className="options">
        <button onClick={this.props.runTurn}>Run turn</button>
        <button onClick={this.props.clearBoard}>Clear board</button>
        <button onClick={this.props.randomBoard}>Random board</button>
      </div>
    )
  }
}

export default Options;
