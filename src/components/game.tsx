import React, { Component } from 'react';
import Kickoff from './Kickoff';
import { Icons } from './Icons';

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
  }
  setName(e: any, reset: boolean = false) {
  	if(this.state.name.length < 6) {
  		const value = e.currentTarget.innerHTML;
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
    return (
      <div className="Game crt">
      	{/*
      		this.state.screen === Screen.KICK_OFF && 
      		<Kickoff 
      			{...this.state} 
      			kickoff={this.kickoff} 
      			setName={this.setName}
  			/>
      	*/}
      	{
      		this.state.screen === Screen.KICK_OFF &&
      		<div className="Panel">
      			<div className={'Cards'}>
      				<ul>
      				{
      					[1, 3, 5, 8, 13, 20, 30, 40, 50].map(card => {
							return(<li onClick={(e) => this.props.setCard(e) }><b>{card}</b></li>);
						})
      				}
      				</ul>
      			</div>
	      		<div className={'Players'}>
	      			<div className={'Player'}>
	      				<img src={Icons.robot} />
		        		<h3>+Invite</h3>
	      			</div>
		        	<div className={'Player'}>
		        		<img src={Icons.chicken} />
		        		<h3>Hugo</h3>
		        	</div>
		        	<div className={'Player'}>
		        		<img src={Icons.hamster} />
		        		<h3>Vahid</h3>
		        	</div>
		        	<div className={'Player'}>
		        		<img src={Icons.ghost} />
		        		<h3>Tams</h3>
		        	</div>
		        </div>
	        </div>
      	}
      </div>
    );
  }
}

export default Game;