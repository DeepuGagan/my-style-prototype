import React, { useRef, useEffect } from 'react'
import "react-chat-elements/dist/main.css"
import { MessageBox } from 'react-chat-elements'
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
			{thread.map(({MsgBy, MsgText}, i) => (
				<MessageBox
					key = {`chat-bubble-${i}`}
					className='chat-bubble'
					position={MsgBy === 'user' ? 'right' : 'left'}
					type={"text"}
					title={MsgBy === 'user' ? 'You' : 'MyStyle'}
					text={MsgText}
				/>
			))}
			<div ref={EndOfThreadRef} />
		</>
	)
}

export default ChatBubbles