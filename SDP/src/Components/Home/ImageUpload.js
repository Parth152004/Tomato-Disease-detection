import React, { useState } from 'react'
import './Image.css' // Import the CSS
import { Link } from 'react-router-dom'
import AWS from 'aws-sdk'

const ImageUpload = () => {
  AWS.config.update({
    accessKeyId: 'AKIAQ3EGRFLLQ5HRCUO3',
    secretAccessKey: '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',
    region: 'ap-south-1',
  })

  const s3 = new AWS.S3()
  const bucketName = 'userlogindisease'

  const defaultImageURL = process.env.PUBLIC_URL + '/insert.jpg' // Replace with the actual path
  const [selectedImage, setSelectedImage] = useState(null)
  const [predictions, setPredictions] = useState(null)
  const [index, setIndex] = useState()
  const [lable, setlable] = useState()

  const handleImageClick = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.name = 'myImage'
    input.accept = 'image/*'
    input.onchange = (event) => {
      const file = event.target.files[0]
      setSelectedImage(file)
    }
    input.click()
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    setSelectedImage(file)
  }

  const handleRemove = () => {
    setSelectedImage(null)
    setPredictions(null) // Clear predictions when removing image
  }

  const handlePredict = () => {
    console.log('15')
    if (!selectedImage) return
    const formData = new FormData()
    formData.append('file', selectedImage)

    const userDirectoryKey = `user_directories/${localStorage.getItem(
      'email',
    )}/`

    // Generate a unique file key for the uploaded image
    const fileKey = `${userDirectoryKey}${Date.now()}_${selectedImage.name}`

    const params = {
      Bucket: bucketName,
      Key: fileKey,
      Body: selectedImage,
    }

    // Upload the image to S3
    s3.upload(params, (err, data) => {
      if (err) {
        console.error('Error uploading image to S3:', err)
        return
      }

      console.log('Image uploaded to S3:', data.Location)
      // Do any additional logic after image upload if needed
    })

    fetch('http://localhost:3005/predict', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.predictions && data.predictions.length > 0) {
          let maxIndex = 0
          let maxValue = data.predictions[0][0]
          for (let i = 1; i < data.predictions[0].length; i++) {
            if (data.predictions[0][i] > maxValue) {
              maxValue = data.predictions[0][i]
              maxIndex = i
            }
          }
          let lable = ''
          if (maxIndex == 0) {
            lable = 'Bacterial_spot'
          } else if (maxIndex == 1) {
            lable = 'Early_blight'
          } else if (maxIndex == 2) {
            lable = 'Late_blight'
          } else if (maxIndex == 3) {
            lable = 'Leaf_Mold'
          } else if (maxIndex == 4) {
            lable = 'Septoria_leaf_spot'
          } else if (maxIndex == 5) {
            lable = 'Spider_mites Two-spotted_spider_mite'
          } else if (maxIndex == 6) {
            lable = 'Target_Spot'
          } else if (maxIndex == 7) {
            lable = 'Tomato_Yellow_Leaf_Curl_Virus'
          } else if (maxIndex == 8) {
            lable = 'Tomato_mosaic_virus'
          } else if (maxIndex == 9) {
            lable = 'Healthy'
          }
          console.log('this is email:', localStorage.getItem('email'))
          console.log('Lable of the predection is ', lable)
          console.log('Index of the maximum value:', maxIndex)
          setPredictions(data.predictions[0])
          setIndex(maxIndex)
          setlable(lable)
        } else {
          console.log('No predictions found in the response')
        }
      })
      .catch((error) => console.error('Error:', error))
  }

  return (
    <div className="image-upload-container">
      {selectedImage && (
        <div className="selected-image">
          <img
            alt="not found"
            width={'400px'}
            height={'400px'}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <button onClick={handleRemove}>Remove</button>
        </div>
      )}

      {!selectedImage && (
        <div className="default-image" onClick={handleImageClick}>
          <img
            alt="default"
            width={'400px'}
            height={'400px'}
            src={defaultImageURL}
          />
        </div>
      )}

      <br />
      <br />

      <input
        type="file"
        name="myImage"
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />

      {selectedImage && (
        <div>
          <button onClick={handlePredict}>Predict</button>
          {predictions && (
            <div className="predictions">
              <h3>Predictions:</h3>
              <ul>
                <Link to="/Diseaseinfo">
                  {/* {predictions.map((prediction, index) => (
                  <li key={index}>{prediction}</li>
                ))} */}
                  {lable}
                </Link>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ImageUpload
