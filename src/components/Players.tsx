import React, { Component } from 'react';
import Icons from './Icons';

class Players extends Component<any, any> {
  copyToClibboard(value: string) {
    this.props.invite(true);
    const el = document.createElement('textarea');
    el.value = value;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
  render() {
    const url = window.location.href.replace('#!/','');
    return (
      <div className={'Players'}>
        {
          this.props.invitationModal !== 'hidden' &&  
          <div className={'Invitation'}>
            <span>{url}</span>
            <button 
              onClick={() => this.copyToClibboard(url)} className={'btn arcade-font btn-invite'}>Copy</button>
          </div>
        }
        <div onClick={() => this.props.invite()} className={'Player'}>
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
    );
  }
}

export default Players;