const { analyseImage } = require('./visionAPI')

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

const getRelaventResults = async (openAiResponses) => {
	const API_ENDPOINT = `http://localhost:8888`
	const keywords = openAiResponses.trim().toLowerCase()
	const analysisRes = await axios.get(`${API_ENDPOINT}/${keywords}`, { headers: { 'Content-Type': 'application/json'}})
	// debugger

	console.log('analysisRes: ', analysisRes.data)
	return analysisRes.data
}

const ArrayToString = (URLSet) => URLSet.reduce((url,final) => `${final}\n${url}`,'')

const generateChatGPTRes = async (prompt) => {
	const welcomePrompts = ["hi", "Hi", "Hello", "hello", "hi ", "Hi ", "Hello ", "hello "]
	const isGreetings = welcomePrompts.includes(prompt)
	prompt = isGreetings ? prompt :  `Extract keywords from this sentence and return result as string separated by '-'. "${prompt}"` //Extract keywords and categories from this sentence.
	// prompt = `list out instyle magazine links for "${prompt}"`
	console.log('prompt: ', prompt)
	const openAiResponses = await chatgptDavinci(prompt)
	console.log('completion : ', prompt, ' res: ', openAiResponses)
	// debugger
	if(isGreetings) return openAiResponses
	const res = await getRelaventResults(openAiResponses)
	const URLSet = Array.from(new Set(res.map(({URL}) => URL)))
	const productsSet = Array.from(new Set(res.map(({Infocat__Product_Retailer_URL: product}) => product.slice(1,product.length-1).split(',').map(i => i)).flatMap(i => i)))
	const chatRes = `\nChoose from these relavent products:\n${ArrayToString(productsSet)}\nGet your style suggestions from these articles:\n${ArrayToString(URLSet)}`
	// debugger
	return chatRes
}

module.exports = {generateChatGPTRes}
