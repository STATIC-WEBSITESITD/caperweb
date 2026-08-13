import { Outlet } from 'react-router-dom'
import { useAos } from '../../hooks/useAos'
import { useSiteEffects } from '../../hooks/useSiteEffects'
import MapSection from '../ui/MapSection'
import WhatsAppSticky from '../ui/WhatsAppSticky'
import Footer from './Footer'
import Header from './Header'
import Preloader from './Preloader'
export default function Layout() {
  useSiteEffects()
  useAos()

  return (
    <>
      <Preloader />
      <Header />
      <main className="main">
        <Outlet />
        <MapSection />
      </main>
      <Footer />
      <WhatsAppSticky />
    </>
  )
}
