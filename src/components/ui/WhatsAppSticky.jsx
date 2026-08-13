import { whatsappNumber } from '../../data/navigation'

export default function WhatsAppSticky() {
  return (
    <a
      className="whatsapp-sticky"
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <i className="fa-brands fa-whatsapp" aria-hidden="true" />
    </a>
  )
}
