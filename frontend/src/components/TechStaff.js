import React, { Component } from 'react';
import { List, Divider, Button, notification, Table} from 'antd';
import $axios from './Myaxios';
import {backendURL} from "../config";

class TechStaff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            applicationList: [],
            feedbackList: []
        }
    }

    handleApplicationClick(id, index, status_id) {
        const url = backendURL + "gamecreatorreply?" + "id=" + id + "&agree=" + status_id
        $axios.post(url,{})
            .then((res) => {
                if (res.status === 200) {
                    notification.open({
                        message: "Application Successfully Handled!",
                        description: "Thank you for your effort!"
                    });
                    const urlApp = backendURL + "gamecreator"
                    $axios.get(urlApp, {withCredentials:true})
                        .then((res) => {
                            if (res.status === 200) {
                                this.setState(prevState =>({
                                    applicationList: res.data
                                }));
                            }
                        }).catch((error) => {
                        notification.open({
                            message: "Failed to fetch application data",
                            description: error.response.data.message
                        });
                    })
                }
            }).catch((error) => {
            notification.open({
                message: "Failed to handle this application!",
                description: error.response.data.message
            });
        })
    }

    handleFeedbackClick(id, index) {
        const url = backendURL + "markfeedback?" + "id=" + id
        $axios.post(url,{})
            .then((res) => {
                if (res.status === 200) {
                    notification.open({
                        message: "Feedback Successfully Marked as Viewed!",
                        description: "Thank you for your effort!"
                    });
                    const urlFeed = backendURL + "feedback"
                    $axios.get(urlFeed, {withCredentials:true})
                        .then((res) => {
                            if (res.status === 200) {
                                this.setState(prevState =>({
                                    feedbackList: res.data
                                }));
                            }
                        }).catch((error) => {
                        notification.open({
                            message: "Failed to fetch feedback data",
                            description: error.response.data.message
                        });
                    })
                }
            }).catch((error) => {
                notification.open({
                    message: "Failed to mark this feedback viewed!",
                    description: error.response.data.message
                });
        })
    }

    componentDidMount() {
        const urlApp = backendURL + "gamecreator"
        $axios.get(urlApp, {withCredentials:true})
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        applicationList: res.data
                    })
                }
            }).catch((error) => {
                notification.open({
                    message: "Failed to fetch application data",
                    description: error.response.data.message
                });
        })

        const urlFeed = backendURL + "feedback"
        $axios.get(urlFeed, {withCredentials:true})
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        feedbackList: res.data
                    })
                }
            }).catch((error) => {
            notification.open({
                message: "Failed to fetch feedback data",
                description: error.response.data.message
            });
        })
    }

    render() { 
        return (
            <div className="techstaff_checkpage">
                <h1>Technical Staff Page</h1>
                <Divider orientation="center">Application List</Divider>
                <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    pageSize: 3,
                }}
                dataSource={this.state.applicationList}
                footer={
                    <div>
                        <b>Applaictions</b>
                    </div>
                }
                renderItem={item => (
                    <List.Item
                        key={item.title}
                        extra={
                            [<Button onClick={() => {this.handleApplicationClick(item.id, item.index, 2)}}
                                type={item.approvalStatus === 1 ? "primary" : "default"}
                            >
                                {item.approvalStatus === 1 ? "Approve" : 'To Be Approved'}
                            </Button>,
                            <Button onClick={() => {this.handleApplicationClick(item.id, item.index, 3)}}
                                    type={item.approvalStatus === 1 ? "primary" : "default"} style={{visibility: item.approvalStatus === 1 ? 'visible' : 'hidden', marginLeft: '10px'}}
                            >
                                {item.approvalStatus === 1 ? "Disapprove" : 'To Be Approved'}
                            </Button>]
                        }
                    >
                        <List.Item.Meta
                            title={item.playerId}
                            description={item.applyDate}
                        />
                    </List.Item>
                )}
                />

                <Divider orientation="center">Feedback List</Divider>
                <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    pageSize: 3,
                }}
                dataSource={this.state.feedbackList}
                footer={
                    <div>
                        <b>Feedbacks</b>
                    </div>
                }
                renderItem={item => (
                    <List.Item
                        key={item.title}
                        extra={
                            <Button onClick={() => {this.handleFeedbackClick(item.id)}}
                                type={item.viewStatus === 0 ? "primary" : "default"} disabled={item.viewStatus === 1}
                            >
                                {item.viewStatus === 0 ? "Mark Viewed" : 'Viewed'}
                            </Button>
                        }
                    >
                        <List.Item.Meta
                            title={item.id}
                            description={item.feedbackContent}
                        />
                    </List.Item>
                )}
                />
            </div>
        );
    }
}
 
export default TechStaff;