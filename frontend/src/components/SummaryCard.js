import React, { Component } from 'react';

import '../App.css'

class SummaryCard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div
                className="summary-card"
                style={{visibility: this.props.display ? 'visible' : 'hidden'}}
                onClick={() => {
                    console.log(123123)
                    this.props.history.push("/MotionDetectionGame/gamehall")
                }}
            >
                <h1 style={{marginTop: 60, fontSize: 50}} >Congratulations ! !</h1>
                <h1 style={{marginTop: 40}} >Your Score: </h1>
                {this.props.score}
                <h1 style={{marginTop: 80}} >History Highest Scores: </h1>
                {this.props.highest_scores.length > 0 ? this.props.highest_scores.map((item, ind) => {
                    return (
                        <p key={ind}>Top {ind+1}: {item.score}</p>
                    )
                })
                :
                <p>No Record Yet</p>
                }
            </div>
        );
    }
}
 
export default SummaryCard;