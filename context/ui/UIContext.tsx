import { createContext } from 'react'

export interface UIContextProps {
  isMenuOpen: boolean

  // Methods
  toggleMenu: () => void
}

export const UIContext = createContext({} as UIContextProps)
