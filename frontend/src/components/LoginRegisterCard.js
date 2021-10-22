import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import '../App.css'

class LoginRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
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
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
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