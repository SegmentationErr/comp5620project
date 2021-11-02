import React, { Component } from 'react';
import { Pose } from '@mediapipe/pose';
import * as Pose1 from '@mediapipe/pose'
import * as cam from '@mediapipe/camera_utils'
import Webcam from 'react-webcam';

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
            score: 0
        }
        this.webcamRef = React.createRef(null)
        this.canvasRef = React.createRef(null)
        this.connect = window.drawConnectors;
        this.camera = null
    
        this.onResults = this.onResults.bind(this)
    }

    componentDidMount() {
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
    }

    drawRect(region_num, canvasCtx) {
        const {x, y, w, h} = regions[region_num]

        canvasCtx.beginPath();
        canvasCtx.strokeStyle = '#1f71ff';
        canvasCtx.lineWidth = 10;
        canvasCtx.rect(x, y, w, h);
        canvasCtx.stroke();
    }

    onResults(results) {
        const videoWidth = this.webcamRef.current.video.videoWidth;
        const videoHeight = this.webcamRef.current.video.videoHeight;
        
        if (results.poseLandmarks !== undefined) {
            let poseLandmarks = this.mirrorLandmarks(results.poseLandmarks)
            // Set canvas width
            this.canvasRef.current.width = videoWidth;
            this.canvasRef.current.height = videoHeight;
        
            const canvasElement = this.canvasRef.current;
            const canvasCtx = canvasElement.getContext("2d");
    
            canvasCtx.save();
            canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    
            canvasCtx.globalCompositeOperation = 'source-over';
            this.connect(canvasCtx, poseLandmarks, Pose1.POSE_CONNECTIONS,
                            {color: '#00FF00', lineWidth: 4});

            let region = 1
            this.drawRect(region, canvasCtx)

            canvasCtx.restore();

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
                <h1>Score: {this.state.score}</h1>
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
            </div>
        );
    }
}
 
export default PlayGamePage;