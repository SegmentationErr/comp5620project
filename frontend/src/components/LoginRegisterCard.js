import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import '../App.css'

class LoginRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'login'
        }
    }
    
    changeMode(mode) {
        this.setState({
            mode: mode
        })
    }

    render() { 
        const onFinish = (values) => {
            console.log('Success:', values);
          };
        
        const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        };

        return (
            <div className='login-register-card' style={{ visibility: this.props.display ? 'visible' : 'hidden' }}>
                <h1>{this.props.display}</h1>
                 <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 10 }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                        style={{ marginTop: 120 }}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                        style={{ marginTop: 60 }}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Checkbox
                        checked={this.state.mode === 'login'}
                        onChange={()=>{
                            this.changeMode('login')
                        }}
                        style={{ marginTop: 60 }}
                    >
                        Log In
                    </Checkbox>

                    <Checkbox checked={this.state.mode === 'signup'}  onChange={()=>{
                        this.changeMode('signup')
                    }}>
                        Sign Up
                    </Checkbox>

                    <Form.Item wrapperCol={{ offset: 0, span: 0 }} style={{marginTop: 90}}>
                        <Button type="primary" htmlType="submit">
                        Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
 
export default LoginRegister;