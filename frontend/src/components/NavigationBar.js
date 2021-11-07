import React, { Component } from "react";
import { Modal, notification, Menu, Avatar, Popover } from "antd";
import "../App.css";
import $axios from "./Myaxios";
import cookie from "react-cookies";
import { backendURL } from "../config";
import FeedbackCard from "./FeedbackCard";

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      modalContent: "",
      isFeedbackModalVisible:false
    };
  }

  creatorApply = (e) => {
    console.log(e)
    $axios.post(backendURL + "gamecreator", {})
        .then((res) => {
          notification.open({
            message: "You have applied to be a Game Creator successfully",
            description: "Thank you brave soul!",
          });
        }).catch((error) => {
      notification.open({
        message: "Failed to apply",
        description: "No description supported.",
      });
    });
  };

  handleModalOkLogout = (e) => {
    console.log(e);
    $axios.post(backendURL + "logout", {}).catch((error) => {
      var msg = "Failed to log out";
      notification.open({
        message: msg,
        description: "No description supported.",
      });
    });
    this.props.history.push("/");
  };
  handleModalOkGameHall = (e) => {
    console.log(e);
    this.setState({isModalVisible: false})
    this.props.history.push("/MotionDetectionGame/gamehall");
  };

  handleClick = (e) => {
    console.log("click ", e.key);
    this.setState({isFeedbackModalVisible:false})
    switch (e.key) {
      case "logout":
        console.log("logout");
        this.setState({
          isModalVisible: true,
          handleModalOk: this.handleModalOkLogout,
          modalContent: "Are you sure to logout?",
          isFeedbackModalVisible:false
        });
        break;
      case "gamehall":
        let url = this.props.history.location.pathname.split("/")
        if (url.length >= 3 && url[2].substr(0, 8) === "PlayGame") {
          this.setState({
            isModalVisible: true,
            handleModalOk: this.handleModalOkGameHall,
            modalContent: "You are in a game, are you sure to go to game hall?",
            isFeedbackModalVisible:false
          });
        } else {
          this.handleModalOkGameHall();
        }
        console.log("gamehall");
        break;
        case "create_game":
        this.props.history.push("/MotionDetectionGame/create_game")
        console.log("create game");
        break;
      case "feedback":
        this.setState({isFeedbackModalVisible:true})
        break;
      case "apply_creator":
        this.creatorApply()
        break;
      default:
        console.log("default");
    }
  };

  render() {
    let user_role = "Normal Player"
    if (cookie.load("user_role") === "1") {
      user_role = "Technical Staff"
    } if (cookie.load("user_role") === "3") {
      user_role = "Game Creator"
    }
    return (
      <>
        <Menu onClick={this.handleClick} selectedKeys={null} mode="horizontal">
          {cookie.load("user_role") !== "1" ?
            <Menu.Item style={{ marginRight: "auto", background: "#648efa", color: "white" }} key="gamehall">
              GameHall
            </Menu.Item>
            : null
          }
          {cookie.load("user_role") === "3" ? 
            <Menu.Item key="create_game">Create Game</Menu.Item>
           : null}
          {cookie.load("user_role") === "2" ?
              <Menu.Item key="apply_creator">Become a Game Creator</Menu.Item>
              : null}
          {cookie.load("user_role") !== "1" ? 
            <Menu.Item key="feedback" >Feedback</Menu.Item>
           : null}
          <Menu.Item key="logout" style={{ marginLeft: cookie.load("user_role") === "1" ? "auto" : 0}}>Logout</Menu.Item>
          <Menu.Item key="avatar">
            <Popover placement="bottomRight" content={(
                <p>{user_role}</p>
            )}>
                <Avatar style={{backgroundColor: "#369ecf"}}>{user_role[0]}</Avatar>
            </Popover>
          </Menu.Item>
        </Menu>
        <Modal
          title="Warning"
          visible={this.state.isModalVisible}
          onOk={this.state.handleModalOk}
          maskClosable={false}
          onCancel={() => {
            this.setState({ isModalVisible: false });
          }}
        >
          <p>{this.state.modalContent}</p>
        </Modal>
        <FeedbackCard isFeedbackModalVisible={this.state.isFeedbackModalVisible}></FeedbackCard>
      </>
    );
  }
}

export default NavigationBar;
