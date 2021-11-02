import React, { Component } from 'react';
import { Form, Input, Button, notification } from 'antd';
import '../App.css'
import axios from 'axios';
import cookie from 'react-cookies';
import { backendURL } from "../config";

const { TextArea } = Input;

class NewGame extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const onFinish = (values) => {
            var url = backendURL + "gamecreate?" + "gameName=" + values.gameName +
                "&configFileContent=" + values.configFileContent

            axios.post(url, {}
                ).then((res) => {
                  if (res.status === 200) {
                      notification.open({
                          message: "New Game Created Successfully!",
                          description: "Hooray! Thank you for creating a new game!"
                      });
                      this.props.history.push("/MotionDetectionGame/gamehall")
                  }
                }).catch((error) => {
                    var msg = "Failed to create a new game"
                    notification.open({
                        message: msg,
                        description: error.response.data.message
                    });
            })
        }

        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };

        return (
            <div className='new-game-card' style={{visibility: this.props.display ? 'visible' : 'hidden' }}>
                <h1>{this.props.display}</h1>
                <From
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 10 }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                    <Form.Item
                        label="New Game Name"
                        name="gameName"
                        rules={[{ required: true, message: 'Please enter the new game name!' }]}
                        style={{ marginTop: 120 }}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Config String"
                        name="configFileContent"
                        rules={[{ required: true, message: 'Please enter the config file content!' }]}
                        style={{ marginTop: 60 }}
                    >
                        <TextArea rows={6} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 0, span: 0 }} style={{marginTop: 90}}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </From>
            </div>
        );
    }
}

export default NewGame;