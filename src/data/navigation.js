export const servicesLinks = [
  { label: 'Cold Chain Delivery', path: '/cold-chain' },
  { label: 'Freight Forwarding', path: '/freight-forwarding' },
  { label: 'Lubricant Logistics', path: '/lubricant-logistics' },
  { label: 'ATM Movements', path: '/atm-movement' },
  { label: 'Procurement', path: '/procurement' },
  { label: 'Vendor Management', path: '/vendor-management' },
  { label: 'Warehousing', path: '/warehousing' },
  { label: 'Reverse Logistics', path: '/reverse-logistics' },
  { label: 'Courier', path: '/courier-services' },
]

export const serviceSlugs = servicesLinks.map(({ path }) => path.replace(/^\//, ''))

export const industriesLinks = [
  { label: 'BFSI', path: '/bfsi-industry' },
  { label: 'Pharma', path: '/pharma' },
  { label: 'AlcoBev', path: '/alcobev-industry' },
  { label: 'FMCG', path: '/fmcg-industry' },
  { label: 'Oil & Gas Industry', path: '/oil-gas-industry' },
]

export const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Tracking', path: '/tracking' },
  { label: 'Careers', path: '/careers' },
  { label: 'Blogs', path: '/blogs' },
  { label: 'Contact Us', path: '/contact' },
]

/** Digits only with country code — used for wa.me links */
export const whatsappNumber = '917208447354'
export const whatsappDisplay = '+91 72084 47354'

export const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/caperindiapvtltd?igsh=MTNqb3gweGY1eWNuNQ%3D%3D&utm_source=qr',
    icon: 'fa-instagram',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/caper-logistics-&-warehousing-pvt-ltd/',
    icon: 'fa-linkedin-in',
  },
]
