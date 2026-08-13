import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { resetVideoCoordinator } from '../utils/videoCoordinator'

export function useSiteEffects() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    return () => {
      resetVideoCoordinator()
    }
  }, [location.pathname])

  useEffect(() => {
    const header = document.querySelector('.sticky-bar')
    if (!header) return undefined

    const onScroll = () => {
      if (window.scrollY < 200) {
        header.classList.remove('stick')
      } else {
        header.classList.add('stick')
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

}
