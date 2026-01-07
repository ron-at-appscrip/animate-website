import { createContext, useContext } from 'react'
import Lenis from 'lenis'

interface LenisContextType {
  lenis: Lenis | null
}

export const LenisContext = createContext<LenisContextType>({ lenis: null })

export const useLenis = () => {
  const context = useContext(LenisContext)
  return context.lenis
}

