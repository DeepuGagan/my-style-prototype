import './TypingLoader.css'

const renderTypingBubbles = () => (
	<div className='rce-mbox chat-bubble loader'>
		<div className='dot'></div>
		<div className='dot'></div>
		<div className='dot'></div>
	</div>
)

const TypingLoader = ({typingBubble}) => (
	typingBubble 
	?	renderTypingBubbles()
	: null
)

export default TypingLoader