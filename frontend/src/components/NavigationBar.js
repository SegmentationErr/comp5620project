import React, { Component } from "react";
import { Modal, notification, Menu } from "antd";
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
    this.props.history.push("/MotionDetectionGame/gamehall");
  };
  handleModalOkMyGames = (e) => {
    console.log(e);
    // TODO: check the url name is mygames or others
    this.props.history.push("/MotionDetectionGame/mygames");
  };
  handleClick = (e) => {
    console.log("click ", e.key);
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
        if (true) {
          // TODO: check whether it is in game
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
      case "mygames":
        if (true) {
          // TODO: check whether it is in game
          this.setState({
            isModalVisible: true,
            handleModalOk: this.handleModalOkMyGames,
            modalContent:
              "You are in a game, are you sure to go to your games page?",
              isFeedbackModalVisible:false
          });
        }
        break;
      case "create_game":
        if (true) {
          this.props.history.push("/MotionDetectionGame/create_game")
        } else {
          this.handleModalOkMyGames();
        }
        console.log("mygames");
        break;
      case "feedback":
        this.setState({isFeedbackModalVisible:true})
        break;
      default:
        console.log("default");
    }
  };

  render() {
    return (
      <>
        <Menu onClick={this.handleClick} selectedKeys={null} mode="horizontal">
          <Menu.Item style={{ marginLeft: "auto", background: "#648efa", color: "white" }} key="gamehall">
            GameHall
          </Menu.Item>
          {cookie.load("user_role") === "3" ? 
            <Menu.Item style={{ marginLeft: "auto" }} key="create_game">Create Game</Menu.Item>
           : null}
          {cookie.load("user_role") === "3" ? 
            <Menu.Item key="mygames">My Games</Menu.Item>
           : null}
          <Menu.Item key="feedback" >Feedback</Menu.Item>

          <Menu.Item key="logout">Logout</Menu.Item>
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
