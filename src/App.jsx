import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import About from './pages/About'
import BlogDetail from './pages/BlogDetail'
import Blogs from './pages/Blogs'
import Contact from './pages/Contact'
import Tracking from './pages/Tracking'
import Careers from './pages/Careers'
import Home from './pages/Home'
import ServicePage from './pages/ServicePage'
import { serviceSlugs } from './data/navigation'

const serviceRoutes = serviceSlugs

const industryRoutes = [
  'bfsi-industry',
  'pharma',
  'alcobev-industry',
  'fmcg-industry',
  'oil-gas-industry',
]

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="tracking" element={<Tracking />} />
          <Route path="careers" element={<Careers />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blogs/:slug" element={<BlogDetail />} />
          {serviceRoutes.map((slug) => (
            <Route key={slug} path={slug} element={<ServicePage type="service" />} />
          ))}
          {industryRoutes.map((slug) => (
            <Route key={slug} path={slug} element={<ServicePage type="industry" />} />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
