import React from "react";
import ImageUploading from "react-images-uploading";


const ImageUploader = () => {
    const [images, setImages] = React.useState([]);



    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
      };
console.log('image',curMessage)
    // const showImg = () => <img src={images[0]['data_url']} alt="Red dot" width='100px' />


    return (
        <div className="App">
            <ImageUploading
                value={images}
                onChange={onChange}
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