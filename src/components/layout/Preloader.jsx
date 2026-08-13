import { useEffect, useState } from 'react'

export default function Preloader() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 400)
    return () => clearTimeout(timer)
  }, [])

  if (hidden) return null

  return (
    <div id="preloader-active">
      <div className="preloader d-flex align-items-center justify-content-center">
        <div className="preloader-inner position-relative">
          <div className="flip-square" />
        </div>
      </div>
    </div>
  )
}
