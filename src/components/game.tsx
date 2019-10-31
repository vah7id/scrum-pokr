import React, { Component } from 'react';

interface State {
	name: string;
}

class Game extends Component<any, State> {
  constructor() {
  	super(true);
    this.state = {
      name: ''
    }
  }
  setName(e: any) {
  	const current = this.state.name;
  	if(current.length < 10) {
    	this.setState({ name: current + e.currentTarget.innerHTML });
    }
  }
  resetName() {
    this.setState({ name: '' });
  }
  render() {
  	let alphabets = []; 
    for(let i = 0; i < 26 ; i++) {
	    alphabets.push(<li onClick={(e)=>this.setName(e)}>{String.fromCharCode(97 + i).toUpperCase()}</li>);
    }
    return (
      <div className="Game">
      	<div className={'Entry'}>
      		<h2>{this.state.name || 'Who are you?'}</h2>
      		<ul>
      			{ alphabets }
      			<li onClick={() => this.resetName() } className={'reset'}>{"<<"}</li>
      		</ul>
      		<div className={'btn arcade-font'}>
	          Start
	        </div>
      	</div>
        <div className={'Players'}>
        	<div className={'Player'}>

        	</div>
        </div>
      </div>
    );
  }
}

export default Game;