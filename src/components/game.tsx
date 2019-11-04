import React, { Component } from 'react';
import Kickoff from './Kickoff';
import Cards from './Cards';
import Players from './Players';

interface State {
	name: string;
	screen: string;
}

enum Screen {
	KICK_OFF = 'KICK_OFF',
	PLAYING = 'PLAYING',
	GAME_OVER = 'GAME_OVER',
	DISCONNECT = 'DISCONNECT',
}

class Game extends Component<any, State> {
  constructor() {
  	super(true);
    this.state = {
      name: '',
      screen: Screen.KICK_OFF,
    }
    this.setName = this.setName.bind(this);
    this.kickoff = this.kickoff.bind(this);
    this.setCard = this.setCard.bind(this);
  }
  setName(e: any, reset: boolean = false) {
	const value = e.currentTarget.innerHTML;
  	if(this.state.name.length < 6) {
    	this.setState({ name: reset ? '' : this.state.name + value });
    }
  }
  setCard(e: any) {
  	console.log(e.currentTarget.value)
  }
  kickoff() {
  	this.setState({ screen: Screen.PLAYING });
  }
  render() {
    const url = window.location.href.replace('#!/','');
    return (
      <div className="Game crt">
      	{
      		this.state.screen === Screen.KICK_OFF && 
      		<Kickoff 
      			{...this.state} 
      			kickoff={this.kickoff} 
      			setName={this.setName}
  			/>
      	}
      	{
      		this.state.screen === Screen.PLAYING &&
      		<div className="Panel">
	      		<div className={'Invitation'}>
		          <span>{url}</span>
		        </div>
      			<Cards setCard={this.setCard} />
	      		<Players />
	        </div>
      	}
      </div>
    );
  }
}

export default Game;