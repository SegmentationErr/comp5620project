import React, { Component } from 'react';

import '../App.css'

class SummaryCard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div className="summary-card" style={{visibility: this.props.display ? 'visible' : 'hidden'}}>
                <h1 style={{marginTop: 60, fontSize: 50}} >Congratulations ! !</h1>
                <h1 style={{marginTop: 40}} >Your Score: </h1>
                {this.props.score}
                <h1 style={{marginTop: 80}} >Overall Ranking: </h1>
                {this.props.ranking}
            </div>
        );
    }
}
 
export default SummaryCard;