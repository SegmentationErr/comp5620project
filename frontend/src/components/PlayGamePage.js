import React, { Component } from 'react';
import { Pose } from '@mediapipe/pose';
import * as cam from '@mediapipe/camera_utils'
import Webcam from 'react-webcam';
import SummaryCard from './SummaryCard';

import '../App.css'

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
            show_landmarks: false
        }

        this.webcamRef = React.createRef(null)
        this.canvasRef = React.createRef(null)
        this.connect = window.drawConnectors;
        this.camera = null
        this.audio = new Audio("/" + this.props.history.location.state.data.bgmName + ".wav")
        this.audio.loop = true

        this.onResults = this.onResults.bind(this)
        // console.log(this.state.data)
    }
    
    componentDidMount() {
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
                    await pose.send({ image: this.webcamRef.current.video });
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
    
    start_game() {
        if (this.state.curr_rigion_ind >= this.state.region_seq.length) {
            this.audio.pause()
            this.setState({finish: true})
            return
        }
        this.drawRect(this.state.region_seq[this.state.curr_rigion_ind], this.canvasCtx)

        this.canvasCtx.restore();

        const interval = this.state.data.configFileContent.game.time_interval * 1000
        const display_time = this.state.data.configFileContent.game.time_displayed * 1000
        
        setTimeout(() => {
            this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height)
            console.log("clear")
            if (! this.state.finish) {
                this.setState({curr_rigion_ind: this.state.curr_rigion_ind + 1})
                setTimeout(() => {
                    console.log("draw")
                   this.start_game()
                }, interval)
            }
        }, display_time)
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
        console.log(res)
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
        // console.log(this.state.curr_rigion_ind)
        if (results.poseLandmarks !== undefined && this.state.curr_rigion_ind < this.state.region_seq.length) {  
            let poseLandmarks = this.mirrorLandmarks(results.poseLandmarks)
            if (this.grade(poseLandmarks, this.state.region_seq[this.state.curr_rigion_ind])) {
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
                <h1 style={{textAlign: "right", paddingTop: 20, paddingRight: 30}}>Score: {this.state.score}</h1>
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
                >
                </canvas>
                <button style={{ marginTop: 800 }} onClick={() => {
                    this.setState({finish: !this.state.finish})
                }}>Test Summary</button>
                <button style={{ marginTop: 800 }} onClick={() => {
                    this.setState({show_landmarks: !this.state.show_landmarks})
                }}>Show Landmarks</button>
                <button style={{ marginTop: 800 }} onClick={() => {
                    setTimeout(() => {
                        this.audio.play()
                        this.start_game()
                    }, 3000)
                }}>Start</button>
                <h1>{this.state.curr_rigion_ind} / {this.state.region_seq.length} finished</h1>
                <SummaryCard score={this.state.score} ranking={this.state.ranking} display={this.state.finish} />
            </div>
        );
    }
}
 
export default PlayGamePage;