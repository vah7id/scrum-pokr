import React, { Component } from 'react';
import Kickoff from './Kickoff';
import Cards from './Cards';
import Players from './Players';
import { sendMessage } from '../utils/client';

interface State {
	name: string;
	screen: string;
	gameId: string;
}

enum Screen {
	KICK_OFF = 'KICK_OFF',
	PLAYING = 'PLAYING',
	GAME_OVER = 'GAME_OVER',
	DISCONNECT = 'DISCONNECT',
}

class Game extends Component<any, State> {
  constructor(props: any) {
  	super(props);
    this.state = {
	  gameId: this.props.location.pathname.split('/')[1],
      name: '',
      screen: Screen.KICK_OFF,
    }
    this.setName = this.setName.bind(this);
    this.kickoff = this.kickoff.bind(this);
    this.setCard = this.setCard.bind(this);
  }
  componentWillMount() {
  	this.auth();
  }
  auth() {
  	const loggedInUser = window['localStorage'].getItem('user');
  	if(loggedInUser) {
  		const data = JSON.parse(loggedInUser);
  		if(data.gameId === this.state.gameId) {
  			console.log('join again')
  			sendMessage("JOIN_GAME", {
	  			"id": this.state.gameId,
	  			"name": data.name,
	  			"sessionId": data.id,
	  		});
  			this.setState({ screen: Screen.PLAYING });
  		} else {
  			// window['localStorage'].removeItem('user');
  		}
  		
  	}
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
  	const sessionId = Math.random().toString(36).substr(2, 16);
  	window['localStorage'].setItem('user', JSON.stringify({
  		gameId: this.state.gameId,
  		id: sessionId,
  		name: this.state.name
  	}));
  	console.log('save in localstorage')
	sendMessage("JOIN_GAME", {
		"id": this.state.gameId,
		"name": this.state.name,
		"sessionId": sessionId,
	});
  }
  render() {
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
		          <span>{this.state.gameId}</span>
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