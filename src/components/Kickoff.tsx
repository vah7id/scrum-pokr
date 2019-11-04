import React, { Component } from 'react';

class Kickoff extends Component<any, any> {
  getAlphabets() {
    let alphabets = [];
    let i = 0;
    while(i < 26) {
      const char = String.fromCharCode(97 + i).toUpperCase();
      alphabets.push(<li onClick={(e)=>this.props.setName(e)}>{char}</li>);
      i++;
    }
    return alphabets;
  }
  render() {
    return (
      <div className={'Entry'}>
        <h2>{this.props.name || 'Who are you?'}</h2>
        <ul>
          { this.getAlphabets() }
          <li onClick={(e) => this.props.setName(e, true) } className={'reset'}>{"<<"}</li>
        </ul>
        <div onClick={() => this.props.kickoff()} className={`btn arcade-font ${this.props.name || 'disabled'}`}>
          Start
        </div>
      </div>
    );
  }
}

export default Kickoff;