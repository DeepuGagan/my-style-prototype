const axios = require('axios').default

const chatgptTurbo = async (prompt) => {
	const API_ENDPOINT = 'https://api.openai.com/v1/chat/completions'
	const requestBody = {
		"model": "gpt-3.5-turbo",
		"messages": [{ "role": "assistant", "content": `${prompt}` }]
	}

	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
	}

	const completion = await axios.post(API_ENDPOINT, requestBody, {headers})
	return completion.data.choices[0].message.content
}

const chatgptDavinci = async (prompt) => {
	prompt = prompt.includes("hi") || prompt.includes("Hi") ? prompt :  `Which 5 instyle magazine article links do you recommend on "${prompt}"`
	const API_ENDPOINT = 'https://api.openai.com/v1/completions'
	const requestBody = {
		model: "text-davinci-003",
		prompt,
		temperature: 1,
    max_tokens: 2056,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
	}

	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
	}

	const completion = await axios.post(API_ENDPOINT, requestBody, {headers})
	return completion.data.choices[0].text
}

const generateChatGPTRes = async (prompt) => {
	const openAiResponses = await chatgptDavinci(prompt)
	// console.log('completion : ', prompt, ' res: ', openAiResponses)
	return openAiResponses
}

module.exports = {generateChatGPTRes}
