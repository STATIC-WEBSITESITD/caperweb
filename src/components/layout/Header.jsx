import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { industriesLinks, servicesLinks, whatsappDisplay, whatsappNumber } from '../../data/navigation'
import { logo } from '../../utils/asset'

function navClass({ isActive }) {
  return isActive ? 'active' : undefined
}

function isPathActive(pathname, path) {
  if (path === '/') return pathname === '/'
  return pathname === path || pathname.startsWith(`${path}/`)
}

function isGroupActive(pathname, links) {
  return links.some((link) => isPathActive(pathname, link.path))
}

export default function Header() {
  const location = useLocation()
  const pathname = location.pathname
  const servicesActive = isGroupActive(pathname, servicesLinks)
  const industriesActive = isGroupActive(pathname, industriesLinks)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState(null)

  const closeMobile = () => {
    setMobileOpen(false)
    setOpenMenu(null)
  }

  const toggleMobile = () => setMobileOpen((prev) => !prev)

  useEffect(() => {
    document.body.classList.toggle('mobile-menu-active', mobileOpen)
    return () => document.body.classList.remove('mobile-menu-active')
  }, [mobileOpen])

  const toggleSubmenu = (key) => {
    setOpenMenu((prev) => (prev === key ? null : key))
  }

  return (
    <>
      <div className="box-bar bg-grey-900">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 col-md-8 col-sm-5 col-4">
              <a className="phone-icon mr-45" href="tel:022-62763444">
                <i className="fa-solid fa-phone" aria-hidden="true" />
                022-62763444
              </a>
              <a className="email-icon" href="mailto:info@caperindia.com">
                <i className="fa-solid fa-envelope" aria-hidden="true" />
                info@caperindia.com
              </a>
            </div>
            <div className="col-lg-5 col-md-4 col-sm-7 col-8 text-end">
              <a
                className="whatsapp-icon"
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-whatsapp" aria-hidden="true" />
                {whatsappDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>

      <header className="header sticky-bar">
        <div className="container">
          <div className="main-header">
            <div className="header-left">
              <div className="header-logo">
                <Link className="d-flex" to="/">
                  <img alt="Caper" src={logo} />
                </Link>
              </div>
              <div className="header-nav">
                <nav className="nav-main-menu d-none d-xl-block">
                  <ul className="main-menu">
                    <li>
                      <NavLink to="/" className={navClass} end>
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/about" className={navClass}>
                        About Us
                      </NavLink>
                    </li>
                    <li className={`has-children${servicesActive ? ' active' : ''}`}>
                      <span className={`menu-parent-label${servicesActive ? ' active' : ''}`}>
                        Services
                      </span>
                      <ul className="sub-menu">
                        {servicesLinks.map((link) => (
                          <li key={link.path}>
                            <NavLink to={link.path} className={navClass}>
                              {link.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className={`has-children${industriesActive ? ' active' : ''}`}>
                      <span className={`menu-parent-label${industriesActive ? ' active' : ''}`}>
                        Industries
                      </span>
                      <ul className="sub-menu">
                        {industriesLinks.map((link) => (
                          <li key={link.path}>
                            <NavLink to={link.path} className={navClass}>
                              {link.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li>
                      <NavLink to="/blogs" className={navClass}>
                        Blogs
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/careers" className={navClass}>
                        Careers
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/contact" className={navClass}>
                        Contact Us
                      </NavLink>
                    </li>
                  </ul>
                </nav>
                <button
                  type="button"
                  className={`burger-icon burger-icon-white${mobileOpen ? ' burger-close' : ''}`}
                  aria-label="Toggle menu"
                  onClick={toggleMobile}
                >
                  <span className="burger-icon-top" />
                  <span className="burger-icon-mid" />
                  <span className="burger-icon-bottom" />
                </button>
              </div>
              <div className="header-right">
                <div className="d-none d-sm-inline-block">
                  <Link
                    className="btn btn-brand-1-big hover-up d-none d-xl-inline-block"
                    to="/tracking"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    Track Your Shipment
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div
          className="body-overlay-1"
          role="presentation"
          onClick={closeMobile}
          onKeyDown={() => {}}
        />
      )}

      <div
        className={`mobile-header-active mobile-header-wrapper-style perfect-scrollbar${
          mobileOpen ? ' sidebar-visible' : ''
        }`}
      >
        <div className="mobile-header-wrapper-inner">
          <div className="mobile-header-content-area">
            <div className="mobile-logo">
              <Link className="btn btn-brand-1-big hover-up" to="/tracking" onClick={closeMobile} style={{ whiteSpace: 'nowrap' }}>
                Track Your Shipment
              </Link>
            </div>
            <button
              type="button"
              className={`burger-icon${mobileOpen ? ' burger-close' : ''}`}
              aria-label="Close menu"
              onClick={toggleMobile}
            >
              <span className="burger-icon-top" />
              <span className="burger-icon-mid" />
              <span className="burger-icon-bottom" />
            </button>
            <div className="perfect-scroll">
              <div className="mobile-menu-wrap mobile-header-border">
                <nav className="mt-15">
                  <ul className="mobile-menu font-heading">
                    <li>
                      <NavLink to="/" className={navClass} end onClick={closeMobile}>
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/about" className={navClass} onClick={closeMobile}>
                        About Us
                      </NavLink>
                    </li>
                    <li
                      className={`has-children${openMenu === 'services' || servicesActive ? ' active' : ''}`}
                    >
                      <span
                        className="menu-expand"
                        role="button"
                        tabIndex={0}
                        onClick={() => toggleSubmenu('services')}
                        onKeyDown={(e) => e.key === 'Enter' && toggleSubmenu('services')}
                      >
                        <i className="fa-solid fa-chevron-down icon-16" aria-hidden="true" />
                      </span>
                      <span
                        className={`menu-parent-label${servicesActive ? ' active' : ''}`}
                        role="button"
                        tabIndex={0}
                        onClick={() => toggleSubmenu('services')}
                        onKeyDown={(e) => e.key === 'Enter' && toggleSubmenu('services')}
                        style={{ cursor: 'pointer' }}
                      >
                        Services
                      </span>
                      <ul
                        className="sub-menu"
                        style={{ display: openMenu === 'services' ? 'block' : 'none' }}
                      >
                        {servicesLinks.map((link) => (
                          <li key={link.path}>
                            <NavLink to={link.path} className={navClass} onClick={closeMobile}>
                              {link.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li
                      className={`has-children${openMenu === 'industries' || industriesActive ? ' active' : ''}`}
                    >
                      <span
                        className="menu-expand"
                        role="button"
                        tabIndex={0}
                        onClick={() => toggleSubmenu('industries')}
                        onKeyDown={(e) => e.key === 'Enter' && toggleSubmenu('industries')}
                      >
                        <i className="fa-solid fa-chevron-down icon-16" aria-hidden="true" />
                      </span>
                      <span
                        className={`menu-parent-label${industriesActive ? ' active' : ''}`}
                        role="button"
                        tabIndex={0}
                        onClick={() => toggleSubmenu('industries')}
                        onKeyDown={(e) => e.key === 'Enter' && toggleSubmenu('industries')}
                        style={{ cursor: 'pointer' }}
                      >
                        Industries
                      </span>
                      <ul
                        className="sub-menu"
                        style={{ display: openMenu === 'industries' ? 'block' : 'none' }}
                      >
                        {industriesLinks.map((link) => (
                          <li key={link.path}>
                            <NavLink to={link.path} className={navClass} onClick={closeMobile}>
                              {link.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li>
                      <NavLink to="/blogs" className={navClass} onClick={closeMobile}>
                        Blogs
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/careers" className={navClass} onClick={closeMobile}>
                        Careers
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/contact" className={navClass} onClick={closeMobile}>
                        Contact Us
                      </NavLink>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="site-copyright color-grey-400 mt-0">
                <div className="mb-0">
                  <span className="font-xs color-grey-500">© Caper India 2026. All rights reserved.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
