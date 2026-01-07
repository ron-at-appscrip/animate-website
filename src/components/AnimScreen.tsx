import React, { useEffect, useRef } from 'react'
import { useLenis } from '../contexts/LenisContext'

const AnimScreen: React.FC = () => {
  const lenis = useLenis()
  const containerRef = useRef<HTMLDivElement>(null)
  const redScreenRef = useRef<HTMLDivElement>(null)
  const clip1Ref = useRef<HTMLDivElement>(null)
  const clip2Ref = useRef<HTMLDivElement>(null)
  const clip3Ref = useRef<HTMLDivElement>(null)
  const img1Ref = useRef<HTMLImageElement>(null)
  const img2Ref = useRef<HTMLImageElement>(null)
  const img3Ref = useRef<HTMLImageElement>(null)
  const scaleSlideRef = useRef<HTMLDivElement>(null)
  const rafId = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (!lenis || !redScreenRef.current) return

    const updateScale = () => {
      // Use lenis.scroll if available, otherwise fallback to window.scrollY
      const scroll = (lenis as any).scroll ?? window.scrollY
      const vh = window.innerHeight

      // progress inside the nearest hero section (main page scroll, no nested scroll)
      const heroEl = containerRef.current?.closest('.hero-scroll') as HTMLElement | null
      const heroStart = heroEl ? heroEl.offsetTop : 0
      const localScroll = Math.max(0, scroll - heroStart)
      const scrollProgress = localScroll / vh // 0.. based on hero scroll

      const initialX = 0.0056
      let x = initialX
      let y = 0

      // Phase 1: Scale vertically (0 to 1) during first 0.5vh scroll
      if (scrollProgress < 0.5) {
        const phase1Progress = scrollProgress / 0.5 // 0 to 1
        y = phase1Progress
        x = initialX
      }
      // Phase 2: Maintain full vertical scale until 1vh (100vh scroll)
      else if (scrollProgress < 1) {
        y = 1
        x = initialX
      }
      // Phase 3: Scale horizontally (0.0056 to 1) after 1vh
      else {
        y = 1
        const phase3Progress = Math.min((scrollProgress - 1) / 0.5, 1) // 0 to 1 over next 0.5vh
        x = initialX + (1 - initialX) * phase3Progress
      }

      // Apply red screen scale (inside a 20px-inset wrapper)
      if (redScreenRef.current) {
        redScreenRef.current.style.transform = `scale(${x}, ${y})`
      }

      // Phase 4: after red finished horizontally, start revealing clip slides via clip-path
      // Start after scrollProgress >= 1.5, reveal n1 -> n2 -> n3 with small stagger.
      const base = scrollProgress - 1.5
      const clamp01 = (v: number) => Math.max(0, Math.min(1, v))
      const makeClip = (p: number) => {
        // Reveal from center to full screen (0% to 0% inset)
        const inset = 50 * (1 - p) // 50% at start, 0% at end
        const a = `${inset}%`
        const b = `${100 - inset}%`
        return `polygon(${a} ${a}, ${b} ${a}, ${b} ${b}, ${a} ${b})`
      }

      const p1 = clamp01(base / 0.25)
      const p2 = clamp01((base - 0.2) / 0.25)
      const p3 = clamp01((base - 0.4) / 0.25)

      if (clip1Ref.current) clip1Ref.current.style.clipPath = makeClip(p1)
      if (clip2Ref.current) clip2Ref.current.style.clipPath = makeClip(p2)
      if (clip3Ref.current) clip3Ref.current.style.clipPath = makeClip(p3)

      // Image scale animation: sequential reveal
      // Each image scales from 1 to 0.6, then next image starts
      const imageScaleStart = 1.5 // Start after red screen horizontal scale completes
      const imageScaleDuration = 0.3 // Duration for each image scale animation
      
      // Image 1: Scale from 1 to 0.6
      if (img1Ref.current) {
        const img1Base = scrollProgress - imageScaleStart
        if (img1Base >= 0) {
          const img1Progress = clamp01(img1Base / imageScaleDuration)
          const img1Scale = 1 - (1 - 0.6) * img1Progress // 1 to 0.6
          img1Ref.current.style.transform = `scale(${img1Scale}, ${img1Scale})`
        } else {
          img1Ref.current.style.transform = 'scale(1, 1)'
        }
      }

      // Image 2: Start when image 1 reaches 0.6 (after imageScaleDuration)
      if (img2Ref.current) {
        const img2Base = scrollProgress - (imageScaleStart + imageScaleDuration)
        if (img2Base >= 0) {
          const img2Progress = clamp01(img2Base / imageScaleDuration)
          const img2Scale = 1 - (1 - 0.6) * img2Progress // 1 to 0.6
          img2Ref.current.style.transform = `scale(${img2Scale}, ${img2Scale})`
        } else {
          img2Ref.current.style.transform = 'scale(1, 1)'
        }
      }

      // Image 3: Start when image 2 reaches 0.6
      if (img3Ref.current) {
        const img3Base = scrollProgress - (imageScaleStart + imageScaleDuration * 2)
        if (img3Base >= 0) {
          const img3Progress = clamp01(img3Base / imageScaleDuration)
          const img3Scale = 1 - (1 - 0.6) * img3Progress // 1 to 0.6
          img3Ref.current.style.transform = `scale(${img3Scale}, ${img3Scale})`
        } else {
          img3Ref.current.style.transform = 'scale(1, 1)'
        }
      }

      // Scale slide animation: Use clip-path like other clip-slides
      // Start after last clip path completes (p3 completes at: 1.5 + 0.4 + 0.25 = 2.15)
      // Use same makeClip function and same duration as clip-slides
      const scaleSlideBase = scrollProgress - 2.15
      const p4 = clamp01(scaleSlideBase / 0.25) // Same duration (0.25) as clip slides
      
      if (scaleSlideRef.current) {
        // Use exact same clip-path reveal logic as clip-slides
        scaleSlideRef.current.style.clipPath = makeClip(p4)
      }

      // Lottie positioning:
      // - when scroll starts: center
      // - when red vertical scale completes (Y==1): bottom-center
      const lottieEl = document.querySelector('.lottie-logo-wrap') as HTMLElement | null
      if (lottieEl) {
        const started = scrollProgress > 0.02
        const verticalDone = scrollProgress >= 0.5

        lottieEl.classList.toggle('lottie--center', started && !verticalDone)
        lottieEl.classList.toggle('lottie--bottom-center', started && verticalDone)

        if (!started) {
          lottieEl.classList.remove('lottie--center', 'lottie--bottom-center')
        }
      }

      rafId.current = requestAnimationFrame(updateScale)
    }

    rafId.current = requestAnimationFrame(updateScale)

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [lenis])

  return (
    <div ref={containerRef} className="anim-screen">
      <div className="red-screen-wrap" data-hide-hero="">
        <div
          ref={redScreenRef}
          className="red-screen"
          data-hide-hero=""
          style={{ transform: 'scale(0.0056, 0)' }}
        />
      </div>

        <div
          className="clip-slide side-overlay n1"
        ref={clip1Ref}
          data-hide-hero=""
          style={{ willChange: 'auto', clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)' }}
        >
          <img
            ref={img1Ref}
            className="inner-img"
            role="presentation"
            src="https://i.pinimg.com/1200x/8b/2b/19/8b2b19a00d8f1501ac5b78f883db24c0.jpg"
            style={{ willChange: 'auto', transform: 'scale(1, 1)' }}
          />
        </div>

        <div
          className="clip-slide side-overlay n2"
        ref={clip2Ref}
          data-hide-hero=""
          style={{ willChange: 'auto', clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)' }}
        >
          <img
            ref={img2Ref}
            className="inner-img"
            role="presentation"
            src="https://i.pinimg.com/736x/94/ef/94/94ef9456e5c7759fd6409dec82d3caf9.jpg"
            style={{ willChange: 'auto', transform: 'scale(1, 1)' }}
          />
        </div>

        <div
          className="clip-slide side-overlay n3"
        ref={clip3Ref}
          data-hide-hero=""
          style={{ willChange: 'auto', clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)' }}
        >
          <img
            ref={img3Ref}
            className="inner-img"
            role="presentation"
            src="https://i.pinimg.com/736x/6d/f4/e3/6df4e37273addf107f8cb418ffebad43.jpg"
            style={{ willChange: 'auto', transform: 'scale(1, 1)' }}
          />
        </div>

        <div
          ref={scaleSlideRef}
          className="scale-slide side-overlay"
          data-hide-hero=""
          style={{ 
            willChange: 'auto', 
            clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)'
          }}
        >
          <div
            className="scale-slide-left"
            style={{ willChange: 'auto', transform: 'translate(0px, 0px)' }}
          >
            <h2 className="scale-title h1">
              We create camping experiences that evoke emotions. We give a new sense of adventure
            </h2>
            <p className="scale-description l1">
              exclusive camping adventure company specializing in&nbsp;luxury outdoor experiences and wilderness expeditions. seamlessly connecting adventurers with nature
            </p>
          </div>
        </div>
    </div>
  )
}

export default AnimScreen


