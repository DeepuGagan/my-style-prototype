// Google cloud library for Vision API
// const vision = require("@google-cloud/vision");

// // Google cloud client
// const client = new vision.ImageAnnotatorClient({
//   keyFilename: './keys/vision-api.json'
// });
const axios = require('axios').default
const vision = require('react-cloud-vision-api')
vision.init({auth: process.env.REACT_APP_VISION_API_KEY})
console.log('vision: ', process.env.REACT_APP_VISION_API_KEY)
const { imageVisionMock } = require('./visionAPIMock')

const analyseImage = async (img) => {
	// const imgFile = '../img/sample.jpg'
	const vision = require('react-cloud-vision-api')
	vision.init({auth: process.env.REACT_APP_VISION_API_KEY})
	console.log('vision: ', process.env.REACT_APP_VISION_API_KEY)
	const req = await new vision.Request({
		image: new vision.Image({
			base64: img,
		}),
		features: [
			// new vision.Feature('TEXT_DETECTION', 4),
			new vision.Feature('LABEL_DETECTION', 10),
		]
	})
	console.log('req: ', req)
	vision.annotate(req).then((res) => {
		// handling response
		console.log(JSON.stringify(res.responses))
	}, (e) => { 
		console.log('Error: ', e)
	})
}

const visionAxios = async (img) => {
	// https://cloud.google.com/vision/docs/reference/rest/v1/images/annotate
	const API_ENDPOINT = 'https://vision.googleapis.com/v1/images:annotate'
	const requestBody = {
		"requests": [
			{
				"image": {
					"content": `${img.split("base64,")[1]}`
					// "source": "../img/sample.jpg"
				},
				"features": [
					{
						"maxResults": 10,
						"type": "LABEL_DETECTION"
					}
				]
			}
		]
	}

	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${process.env.REACT_APP_VISION_API_KEY2}`,
		'x-goog-user-project': 'vision-api-test-385716'
	}
	console.log('requestBody: ', requestBody)
	console.log('auth: ', `Bearer ${process.env.REACT_APP_VISION_API_KEY2}`)
	const res = await axios.post(API_ENDPOINT, requestBody, {headers})
	console.log('vision res: ', res)
}

const getRelaventResults = async (keywords) => {
	const API_ENDPOINT = `http://localhost:8888`
	const lowerCaseKeywords = keywords.toLowerCase()
	const analysisRes = await axios.get(`${API_ENDPOINT}/${lowerCaseKeywords}`, { headers: { 'Content-Type': 'application/json'}})
	// debugger
	console.log({a:`${API_ENDPOINT}/${lowerCaseKeywords}`, b:`${API_ENDPOINT}/${keywords}`});
	console.log('analysisRes: ', analysisRes.data)
	return analysisRes.data
}

const ArrayToString = (URLSet) => URLSet.reduce((url,final) => `${final}\n${url}`,'')

const ArrayToStringForPrem = (URLSet) => URLSet.filter((set,index)=>index===0).reduce((url,final) => `${final}\n${url}`,'')


const getMockVision = async ({base64Img,planInfo}) => {
	const base64Id = base64Img.split("base64,")[1]
	const uniqueKey = base64Id.slice(base64Id.length-25, base64Id.length-1)
	// debugger
	const tags =  imageVisionMock[uniqueKey] ? imageVisionMock[uniqueKey].tags : ['fashion', 'party', 'dress']
	const keywords = tags.join('-')
	// debugger
	const res = await getRelaventResults(keywords)
	console.log({getMockVisionRES:res})
	const URLSet = Array.from(new Set(res.map(({URL}) => URL)))
	const productsSet = Array.from(new Set(res.map(({Infocat__Product_Retailer_URL: product}) => product.slice(1,product.length-1).split(',').map(i => i)).flatMap(i => i)))
	// const chatRes = `\nChoose from these relavent products:\n${ArrayToString(productsSet)}\nGet your style suggestions from these articles:\n${ArrayToString(URLSet)}`
	// debugger
	const chatResponseToPlans = {
		basic:`\nGet your style suggestions from these articles:\n${ArrayToString(URLSet)}`,
		premium:`\nChoose from these relavent products:\n${ArrayToStringForPrem(productsSet)}\nGet your style suggestions from these articles:\n${ArrayToString(URLSet)}`,
		luxury:`\nChoose from these relavent products:\n${ArrayToString(productsSet)}\nGet your style suggestions from these articles:\n${ArrayToString(URLSet)}`,
	}
	return chatResponseToPlans[planInfo]
	// return chatRes
}

module.exports = { analyseImage, visionAxios, getMockVision }