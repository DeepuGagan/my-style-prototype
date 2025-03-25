import React from "react";
import ImageUploading from "react-images-uploading";


const ImageUploader = ({
    setThread,
    curMessage,
    setCurMessage,
    setTypingBubble
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
        const googleVisionApiRes = 'Whatever vison api gives/ we make it to give'
        setTypingBubble(false)
        setThread(prevMessages => [
            ...prevMessages,
            {
                MsgBy: 'MyStyle',
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
        addImageToThread({base64Img})
      };
console.log('image',curMessage)
    // const showImg = () => <img src={images[0]['data_url']} alt="Red dot" width='100px' />


    return (
        <div className="App">
            <ImageUploading
                multiple={false}
                value={images}
                onChange={onChange}
                maxNumber={maxImgs}
                dataURLKey="data_url"
                acceptType={["jpg"]}
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
                                Upload
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