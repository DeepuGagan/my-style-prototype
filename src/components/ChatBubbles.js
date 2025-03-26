import React, { useRef, useEffect, useState } from 'react'
import "react-chat-elements/dist/main.css"
import { MessageBox, Avatar } from 'react-chat-elements'
import * as posenet from "@tensorflow-models/posenet"
import '@tensorflow/tfjs-backend-webgl';
import CanvasDraw from "react-canvas-draw";
import "./ChatFeed.css"

const ProductPoseMap = {
	"nose": 'https://www.fwrd.com/product-shoreditch-ski-club-maya-shearling-puffer-jacket/SLUF-WO27/',
	"leftShoulder": 'https://www.madewell.com/oversized-shearling-motorcycle-jacket-NH847.html',
	"rightShoulder": 'https://www.urbanstaroma.com/en/donna-the-north-face-piumino-nuptse-sherpa-nf0a7wskn3n-2415996.html',
	"leftWrist": "https://www.saksfifthavenue.com/product/the-north-face-sherpa-nuptse-jacket-0400016099207.html",
	"rightWrist": "https://www.paragonsports.com/the-north-face-womens-women-s-sherpa-nuptse-jacket-gardenia-white-5010-nf0a7wsk/p",
	"leftKnee": "https://www.nordstrom.com/s/high-pile-fleece-nuptse-jacket/7029396",
	"rightKnee": "https://www.endclothing.com/gb/the-north-face-sherpa-nuptse-jacket-nf0a7wskn3n1.html",
	"leftAnkle": "https://www.abercrombie.com/shop/us/p/long-vegan-leather-shearling-jacket-49745331",
	"rightAnkle": "https://www.net-a-porter.com/en-us/shop/product/vince/clothing/casual-jackets/sherpa-fleece-jacket/1647597288164817"
}

const ChatBubbles = (props) => {
	const { thread = [] } = props
	const [poseInfo, setPoseInfo] = useState([])
	const [imgSize, setImgSize] = useState({})
	const EndOfThreadRef = useRef(null)
	const userPhotoRef = useRef(null)
	const msgRef = useRef(null)
	const canvasRef = useRef(null);

	const detect = async (net) => {
		// debugger
		if(typeof userPhotoRef.current !== "undefined" && userPhotoRef.current !== null) {
		const userPhoto = userPhotoRef.current;
		setImgSize({ImgW: userPhotoRef.current.naturalWidth, ImgH: userPhotoRef.current.naturalHeight})
		// debugger
		const pose = await net.estimateSinglePose(userPhoto);
		// drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
		console.log('pose: ', pose)
		setPoseInfo(pose.keypoints)
		poseInfo.map(({position:{x,y}}) => drawTest(x,y))
		// return pose;
		}	
	};

	const runPosenet = async () => {
		// debugger
		const net = await posenet.load({
			inputResolution: { width: 640, height: 480 },
			scale: 0.5,
		});
		// debugger
		detect(net)
	}
	runPosenet()
  const scrollToBottom = () => {
    EndOfThreadRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
		// detect(poseNet)
  }, [thread]);

	const handleClick = (e) => {
		console.log('click e: ', e)
	}
	
	const generateImageMap = () => {
		return(
			<map name="productMap">
  			{
				poseInfo.map(({part, position:{x,y}}) => 
					<area shape="circle" coords={`${x},${y},100`} alt={part} onblur="this.focus()" autofocus  href={ProductPoseMap[part] || `https://www.google.com/search?q=${part}-accessories`} title={ProductPoseMap[part] || `https://www.google.com/search?q=${part}-accessories`}  target="_blank" rel="noopener noreferrer" />
				)
				}
			</map>
		)
	}

	function drawTest(x, y) {
		const canvas = canvasRef.current
		const context = canvas.getContext('2d');
		//var rect = canvas.getBoundingClientRect();
		//centerX = centerX  + rect.left;
		//centerY = centerY  + rect.top;
		var radius = 5;
		context.beginPath();
		context.arc(x, y, radius, 0, 2 * Math.PI, false);
		context.fillStyle = 'green';
		context.fill();
		context.lineWidth = 2;
		context.strokeStyle = '#003300';
		context.stroke();
		console.log('x y: ', x,y)
		context.fillRect(x,y,10,10); 
	}

	// 'height':`${userPhotoRef.current.naturalHeight}px`, 'width':`${userPhotoRef.current.naturalWidth}px`
	const CanvasImg = (MsgText) => (
		<div className="outsideWrapper" style={{'height':'480px', 'width':`640px`}}> 
    	<div className="insideWrapper"> 
				<img src={MsgText}  alt="user-phot0" ref={userPhotoRef} useMap='#productMap' onClick={handleClick} className="coveredImage" />
        <canvas className="coveringCanvas" ref={canvasRef}></canvas>
    	</div>
		</div>
	)

	return (
		<>
			{console.log("pose: ", poseInfo)}
			{thread.map(({MsgBy, MsgText, MsgType}, i) => (
				<div key={`justForTestingParent${i}`}>
				<div key={`justForTesting${i}`} >
				<MessageBox
					key = {`chat-bubble-${i}`}
					className='chat-bubble'
					id='my-image'
					position={MsgBy === 'user' ? 'right' : 'left'}
					type={MsgType === 'msg-txt' ? "text" : "photo"}
					title={MsgBy === 'user' ? 'You' : 'MyStyle'}
					text={MsgType === 'msg-txt' ? MsgText : undefined}
					data={{
						uri: MsgText,
						width:300,
						height:300,
					  }}
					//   avatar={
					// 	<Avatar src={MsgBy === 'user' ? '/assets/icon/profilePic.png' : '/assets/icon/botPic.jpeg'} />
					//   }
					  avatar={MsgBy === 'user' ? '/assets/icon/profilePic.png' : '/assets/icon/botPic.png'}
					date={new Date()}
				/>
				{MsgType !== 'msg-txt' ? <img src={MsgText} alt="user-phot0" ref={userPhotoRef} style={{width:'350px', height:'350px'}} useMap='#productMap' onClick={handleClick}/> : null }
				{MsgType !== 'msg-txt' && poseInfo.length > 0 ? generateImageMap() : null }
				{/* <Avatar
            src={MsgBy === 'user' ? '/assets/icon/profilePic.png' : '/assets/icon/botPic.jpeg'}
            alt="logo"
            size="large"
            type="circle flexible"
            position={MsgBy === 'user' ? 'right' : 'left'}
            style={{ float: MsgBy === 'user' ? 'right' : 'left' }}
          />			 */}
		  {/* {MsgType !== 'msg-txt' && poseInfo.length > 0 ? CanvasImg(MsgText) : null }
				{MsgType !== 'msg-txt' && poseInfo.length > 0 ? generateImageMap() : null } */}
				</div>
				</div>
			))}
			<div ref={EndOfThreadRef} />
		</>
	)
}

export default ChatBubbles