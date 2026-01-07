import React from 'react'

const LottieImage: React.FC = () => {
  return (
    <div className="lottie-logo-wrap">
      <video
        src="https://fame-estate.com/lottie/logo.webm"
        autoPlay
        loop
        playsInline
        muted
        className="inner-img"
      />
    </div>
  )
}

export default LottieImage


