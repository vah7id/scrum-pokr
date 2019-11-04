import React, { Component } from 'react';
import Icons from './Icons';

class Players extends Component<any, any> {
  render() {
    return (
      <div className={'Players'}>
        <div className={'Player'}>
          <img alt={'player'} src={Icons.chicken} />
          <h3>Hugo</h3>
        </div>
      </div>
    );
  }
}

export default Players;