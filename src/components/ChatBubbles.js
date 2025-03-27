import React, { useRef, useEffect } from 'react'
import "react-chat-elements/dist/main.css"
import { MessageBox, Avatar } from 'react-chat-elements'
import "./ChatFeed.css"

const ChatBubbles = (props) => {
	const { thread = [] } = props
	const EndOfThreadRef = useRef(null)

  const scrollToBottom = () => {
    EndOfThreadRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [thread]);

	return (
		<>
			{thread.map(({MsgBy, MsgText, MsgType}, i) => (
				<div key={`justForTesting${i}`} >
				<MessageBox
					key = {`chat-bubble-${i}`}
					className='chat-bubble'
					position={MsgBy === 'user' ? 'right' : 'left'}
					type={MsgType === 'msg-txt' ? "text" : "photo"}
					title={MsgBy === 'user' ? 'You' : 'MyStyle'}
					text={MsgType === 'msg-txt' ? MsgText : 'user-uploaded-image'}
					data={{
						uri: MsgText,
					  }}
					date={new Date()}
				/>
				{/* <Avatar src={'https://picsum.photos/200/300'} alt={'logo'} size='large' type='circle flexible' /> */}
				</div>
			))}
			<div ref={EndOfThreadRef} />
		</>
	)
}

export default ChatBubbles