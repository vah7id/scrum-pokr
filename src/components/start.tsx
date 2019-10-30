import React, { Component } from 'react';
import { Link } from "react-router-dom"

class Start extends Component<any, any> {
  render() {
    return (
      <div className="Start crt">
        <h2 className={'logo arcade-font'}>Scrum Pokr</h2>
        <div className={'btn arcade-font'}>
          <Link to={Math.random().toString(36).substr(2, 4)}>Play</Link>
        </div>
        <div className={'copyright'}>
	    	by&nbsp;
	    	<a href={'https://vah7id.github.io'}>Vahid Taghizadeh</a>
	  		<br />
	  		<span>&copy; 2019</span>
	    </div>
      </div>
    );
  }
}

export default Start;