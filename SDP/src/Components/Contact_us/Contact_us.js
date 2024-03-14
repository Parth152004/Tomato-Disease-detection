import React from 'react'
import './style.css'
import plant from './plant.png'
import Navbar from '../Navbar'

export default function Contact_us() {
  return (
    <>
      <Navbar />
      <div className="contact-info-container">
        <div className="about-drplant">
          <h2>DrPlant</h2>
          <div className="DrPlant">
            <p>
              DrPlant is a revolutionary leaf disease detection website that
              utilizes advanced technology to identify plant diseases. Our
              mission is to help farmers protect their crops by providing
              accurate and timely disease detection solutions.
            </p>
            <img src={plant} height={'250px'} width={'250px'} />
          </div>
        </div>

        <div className="contact-box">
          <h1>ContactUs</h1>

          <div className="contact-details">
            <div className="email">
              <label>Email:</label>

              <span>
                {/* <FaEnvelope /> info@drplant.com */}
              </span>
            </div>

            <div className="social-media-icons">
              <label>Social Media:</label>
              <div className="icon">
                {/* <a
                  href="https://www.facebook.com/yourpage"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://www.twitter.com/yourhandle"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://www.instagram.com/youraccount"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </a> */}
              </div>
            </div>

            <div className="phone">
              <label>Phone: </label>

              <span>
                {' '}
                {/* <FaPhone /> */}
                +1 (123) 456-7890
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
