import React, { Component } from 'react';
import { List, Divider, Space, Button } from 'antd';

//TODO Button1 for application been approved 
//     Button2 for feedback been marked as important/has been read

class TechStaff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            applicationList: [],
            feedbackList: []
        }

        this.handleApplicationClick = this.handleApplicationClick.bind(this)
    }

    handleApplicationClick(user_id, index) {
        let items = [...this.state.applicationList]
        items[index] = {...items[index], approved: true}
        this.setState({applicationList: items})
    }

    handleFeedbackClick(user_id, index) {
        let items = [...this.state.feedbackList]
        items[index] = {...items[index], checked: true}
        this.setState({feedbackList: items})
    }

    componentDidMount() {
        // Test data list for applications
        const applicationList = []
        for (let i = 0; i < 10; i++) {
            applicationList.push({
                index: i,
                user_id: i,
                title:`User ${i}'s application`,
                description: 'Description: abcdefg',
                approved: false
            })
        }
        this.setState({
            applicationList: applicationList
        })
        
        
        // Test data list for feedbacks
        const feedbackList = []
        for (let i = 0; i < 10; i++) {
            feedbackList.push({
                index: i,
                user_id: i,
                title:`User ${i}'s feedback`,
                description: 'Feedback Content: xxxxxxxxxxxxxx',
                checked: false
            })
        }
        this.setState({feedbackList: feedbackList})
    }

    render() { 
        return (
            <div className="techstaff_checkpage">
                <h1>Technical Staff Page</h1>
                <Divider orientation="center">Applaiction List</Divider>
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
                            <Button onClick={() => {this.handleApplicationClick(item.user_id, item.index)}}
                                type={item.approved ? "primary" : "default"}
                            >
                                {item.approved ? "Approved" : 'To Be Approved'}
                            </Button>
                        }
                    >
                        <List.Item.Meta
                            title={item.title}
                            description={item.description}
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
                            <Button onClick={() => {this.handleFeedbackClick(item.user_id, item.index)}}
                                type={item.checked ? "primary" : "default"}
                            >
                                {item.checked ? "Unread" : 'Checked'}
                            </Button>
                        }
                    >
                        <List.Item.Meta
                            title={item.title}
                            description={item.description}
                        />
                    </List.Item>
                )}
                />
            </div>
        );
    }
}
 
export default TechStaff;