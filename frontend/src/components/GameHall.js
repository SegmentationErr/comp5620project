import React, { Component } from 'react';
import cookie from 'react-cookies';
import {Row, Col, Divider, notification} from 'antd'
import GameCard from "./GameCard"
import $axios from './Myaxios';
import { backendURL } from '../config';

class GameHall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        const url = backendURL + "gamelist"
        $axios.get(url, {withCredentials:true}
            ).then((res) => {
              if (res.status === 200) {
                    this.setState({
                        data: res.data
                    })
              }
            }).catch((error) => {
                notification.open({
                    message: "Failed to fetech game data",
                    description:
                        error.response.data.message
                });
            })
    }

    render() {
        const user_id = cookie.load("user_id")
        const user_role = cookie.load("user_role")
        const colNum = 3

        return (
            <div>
                <h1>UserID: {user_id}</h1>
                <h1>User Role: {user_role}</h1>
                <Divider orientation="center">Game List</Divider>

                <div className="gamecards_in_gamehall">
                    <Row gutter={[24, 30]}>
                        {this.state.data.map((item, index) => {
                            return (
                                <Col key={index} span={24/colNum}>
                                    <GameCard title={item.gameName} creator={item.creatorId} />
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