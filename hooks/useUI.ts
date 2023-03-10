import { useContext } from 'react'
import { UiContext } from '../context'

export const useUI = () => {
  const context = useContext(UiContext)
  return context
}
