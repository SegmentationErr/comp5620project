import React, { Component } from 'react';
import {Card} from 'antd'; 

class GameCard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
                <Card className="game-card" title={this.props.title} style={{width: 300}} hoverable={true} >
                    <p> Creator: {this.props.creator }</p>
                </Card>
        );
    }
}
 
export default GameCard;