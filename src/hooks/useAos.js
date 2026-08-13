import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import AOS from 'aos'

export function useAos() {
  const { pathname } = useLocation()

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
      mirror: false,
    })

    return () => {}
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => AOS.refresh(), 100)
    return () => clearTimeout(timer)
  }, [pathname])
}
