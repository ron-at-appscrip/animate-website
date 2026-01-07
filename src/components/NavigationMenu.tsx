import React from 'react'

const NavigationMenu: React.FC = () => {
  return (
    <div className="right-anim" style={{ transform: 'translate(0%, -50%)', overflow: 'unset' }}>
      <p
        className="preloader-text l1"
        style={{ transform: 'translate(0px, -100px)', opacity: 0, visibility: 'hidden' }}
      >
        new emotions?
      </p>
      <div
        className="navigation-menu l1 screen-main-part active"
        style={{ transform: 'translate(0px, 0px)' }}
      >
        <button className="nav-name">navigation</button>
        <button className="lang-switch">
          <span>ru</span>
          <span>ru</span>
        </button>
        <ul className="nav-list">
          <li>
            <button className="l1">
              <sup>[ 1 ]</sup>
              <p className="wrap-item">
                <span>introduction</span>
                <span>introduction</span>
              </p>
            </button>
          </li>
          <li>
            <button className="l1 n2">
              <sup>[ 2 ]</sup>
              <p className="wrap-item">
                <span>About</span>
                <span>About</span>
              </p>
            </button>
          </li>
          <li>
            <button className="l1 n3">
              <sup>[ 3 ]</sup>
              <p className="wrap-item">
                <span>cases</span>
                <span>cases</span>
              </p>
            </button>
          </li>
          <li>
            <button className="l1 n4">
              <sup>[ 4 ]</sup>
              <p className="wrap-item">
                <span>services</span>
                <span>services</span>
              </p>
            </button>
          </li>
          <li>
            <button className="l1 n5">
              <sup>[ 5 ]</sup>
              <p className="wrap-item">
                <span>partnership</span>
                <span>partnership</span>
              </p>
            </button>
          </li>
          <li>
            <button className="l1 n6">
              <sup>[ 6 ]</sup>
              <p className="wrap-item">
                <span>team</span>
                <span>team</span>
              </p>
            </button>
          </li>
          <li>
            <button className="l1 n6">
              <sup>[ 7 ]</sup>
              <p className="wrap-item">
                <span>contact</span>
                <span>contact</span>
              </p>
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default NavigationMenu


