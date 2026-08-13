export const serviceVideos = {
  'cold-chain': {
    videoId: '1205730924',
    title: 'Cold Chain - Caper India',
  },
  'freight-forwarding': {
    videoId: '1205730923',
    title: 'Freight Forwarding - Caper India',
  },
  'lubricant-logistics': {
    videoId: '1205730912',
    title: 'Lubricant Logistics - Caper India',
  },
  'atm-movement': {
    videoId: '1205730903',
    title: 'ATM Movement - Caper India',
  },
  'procurement': {
    videoId: '1205730873',
    title: 'Procurement - Caper India',
  },
  'vendor-management': {
    videoId: '1205730872',
    title: 'Vendor Management - Caper India',
  },
  'warehousing': {
    videoId: '1205730874',
    title: 'Warehousing - Caper India',
  },
  'reverse-logistics': {
    videoId: '1205730912',
    title: 'Reverse Logistics - Caper India',
  },
  'courier-services': {
    videoId: '1205730874',
    title: 'Courier Services - Caper India',
  },
}

export function getServiceVideo(slug) {
  return serviceVideos[slug] ?? null
}
