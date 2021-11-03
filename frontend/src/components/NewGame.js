import React, { Component } from 'react';
import { Form, Input, Button, notification, Checkbox } from 'antd';
import { PauseOutlined, CaretRightOutlined } from '@ant-design/icons';
import '../App.css'
import axios from 'axios';
import cookie from 'react-cookies';
import { backendURL } from "../config";


const { TextArea } = Input;

class NewGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bgm_playing: false,
            bgm_chosen: 'BGM1'
        }
        this.audio = new Audio('/BGM1.wav')
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
            <div className='new-game' >
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
                    
                    <Checkbox
                        checked={this.state.bgm_chosen === 'BGM1'}
                        onChange={()=>{this.setState({bgm_chosen: "BGM1"})}}
                        style={{ marginTop: 60 }}
                    >BGM1</Checkbox>

                    <Checkbox
                        checked={this.state.bgm_chosen === 'BGM2'}
                        onChange={()=>{this.setState({bgm_chosen: "BGM2"})}}
                    >BGM2</Checkbox>

                    <Checkbox
                        checked={this.state.bgm_chosen === 'BGM3'}
                        onChange={()=>{this.setState({bgm_chosen: "BGM3"})}}
                    >BGM3</Checkbox>
                    <br/>
                    <Button onClick={() => {
                            if (this.state.bgm_playing) {
                                this.audio.pause()
                            } else {
                                this.audio = new Audio('/' + this.state.bgm_chosen + '.wav')
                                this.audio.play()
                            }
                            this.setState({bgm_playing: !this.state.bgm_playing})
                        }}
                        style={{marginTop: 60}}
                        type="primary"
                        shape="circle"
                        size="large"
                        icon={this.state.bgm_playing ?<PauseOutlined /> : <CaretRightOutlined />}
                    >
                    </Button>
                    <Form.Item wrapperCol={{ offset: 0, span: 0 }} style={{marginTop: 90}}>
                        <Button type="primary" htmlType="submit" >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default NewGame;