import React, { useState, useEffect, useRef } from 'react'
import "react-chat-elements/dist/main.css"
import { Input, Button } from 'react-chat-elements'
import ChatBubbles from './ChatBubbles'
import "./ChatFeed.css"

const ChatFeed = (props) => {
	const [thread, setThread] = useState([])
	const [curMessage, setCurMessage ] = useState('') 
	const userMsg = useRef();
	const addMessageToThread = () => {
		setThread(prevMessages => [
			...prevMessages,
			{
				MsgBy: 'user',
				MsgText: curMessage,
			},
			{
				MsgBy: 'MyStyle',
				MsgText: `Reply of: ${curMessage}`,
			}
		])
		setCurMessage('')
	}

	const onKeyDown = (event)=> {
		// 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
		if (event.key === 'Enter') {
			event.preventDefault();
			event.stopPropagation();
			addMessageToThread()
		}
	}
	
	useEffect(() => {
    userMsg.current.value = curMessage;
  }, [curMessage]);

	return (
		<>
			<ChatBubbles thread={thread} />
			<footer>
				<Input
					className='chat-input'
					placeholder="Type here..."
					multiline={true}
					onChange={e => setCurMessage(e.target.value)}
					value={curMessage}
					referance={userMsg}
					onKeyDown={onKeyDown}
					rightButtons={<Button color='white' backgroundColor='black' text='Send' onClick={addMessageToThread}/>}
				/>
			</footer>
		</>
	)
}

export default ChatFeed