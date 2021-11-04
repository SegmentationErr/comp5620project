import React, { Component } from 'react';
import { Form, Input, Button, notification, Checkbox, InputNumber } from 'antd';
import { PauseOutlined, CaretRightOutlined } from '@ant-design/icons';
import '../App.css'
import $axios from './Myaxios';
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

    changeBGM(bgm) {
        this.setState({
            bgm_playing: false,
            bgm_chosen: bgm
        })
        this.audio.pause()
    }

    render() {
        const onFinish = (values) => {
            let config = {}
            config.name = values.gameName
            config.game = {}
            config.game.total_target_num = values.r1 + values.r2 + values.r3 + values.r4 + values.r5
            config.game.random_seed = values.random_seed
            config.game.time_displayed = values.time_displayed
            config.game.time_interval = values.time_interval
            config.game.region_blocks = [values.r1, values.r2, values.r3, values.r4, values.r5]

            var base64 = require('base-64')
            var url = backendURL + "gamecreate?" + "gameName=" + values.gameName +
            "&configFileContent=" + base64.encode(JSON.stringify(config)) + "&bgmName=" + this.state.bgm_chosen

            $axios.post(url, {}
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
                        label="Random Seed"
                        name="random_seed"
                        rules={[{ required: true, message: 'Please enter random seed!' }]}
                        style={{ marginTop: 40 }}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Display Time (seconds)"
                        name="time_displayed"
                        rules={[{ required: true, message: 'Please enter displayed time!' }]}
                        style={{ marginTop: 40 }}
                    >
                        <InputNumber min={1} max={10} />
                    </Form.Item>
                    <Form.Item
                        label="Interval Time (seconds)"
                        name="time_interval"
                        rules={[{ required: true, message: 'Please enter interval time!' }]}
                        style={{ marginTop: 40 }}
                    >
                        <InputNumber min={1} max={10} />
                    </Form.Item>

                    <Form.Item
                        label="Block Number in Each Region"
                        style={{ marginTop: 40 }}
                    >
                        {["1", "2", "3", "4", "5"].map((num, key) => {
                            return (
                                <Form.Item
                                    key={key}
                                    name={"r"+num}
                                    noStyle
                                    rules={[{ required: true, message: 'Please enter block number!' }]}
                                >
                                    <InputNumber placeholder={"Region "+num} min={0} max={10} style={{ marginRight: 10 }} />
                                </Form.Item>
                            )
                        })}
                    </Form.Item>
                    
                    <Checkbox
                        checked={this.state.bgm_chosen === 'BGM1'}
                        onChange={()=>{this.changeBGM("BGM1")}}
                        style={{ marginTop: 60 }}
                    >BGM1</Checkbox>

                    <Checkbox
                        checked={this.state.bgm_chosen === 'BGM2'}
                        onChange={()=>{this.changeBGM("BGM2")}}
                    >BGM2</Checkbox>

                    <Checkbox
                        checked={this.state.bgm_chosen === 'BGM3'}
                        onChange={()=>{this.changeBGM("BGM3")}}
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
                        icon={this.state.bgm_playing ? <PauseOutlined /> : <CaretRightOutlined />}
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