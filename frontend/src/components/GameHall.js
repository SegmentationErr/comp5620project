import React, { Component } from 'react';
import cookie from 'react-cookies';
import {Row, Col, Divider} from 'antd'
import GameCard from "./GameCard"

const style = {padding: "8px 0"};

class GameHall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                    {title: "g1", creator: "c1"},
                    {title: "g2", creator: "c2"},
                    {title: "g3", creator: "c3"},
                    {title: "g4", creator: "c4"},
                    {title: "g5", creator: "c5"}
                  ]
        }
    }
    render() {
        const user_id = cookie.load("user_id")
        const user_role = cookie.load("user_role")
        const colNum = 3

        return (
            <div>
                <h1>UserID: {user_id}</h1>
                <h1>User Role: {user_role}</h1>
                <Divider orientation="left">Games:</Divider>

                <div className="gamecards_in_gamehall">
                    <Row gutter={[24, 30]}>
                        {this.state.data.map((item, index) => {
                            return (
                                <Col key={index} span={24/colNum}>
                                    <GameCard title={item.title} creator={item.creator} />
                                </Col>
                            )
                        })}
                    </Row>
                </div>
            </div>
        );
    }
}

export default GameHall;