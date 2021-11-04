import React, { Component } from 'react';
import {Card} from 'antd'; 

const base64 = require("base-64")

class GameCard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() { 
        let data = this.props.data
        return (
                <Card
                    className="game-card"
                    title={data.gameName}
                    hoverable={true}
                    onClick={() => {
                        try {
                            data.configFileContent = JSON.parse(base64.decode(this.props.data.configFileContent))
                            this.props.history.push({
                                pathname: '/MotionDetectionGame/PlayGame_'+data.id,
                                state: {data: data}
                            })
                        } catch(err) {
                            console.log(err)
                        }
                    }}
                >
                    <p> Creator: {data.creatorName}</p>
                </Card>
        );
    }
}
 
export default GameCard;