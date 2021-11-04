import React, { Component } from "react";
import { Modal, notification, Menu, Dropdown, Button,Input,Radio} from "antd";
import { DownOutlined } from "@ant-design/icons";
import "../App.css";
import $axios from "./Myaxios";
import cookie from "react-cookies";
import { backendURL } from "../config";
const {TextArea} = Input
class FeedbackCard extends Component {
  constructor(props) {
    super(props);
    this.radio = React.createRef();
    this.textArea = React.createRef();
    this.handleModalOk = this.handleModalOk.bind(this);

    this.state = {
      feedbackType:'2',
      isFeedbackModalVisible: false,
    };

  }
  componentWillReceiveProps(props) {
    this.setState({ isFeedbackModalVisible: props.isFeedbackModalVisible })
  }
  getOptionsWithDisabled = ()=>{
    const bDisabled = (cookie.load("user_role") === "2")
    return [
      { label: 'Normal Player', value: '2' },
      { label: 'Game Creator', value: '3', disabled: bDisabled }
    ]
  };

  handleModalOk = (e) => {
    var url = backendURL + "feedback?" + "content=" + this.state.textAreaContent + "&userRole=" + this.state.feedbackType
    console.log(url);

    $axios.post(url, {}).then(()=>{
      this.setState({isFeedbackModalVisible:false, isSuccessModalVisible:true})

    }).catch((error) => {
      var msg = "Failed to post a feedback";
      notification.open({
        message: msg,
        description: error+"No description supported.",
      });
    });
    
  };

  menu = (
    <Menu>
      <Menu.Item key="0">
        Issue from a normal player
      </Menu.Item>
      <Menu.Item key="1">
        Issues from a game creator
      </Menu.Item>
      {/* <Menu.Divider />
      <Menu.Item key="3">3rd menu item</Menu.Item> */}
    </Menu>
  );
  onChange = e => {
    console.log('radio2 checked', e.target.value);
    this.setState({
      feedbackType: e.target.value,
    });
  };
  onChangeTextArea = e=>{
    console.log('feedback Content', e.target.value);
    this.setState({
      textAreaContent: e.target.value,
    });
  }
  render() {
    const { feedbackType } = this.state;
    return (
      <>
        <Modal
          title="Post a feedback"
          visible={this.state.isFeedbackModalVisible}
          maskClosable={false}
          onOk={this.handleModalOk}
          okText="Post"
          onCancel={() => {
            this.setState({ isFeedbackModalVisible: false });
          }}
        >
          <p style={{float:'left', marginRight:'30px'}}>Role of the feedback: </p>
          <Radio.Group  ref={this.radio}  options={this.getOptionsWithDisabled()} onChange={this.onChange} value={feedbackType} />
          <TextArea onChange={this.onChangeTextArea} ref={this.textArea} rows={4} ></TextArea>
        </Modal>

        <Modal
          title="Success"
          visible={this.state.isSuccessModalVisible}
          maskClosable={false}
          onOk={()=>{this.setState({isSuccessModalVisible:false})}}
          okText="OK"
          onCancel={() => {
            this.setState({ isSuccessModalVisible: false });
          }}
        >
          <p>Feedback has been posted.</p>
        </Modal>
      </>
    );
  }
}

export default FeedbackCard;
