import React from 'react'
import "react-chat-elements/dist/main.css"
import { MessageBox } from 'react-chat-elements'
import "./ChatFeed.css"

const ChatBubbles = (props) => {
	const { thread = [] } = props
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
		</>
	)
}

export default ChatBubbles