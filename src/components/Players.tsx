import React, { Component } from 'react';
import Icons from './Icons';
import { client } from '../';

type Player = {
  id: string;
  name: string;
  status: string;
}

interface State {
  players: Player[]
}

class Players extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      players: []
    }
  }
  componentWillMount() {
    client.onmessage = (msg: any) => {
      this.setState({ players: JSON.parse(msg.data).room.players });
    }
  }
  render() {
    return (
      <div className={'Players'}>
      {
        this.state.players.map((player: Player, i: number) => {
          const avatar: string = Icons[Object.keys(Icons)[i]];
          return (
            <div className={'Player'}>
              <img alt={'player'} src={avatar} />
              <h3>{player.name}</h3> <small>{player.status}</small>
            </div>
          )
        })
      }
      </div>
    );
  }
}

export default Players;