const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// const chatgptAPI = new ChatGPTAPI({ apiKey: process.env.OPENAI_API_KEY })

const generateChatGPTRes = async (prompt) => {
	const completion = await openai.createCompletion({
		model: "text-davinci-003",
		prompt,
		temperature: 1,
    max_tokens: 2056,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
	});
	const openAiResponses = completion.data.choices.reduce((acc, { text }) => ({ ...acc, text: text.replace("\n", "") }), {})
	console.log('completion : ', prompt, ' res: ', openAiResponses)
	return JSON.stringify(openAiResponses)
}

module.exports = {
	generateChatGPTRes
}