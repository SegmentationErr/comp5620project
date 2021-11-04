import React, { Component } from 'react';
import {Card} from 'antd'; 

class GameCard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() { 
        const data = this.props.data
        return (
                <Card
                    className="game-card"
                    title={data.gameName}
                    style={{width: 300}}
                    hoverable={true}
                    onClick={() => {
                        this.props.history.push({
                            pathname: '/MotionDetectionGame/PlayGame_'+data.id,
                            state: {data: data}
                        })
                    }}
                >
                    <p> Creator: {data.creatorName}</p>
                </Card>
        );
    }
}
 
export default GameCard;