import LottieImage from "./components/LottieImage"
import NavigationMenu from "./components/NavigationMenu"
import SmoothScroll from "./components/SmoothScroll"
import FullCycle from "./components/FullCycle"
import AnimScreen from "./components/AnimScreen"

function App() {

  return (
    <SmoothScroll>
      <section className="hero-scroll">
        <div className="hero-sticky">
          <div className="full-screen-image">
            <h1 id="first-heading" className="first-heading h1">
              Fame Real Estate — where lifestyle becomes legacy
            </h1>
            <img
              src="https://i.pinimg.com/1200x/ac/46/18/ac4618d195b576be660970007b6b3506.jpg"
              alt=""
            />
          </div>
          <AnimScreen />
        </div>
      </section>

      <LottieImage />
      <NavigationMenu />
      <FullCycle />
    </SmoothScroll>
   
  )
}

export default App
