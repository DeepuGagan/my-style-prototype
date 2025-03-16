import React, { useState, useEffect } from 'react'
import "react-chat-elements/dist/main.css"
import { MessageBox, Input, Button } from 'react-chat-elements'
import "./ChatFeed.css"
// import ApiService from '../services'
// import Loader from './Loader'

// const refreshData = (runId, setState) => {
//   ApiService
//     .getMigrationRunByStatus({ runId })
//     .then(({results: [CurrentRun] = []} = {}) => {
//       setState({
//         isLoading: false,
//         CurrentRun
//       })
//     }).catch(console.error)
// }

const ChatFeed = (props) => {
    let inputReferance = React.createRef()
//   const [messages, setMessages] = useState([
//     new Message({
//       id: 1,
//       message: "I'm the recipient! (The person you're talking to)",
//     }), // Gray bubble
//     new Message({ id: 0, message: "I'm you -- the blue bubble!" }), // Blue bubble
//   ],)

//   useEffect(() => {
//     setState({
//       isLoading: true
//     })
//     refreshData(runId, setState)
//   }, [runId])

//   if (!isLoading && !CurrentRun) {
//     return <div>Selected run id {runId} is not available</div>
//   }
  return (
 
    // Your JSX...
    <>
        <MessageBox
        className='chat-bubble-1'
        position={"left"}
        type={"text"}
        title={"Message Box Title"}
        text="Here is a text type message box"
        />
        <MessageBox
        className='chat-bubble-2'
        position={"right"}
        type={"text"}
        title={"Message Box Title"}
        text="Here is a text type message box"
        />
        <footer>
        <Input
            className='chat-input'
            placeholder="Type here..."
            multiline={true}
            rightButtons={<Button color='white' backgroundColor='black' text='Send' />}
        />
        </footer>
    </>
  )
}

export default ChatFeed