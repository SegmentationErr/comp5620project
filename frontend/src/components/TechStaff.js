import React, { Component } from 'react';
import { List, Divider, Space } from 'antd';

//TODO Button1 for application been approved 
//     Button2 for feedback been marked as important/has been read
class TechStaff extends Component {
    constructor(props) {
        super(props);
        this.state = { }
    }

    render() { 
        // Test data list for applications
        const listData = [];
        for (let i = 0; i < 10; i++) {
            listData.push({
                title:`User ${i}'s application`,
                description: 'Description: abcdefg',
            });
        }

        // Test data list for feedbacks
        const feedbackListDate = [];
        for (let i = 0; i < 10; i++) {
            feedbackListDate.push({
                title:`User ${i}'s feedback`,
                description: 'Feedback Content: xxxxxxxxxxxxxx',
            });
        }

        // const IconText = ({ icon, text }) => (
        //     <Space>
        //     {React.createElement(icon)}
        //     {text}
        //     </Space>
        // );


        return (
            <div className="techstaff_checkpage">
                <h1>Technical Staff Page</h1>
                <Divider orientation="center">Applaiction List</Divider>
                <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 3,
                }}
                dataSource={listData}
                footer={
                    <div>
                        <b>Applaictions</b>
                    </div>
                }
                renderItem={item => (
                    <List.Item
                        key={item.title}
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
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 3,
                }}
                dataSource={feedbackListDate}
                footer={
                    <div>
                        <b>Feedbacks</b>
                    </div>
                }
                renderItem={item => (
                    <List.Item
                        key={item.title}
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