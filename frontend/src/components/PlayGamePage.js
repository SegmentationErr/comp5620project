import React, { Component } from 'react';
import { Pose } from '@mediapipe/pose';
import * as cam from '@mediapipe/camera_utils'
import Webcam from 'react-webcam';
import SummaryCard from './SummaryCard';

import '../App.css'
import { Progress } from 'antd';
import { backendURL } from '../config';
import $axios from './Myaxios';

const width = 1280
const height = 720
const padding = 40
const regions = [
    {x: padding, y: padding, w: width / 3 - padding * 2, h: height - padding * 4},
    {x: width / 3 + padding, y: padding, w: width / 3 - padding * 2, h: height - padding * 4},
    {x: width / 3 * 2 + padding, y: padding, w: width / 3 - padding * 2, h: height - padding * 4},
    {x: padding, y: height / 2, w: width / 2 - padding * 2, h: height / 2},
    {x: width / 2 + padding, y: height / 2, w: width / 2 - padding * 2, h: height / 2},
];
let if_start = false

class PlayGamePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.history.location.state.data,
            region_seq: [],
            score: 0,
            ranking: 0,
            finish: false,
            curr_rigion_ind: 0,
            highest_scores: []
        }

        this.webcamRef = React.createRef(null)
        this.canvasRef = React.createRef(null)
        this.connect = window.drawConnectors;
        this.camera = null
        this.bingo = new Audio("/bingo.wav")
        this.audio = new Audio("/" + this.props.history.location.state.data.bgmName + ".wav")
        this.audio.loop = true

        this.onResults = this.onResults.bind(this)
    }
    
    componentDidMount() {
        this.get_score()
        let game_config = this.state.data.configFileContent.game
        let region_seq = this.generate_seq(game_config.total_target_num, game_config.region_blocks)
        this.setState({region_seq: region_seq})

        const pose = new Pose({
            locateFile: (file) => {
              return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
            },
        });

        pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            enableSegmentation: true,
            smoothSegmentation: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });
    
        pose.onResults(this.onResults);
      
        if (
            typeof this.webcamRef.current !== "undefined" &&
            this.webcamRef.current !== null
        ) {
            this.camera = new cam.Camera(this.webcamRef.current.video, {
                onFrame: async () => {
                    if (this.webcamRef.current !== null) {
                        await pose.send({ image: this.webcamRef.current.video });
                    }
                },
                width: width,
                height: height,
            });
            this.camera.start();
        }

        this.canvasRef.current.width = 1280;
        this.canvasRef.current.height = 720;
    
        this.canvasElement = this.canvasRef.current;
        this.canvasCtx = this.canvasElement.getContext("2d")
    }
    
    get_score() {
        const url = backendURL + "gamescore?gameId=" + this.props.history.location.state.data.id
        $axios.get(url, {withCredentials:true})
        .then((res) => {
            if (res.status === 200) {
                this.setState({
                    highest_scores: res.data
                })
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    post_score() {
        const url = backendURL + "gamescore?gameId=" + this.props.history.location.state.data.id + "&score=" + this.state.score
        $axios.post(url, {withCredentials:true})
        .then((res) => {
            if (res.status === 200) {
                console.log(res)
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    start_game() {
        if (this.state.curr_rigion_ind >= this.state.region_seq.length) {
            this.setState({finish: true})
            this.post_score()
            this.audio.pause()
            return
        }
        this.drawRect(this.state.region_seq[this.state.curr_rigion_ind], this.canvasCtx)

        this.canvasCtx.restore();

        const interval = this.state.data.configFileContent.game.time_interval * 1000
        const display_time = this.state.data.configFileContent.game.time_displayed * 1000
        
        setTimeout(() => {
            this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height)
            if (! this.state.finish) {
                this.setState({curr_rigion_ind: this.state.curr_rigion_ind + 1})
                setTimeout(() => {
                   this.start_game()
                }, interval)
            }
        }, display_time)
    }

    count_down(num) {
        this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height)
        if (num === 0) return
        
        this.canvasCtx.beginPath();
        this.canvasCtx.font = "250px Arial ";
        this.canvasCtx.textAlign = "center";
        this.canvasCtx.textBaseline = "center";
        this.canvasCtx.fillStyle = "#0077ff";
        this.canvasCtx.fillText(num, 640, 430);
        this.canvasCtx.stroke();
        setTimeout(() => {
            this.count_down(num - 1)
        }, 1000);
    }

    generate_seq(total, region_blocks) {
        let res = []
        var rand = require("random-seed").create()
        rand.seed(this.state.data.configFileContent.game.random_seed)

        while (res.length !== total) {
            let i = rand(5)
            if (region_blocks[i] > 0) {
                res.push(i)
                region_blocks[i]--;
            }
        }
        return res
    }

    drawRect(region_num, canvasCtx) {
        // console.log(regions, region_num)

        if (region_num === -1) return;
        const {x, y, w, h} = regions[region_num]

        canvasCtx.beginPath();
        canvasCtx.strokeStyle = '#1f71ff';
        canvasCtx.lineWidth = 10;
        canvasCtx.rect(x, y, w, h);
        canvasCtx.stroke();
    }

    grade(landmarks, region_num){
        if (region_num === -1) return

        const {x, y, w, h} = regions[region_num];
        let x0 = parseInt(x);
        let y0 = parseInt(y);
        let x1 = parseInt(x + w + 1);
        let y1 = parseInt(y + h + 1);

        let mark = 1;

        for (let i = 0; i < landmarks.length; i++){
            let x = landmarks[i].x * width
            let y = landmarks[i].y * height
            
            if(x < x0 || x > x1 || y < y0 || y > y1){
                mark = 0;
                break;
            }
        }
        console.log(mark)
        return(mark);
    }

    onResults(results) {
        if (if_start && results.poseLandmarks !== undefined && this.state.curr_rigion_ind < this.state.region_seq.length) {  
            let poseLandmarks = this.mirrorLandmarks(results.poseLandmarks)
            if (this.grade(poseLandmarks, this.state.region_seq[this.state.curr_rigion_ind])) {
                this.bingo.play()
                this.setState({
                    score: this.state.score + 10
                })
                this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height)
            }
        }
    }

    mirrorLandmarks(landmarks) {
        let mirrored = landmarks
        for (let i = 0; i < landmarks.length; i++) {
            mirrored[i].x = 1 -  mirrored[i].x
        }
        return mirrored
    }

    render() { 
        return (
            <div>
                <h1 style={{float: "right", paddingTop: 20, paddingRight: 30}}>Score: {this.state.score}</h1>
                <div style={{textAlign: "center", paddingTop: 20}}>
                    <Progress style={{width: 1000}} showInfo={false} percent={this.state.curr_rigion_ind / this.state.region_seq.length * 100}/>
                </div>
                <Webcam
                    className="camera"
                    ref={this.webcamRef}
                    mirrored={true}
                    videoConstraints={{
                        width: width,
                        height: height,
                    }}
                />
                <canvas
                    className="camera"
                    ref={this.canvasRef}
                    onClick={() => {
                        if (! if_start) {
                            if_start = true
                            this.count_down(3)
                            setTimeout(() => {
                                this.audio.play()
                                this.start_game()
                            }, 3300)
                        }
                    }}
                >
                </canvas>
                <SummaryCard score={this.state.score} highest_scores={this.state.highest_scores} display={this.state.finish} history={this.props.history} />
            </div>
        );
    }
}
 
export default PlayGamePage;