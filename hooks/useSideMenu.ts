import { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth, useUI } from '.'

export const useSideMenu = () => {
  const router = useRouter()
  const { isMenuOpen, toggleSideMenu } = useUI()
  const { user, isLoggedIn, logout } = useAuth()

  const [searchTerm, setSearchTerm] = useState('')

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return
    navigateTo(`/search/${searchTerm}`)
  }

  const navigateTo = (url: string) => {
    toggleSideMenu()
    router.push(url)
  }
  return {
    // UI/UX
    router,
    isMenuOpen,
    toggleSideMenu,
    onSearchTerm,
    navigateTo,
    searchTerm,
    setSearchTerm,
    
    // Auth
    user,
    isLoggedIn,
    logout
  }
}
