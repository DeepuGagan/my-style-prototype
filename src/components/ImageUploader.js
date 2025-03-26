import React from "react";
import ImageUploading from "react-images-uploading";
import { IonIcon} from '@ionic/react';
import { cloudUpload } from 'ionicons/icons';
// const { predict } = require('@codait/max-human-pose-estimator')
const { analyseImage, visionAxios, getMockVision } = require('../util/visionAPI')






const ImageUploader = ({
    setThread,
    curMessage,
    setCurMessage,
    setTypingBubble,
    planInfo,
}) => {
    const [images, setImages] = React.useState([]);
    const maxImgs = 20
    const addImageToThread = async ({base64Img}) => {
        setThread(prevMessages => [
            ...prevMessages,
            {
                MsgBy: 'user',
                MsgText: base64Img,
                MsgType: 'msg-img',
            }
        ])
        setTypingBubble(true)
				// await analyseImage()
				// debugger
        const googleVisionApiRes = await getMockVision({base64Img,planInfo})
				// debugger
				const img  = document.getElementsByClassName('rce-mbox-photo--img')[0]
				// debugger
				// predict(img)
  			// .then(prediction => {
				// 	// debugger
    		// 	console.log(prediction.posesDetected)
  			// })
				// debugger
        setTypingBubble(false)
        setThread(prevMessages => [
            ...prevMessages,
            {
                MsgBy: 'My Stylist',
                MsgText: `${googleVisionApiRes}`,
                MsgType: 'msg-txt',//'msg-img',
            }
        ])
        setCurMessage('')
    }


    // const onChange = (sets) => {
    //     // data for submit
    //     console.log('............................................',sets);
    //     console.log('------------------------------------>>',sets[0].data_url);
    //     console.log(sets[0].imageList, sets[0].addUpdateIndex);
    //     setImages(sets[0].imageList);
    //     addImageToThread()
    // };
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
        const base64Img = imageList[0].data_url
				// // debugger
				// analyseImage(base64Img)
				// visionAxios(base64Img)
        addImageToThread({base64Img})
      };
console.log('image',curMessage)
    // const showImg = () => <img src={images[0]['data_url']} alt="Red dot" width='100px' />


    return (
        <div className="App" style={{marginLeft:'5px'}}>
            <ImageUploading
                multiple={false}
                value={images}
                onChange={onChange}
                maxNumber={maxImgs}
                dataURLKey="data_url"
                acceptType={['jpg', 'JPEG', 'PNG8', 'PNG24', 'GIF', 'BMP', 'WEBP', 'RAW', 'ICO', 'PDF', 'TIFF']}
            >
                {({
                    onImageUpload,
                    isDragging,
                    dragProps
                }) => (
                    <>
                        {/* write your building UI */}
                        {/* {images.length > 0 && showImg()} */}
                        <div className="upload__image-wrapper">
                            <button
                                style={isDragging ? { color: "red" } : null}
                                onClick={onImageUpload}
                                {...dragProps}
                            >
                                <IonIcon icon={cloudUpload} style={{ fontSize: '2rem'}} />
                            </button>
                        </div>
                        {/* {
                            images.length > 0 && console.log(images[0]['data_url'])
                        } */}
                    </>
                )}
            </ImageUploading>
        </div>
    );
}

export default ImageUploader