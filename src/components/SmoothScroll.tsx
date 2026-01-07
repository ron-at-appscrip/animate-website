import { useEffect, useState, type ReactNode } from 'react'
import Lenis from 'lenis'
import { LenisContext } from '../contexts/LenisContext'

type Props = {
  children?: ReactNode
}

const SmoothScroll = ({ children }: Props) => {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    })

    setLenis(lenisInstance)

    // Ensure html gets lenis classes for visual confirmation and CSS hooks.
    // React dev StrictMode mounts/unmounts effects twice, so we keep a tiny global refcount.
    const htmlEl = document.documentElement
    const w = window as unknown as { __lenisMountCount?: number }
    w.__lenisMountCount = (w.__lenisMountCount ?? 0) + 1
    htmlEl.classList.add('lenis', 'lenis-smooth')

    function raf(time: number) {
      lenisInstance.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenisInstance.destroy()
      setLenis(null)
      w.__lenisMountCount = Math.max(0, (w.__lenisMountCount ?? 1) - 1)
      if (w.__lenisMountCount === 0) {
        htmlEl.classList.remove('lenis', 'lenis-smooth')
      }
    }
  }, [])

  return (
    <LenisContext.Provider value={{ lenis }}>
      {children}
    </LenisContext.Provider>
  )
}

export default SmoothScroll


