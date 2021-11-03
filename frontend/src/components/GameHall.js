import React, { Component } from 'react';
import cookie from 'react-cookies';
import {Row, Col, Divider} from 'antd'
import GameCard from "./GameCard"
import $axios from './Myaxios';
import { backendURL } from '../config';

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

    componentDidMount() {
        const url = backendURL + "gamelist"
        $axios.get(url, {withCredentials:true}
            ).then((res) => {
                console.log(res)
              if (res.status === 200) {
                    // cookie.save("user_id", res.data.id)
                    // cookie.save("user_role", res.data.role)
                    // this.props.history.push("/MotionDetectionGame/gamehall")
              }
            }).catch((error) => {
                // var msg = "Failed to Log In"
                // if (this.state.mode === 'signup') {
                //     msg = "Failed to Sign Up"
                // }
                // if (this.state.mode)
                // notification.open({
                //     message: msg,
                //     description:
                //       error.response.data.message + " Please check your input"
                //   });
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