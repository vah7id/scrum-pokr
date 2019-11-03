import React, { Component } from 'react';

class Cards extends Component<any, any> {
  render() {
    return (
      <div className={'Cards'}>
          <ul>
          {
            [1, 3, 5, 8, 13, 20, 30, 40, 50].map(card => {
              return(<li onClick={(e) => this.props.setCard(e) }><b>{card}</b></li>);
            })
          }
          </ul>
      </div>
    );
  }
}

export default Cards;