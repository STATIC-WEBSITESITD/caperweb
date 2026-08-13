import { Link } from 'react-router-dom'
import { industriesLinks, quickLinks, socialLinks, servicesLinks, whatsappDisplay, whatsappNumber } from '../../data/navigation'
import { logo } from '../../utils/asset'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 width-23 mb-30">
              <div className="mb-20">
                <img src={logo} width={200} alt="Caper" />
              </div>
              <ul className="menu-footer">
                <li>
                  <span className="font-md color-grey-700">
                    Caper India delivers end-to-end logistics solutions across courier, warehousing, cold
                    chain, freight forwarding, and specialized industry services. With over 33 years of
                    experience and 125+ offices nationwide, we combine infrastructure, technology, and
                    expertise to keep your supply chain moving efficiently.
                  </span>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 width-16 mb-30">
              <h5 className="mb-10 color-brand-1">Quick Links</h5>
              <ul className="menu-footer">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-3 width-16 mb-30">
              <h5 className="mb-10 color-brand-1">Services</h5>
              <ul className="menu-footer">
                {servicesLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-3 width-16 mb-30">
              <h5 className="mb-10 color-brand-1">Industries</h5>
              <ul className="menu-footer">
                {industriesLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-3 width-16 mb-30">
              <h5 className="mb-10 color-brand-1">Contact Us</h5>
              <ul className="menu-footer">
                <li>
                  <a
                    className="d-flex align-items-start"
                    href="https://maps.app.goo.gl/dTLDGC979vy3hEjb7"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i
                      className="fa-solid fa-location-dot icon-16 mr-10 color-brand-1 flex-shrink-0 mt-5"
                      aria-hidden="true"
                    />
                    Ascot Center, 301, Sahar Rd, next to Hilton Hotel, Ashok Nagar, Andheri East,
                    Mumbai, Maharashtra 400099
                  </a>
                </li>
                <li>
                  <a href="mailto:info@caperindia.com">
                    <i className="fa-solid fa-envelope icon-16 mr-10 color-brand-1" aria-hidden="true" />
                    info@caperindia.com
                  </a>
                </li>
                <li>
                  <a href="tel:022-62763444">
                    <i className="fa-solid fa-phone icon-16 mr-10 color-brand-1" aria-hidden="true" />
                    022-62763444
                  </a>
                </li>
                <li>
                  <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-whatsapp icon-16 mr-10 color-brand-1" aria-hidden="true" />
                    {whatsappDisplay}
                  </a>
                </li>
              </ul>
              <div className="footer-socials">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    className={`footer-socials__link footer-socials__link--${social.label.toLowerCase()}`}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <i className={`fa-brands ${social.icon}`} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-2">
        <div className="container">
          <div className="footer-bottom">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12 text-center text-lg-start">
                <span className="color-grey-300 font-md">© 2026 Caper India. All rights reserved.</span>
              </div>
              <div className="col-lg-6 col-md-12 text-center text-lg-end">
                <span className="color-grey-300 font-md">
                  Powered by{' '}
                  <a href="https://itdgrowthlabs.com/" target="_blank" rel="noreferrer">
                    ITD GrowthLabs
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
