import React, { Component } from "react";
import { Modal, notification, Menu } from "antd";
import "../App.css";
import $axios from "./Myaxios";
import cookie from "react-cookies";
import { backendURL } from "../config";

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      modalContent: "",
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
        });
        break;
      case "gamehall":
        if (true) {
          // TODO: check whether it is in game
          this.setState({
            isModalVisible: true,
            handleModalOk: this.handleModalOkGameHall,
            modalContent: "You are in a game, are you sure to go to game hall?",
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
      default:
        console.log("default");
    }
  };

  render() {
    return (
      <>
        <Menu onClick={this.handleClick} selectedKeys={null} mode="horizontal">
          {cookie.load("user_role") !== "1" ?
            <Menu.Item style={{ marginLeft: 0, background: "#648efa", color: "white" }} key="gamehall">
              GameHall
            </Menu.Item>
            : null
          }
          {cookie.load("user_role") === "3" ? 
            <Menu.Item style={{ marginLeft: "auto" }} key="create_game">Create Game</Menu.Item>
           : null}
          {cookie.load("user_role") === "3" ? 
            <Menu.Item key="mygames">My Games</Menu.Item>
           : null}
          <Menu.Item key="logout" style={{ marginLeft: "auto" }} >Logout</Menu.Item>
        </Menu>
        <Modal
          title="Warning"
          visible={this.state.isModalVisible}
          onOk={this.state.handleModalOk}
          onCancel={() => {
            this.setState({ isModalVisible: false });
          }}
        >
          <p>{this.state.modalContent}</p>
        </Modal>
      </>
    );
  }
}

export default NavigationBar;
