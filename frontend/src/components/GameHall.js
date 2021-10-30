import React, { Component } from 'react';
import cookie from 'react-cookies';


class GameHall extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        const user_id = cookie.load("user_id")
        const user_role = cookie.load("user_role")
        return (
            <div>
                <h1>UserID: {user_id}</h1>
                <h1>User Role: {user_role}</h1>
            </div>
        );
    }
}

export default GameHall;