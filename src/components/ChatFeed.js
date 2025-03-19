import React, { useState, useEffect, useRef } from 'react'
import "react-chat-elements/dist/main.css"
import { Input, Button, MessageBox } from 'react-chat-elements'
import ChatBubbles from './ChatBubbles'
import "./ChatFeed.css"
import { generateChatGPTRes } from '../util/chatgpt'

const ChatFeed = (props) => {
	const [thread, setThread] = useState([])
	const [curMessage, setCurMessage ] = useState('')
	const [typingBubble, setTypingBubble ] = useState(false) 
	const userMsg = useRef();

	const addMessageToThread = async () => {
		setThread(prevMessages => [
			...prevMessages,
			{
				MsgBy: 'user',
				MsgText: curMessage,
			}
		])
		setTypingBubble(true)
		const chatgptRes = await generateChatGPTRes(curMessage)
		setTypingBubble(false)
		setThread(prevMessages => [
			...prevMessages,
			{
				MsgBy: 'MyStyle',
				MsgText: `${chatgptRes}`,
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
		<div className='chat-feed'>
			<ChatBubbles thread={thread} />
			{typingBubble 
				? <MessageBox
						className='chat-bubble'
						position={'left'}
						type={"text"}
						title={'MyStyle'}
						text={`Typing...`}
					/>
				: null
		}
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
		</div>
	)
}

export default ChatFeed