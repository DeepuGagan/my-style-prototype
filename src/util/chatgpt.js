const { analyseImage } = require('./visionAPI')

const axios = require('axios').default
const { DATA } = require('./data')

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
	console.log({keywords});
	const analysisRes = await axios.get(`${API_ENDPOINT}/${keywords}`, { headers: { 'Content-Type': 'application/json'}})
	// debugger

	console.log('analysisRes: ', analysisRes.data)
	return analysisRes.data
}

const getMockData = ({openAiResponses}) => {
	const keywords = openAiResponses.trim().toLowerCase()
	const convertedKeywords = keywords.replace(/-(.)/g, (_, char) => char.toUpperCase()).replace(/-/g, '')
	console.log(openAiResponses,keywords,convertedKeywords);
	return DATA[convertedKeywords] || DATA['defaultWear']
}

const ArrayToStringForPrem = (URLSet) => URLSet.filter((set,index)=>index===0).reduce((url,final) => `${final}\n${url}`,'')

const ArrayToString = (URLSet) => URLSet.reduce((url,final) => `${final}\n${url}`,'')

const generateChatGPTRes = async ({curMessage,planInfo}) => {
	const welcomePrompts = ["hi", "Hi", "Hello", "hello", "hi ", "Hi ", "Hello ", "hello "]
	const isGreetings = welcomePrompts.includes(curMessage)
	curMessage = isGreetings ? curMessage :  `Extract keywords from this sentence and return result as string separated by '-'. "${curMessage}"` //Extract keywords and categories from this sentence.
	// prompt = `list out instyle magazine links for "${prompt}"`
	console.log('prompt: ', curMessage)
	const openAiResponses = await chatgptDavinci(curMessage)
	console.log('completion : ', curMessage, ' res: ', openAiResponses)
	// debugger
	if(isGreetings) return openAiResponses
	// const res = await getRelaventResults(openAiResponses)
	const res = getMockData({openAiResponses})
	console.log({generateChatGPTRES:res,planInfo})
	const URLSet = Array.from(new Set(res.map(({URL}) => URL)))
	const productsSet = Array.from(new Set(res.map(({Infocat__Product_Retailer_URL: product}) => product.slice(1,product.length-1).split(',').map(i => i)).flatMap(i => i)))
	// const chatRes = `\nChoose from these relavent products:\n${ArrayToString(productsSet)}\nGet your style suggestions from these articles:\n${ArrayToString(URLSet)}`
	const chatResponseToPlans = {
		basic:`\nChoose from these relavent products:\n${ArrayToString(productsSet)}\nGet your style suggestions from these articles:\n${ArrayToString(URLSet)}`,
		premium:`\nChoose from these relavent products:\n${ArrayToString(productsSet)}\nGet your style suggestions from these articles:\n${ArrayToString(URLSet)}`,
		luxury:`\nChoose from these relavent products:\n${ArrayToString(productsSet)}\nGet your style suggestions from these articles:\n${ArrayToString(URLSet)}`,
	}
	// debugger
	return chatResponseToPlans[planInfo]
	// return chatRes
}

module.exports = {generateChatGPTRes}
