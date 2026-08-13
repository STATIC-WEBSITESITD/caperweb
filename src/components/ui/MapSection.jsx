import { aos } from '../../utils/aos'
import { logo } from '../../utils/asset'
import { whatsappDisplay, whatsappNumber } from '../../data/navigation'

const MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.0631412254374!2d72.86866817395187!3d19.10488575106749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9e884044d6b%3A0x8a6a9c5f97e99457!2sCaper%20India%20Private%20Limited!5e0!3m2!1sen!2sin!4v1739259354547!5m2!1sen!2sin'

export default function MapSection() {
  return (
    <section className="section pt-100" {...aos('fade-up')}>
      <div className="container-fluid px-0">
        <div className="row g-0 align-items-stretch">
          <div className="col-lg-10 col-md-8 col-sm-6" {...aos('fade-right')}>
            <iframe src={MAP_EMBED} height="420" style={{ border: 0 }} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" title="Caper India location" {...aos('fade-right')} />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 box-shadow-1" {...aos('fade-left', 150)}>
            <div className="p-30 d-flex flex-column justify-content-between h-100">
              <img className="mb-25" src={logo} alt="Caper" {...aos('zoom-in')} />
              <p className="color-grey-700 mb-25">
                Ascot Center, 301, Sahar Rd, next to Hilton Hotel, Ashok Nagar, Andheri East, Mumbai,
                Maharashtra 400099
              </p>
              <p className="color-grey-700 mb-10">
                <i className="fa-solid fa-phone icon-16 mr-10 color-brand-1" aria-hidden="true" />
                Phone: 022-62763444
              </p>
              <p className="color-grey-700 mb-10">
                <i className="fa-brands fa-whatsapp icon-16 mr-10 color-brand-1" aria-hidden="true" />
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                  WhatsApp: {whatsappDisplay}
                </a>
              </p>
              <p className="color-grey-700 mb-30">
                <i className="fa-solid fa-envelope icon-16 mr-10 color-brand-1" aria-hidden="true" />
                Email: info@caperindia.com
              </p>
              <div className="line-border mb-25" />
              <p className="color-grey-700 font-md-bold">Hours: 8:00 - 17:00, Mon - Sat</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
