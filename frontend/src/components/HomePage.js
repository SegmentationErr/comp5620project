import React, { Component } from 'react';
import '../App.css'
import LoginRegisterCard from './LoginRegisterCard';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            if_login_display: false
        }

        this.login = this.login.bind(this)
    }

    login() {
        if (this.state.if_login_display) return

        this.setState({
            if_login_display: true
        })
    }

    render() {
        return (
            <div onClick={this.login} style={{width: '100vw', height: '100vh'}}>
                <h1 style={{ textAlign: 'center' }}>Motion Detection Game</h1>
                <div className='bg-image'>
                    <LoginRegisterCard display={this.state.if_login_display} history={this.props.history} />
                </div>
                <h3 className='sigin-text'>Click Anywhere to Start</h3>
            </div>
        );
    }
}
 
export default HomePage;
