import React from 'react'

const FullCycle: React.FC = () => {
  const steps = ['explore', 'camp', 'hike', 'adventure', 'discover']

  return (
    <article 
      className="full-cycle" 
      style={{ transform: 'translate(0px, 0px)', willChange: 'transform' }}
    >
      <p className="left-text l1-t">Full-cycle camping adventure services</p>
      <ul className="steps">
        {steps.map((step) => (
          <li key={step}>
            <button className="step l1" data-form-anchor="">
              <div className="wrap-anim-line">
                <span>{step}</span>
                <svg 
                  width="8" 
                  height="14" 
                  viewBox="0 0 8 14" 
                  fill="none" 
                  className="arrow-svg" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M1.079 11.358L0 10.279L4.329 5.95L0.052 5.651L1.703 4L7.059 4.312L7.358 9.655L5.707 11.306L5.421 7.029L1.079 11.358Z" 
                    fill="black"
                  />
                </svg>
              </div>
              <div className="wrap-anim-line">
                <span>{step}</span>
                <svg 
                  width="8" 
                  height="14" 
                  viewBox="0 0 8 14" 
                  fill="none" 
                  className="arrow-svg" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M1.079 11.358L0 10.279L4.329 5.95L0.052 5.651L1.703 4L7.059 4.312L7.358 9.655L5.707 11.306L5.421 7.029L1.079 11.358Z" 
                    fill="white"
                  />
                </svg>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default FullCycle

