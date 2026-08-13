import extracted from './extracted.json'
import { industriesLinks, serviceSlugs, servicesLinks } from './navigation'
import { getServiceVideo } from './serviceVideos'

const PAGE_LABELS = Object.fromEntries(
  [...servicesLinks, ...industriesLinks].map(({ label, path }) => [
    path.replace(/^\//, ''),
    label,
  ]),
)

const SERVICE_SLUGS = serviceSlugs

const INDUSTRY_SLUGS = [
  'bfsi-industry',
  'pharma',
  'alcobev-industry',
  'fmcg-industry',
  'oil-gas-industry',
]

const BLOG_SLUGS = [
  'how-end-to-end-logistics-services-improve-supply-chain-efficiency',
  'choosing-the-right-courier-service-for-your-business-a-complete-guide',
  'the-role-of-warehousing-in-efficient-inventory-management',
  'why-cold-chain-logistics-is-essential-for-pharma-and-food-industries',
  'freight-forwarding-vs-traditional-shipping-whats-the-difference',
  'atm-logistics-ensuring-safe-and-secure-cash-management',
  'how-vendor-management-improves-logistics-operations',
  'the-importance-of-lubricant-logistics-in-the-automotive-industry',
  'the-future-of-logistics-trends-shaping-the-industry-in-2025',
]

const BLOG_META = {
  'how-end-to-end-logistics-services-improve-supply-chain-efficiency': {
    category: 'Logistics',
    image: 'assets/images/end-to-end-logistics-supply-chain-efficiency.webp',
    date: '15 Jan 2026',
  },
  'choosing-the-right-courier-service-for-your-business-a-complete-guide': {
    category: 'Courier',
    image: 'assets/images/expert-team-for-tailored-courier-services-11zon.webp',
    date: '22 Jan 2026',
  },
  'the-role-of-warehousing-in-efficient-inventory-management': {
    category: 'Warehousing',
    image: 'assets/images/tailored-warehousing-for-optimized-inventory-11zon.webp',
    date: '5 Feb 2026',
  },
  'why-cold-chain-logistics-is-essential-for-pharma-and-food-industries': {
    category: 'Cold Chain',
    image: 'assets/images/simple-and-secure-cold-chain-shipping-from-beginning-to-finish-2-11zon.webp',
    date: '12 Feb 2026',
  },
  'freight-forwarding-vs-traditional-shipping-whats-the-difference': {
    category: 'Freight',
    image: 'assets/images/bulk-cargo-freight-solutions-specially-tailored-11zon.webp',
    date: '20 Feb 2026',
  },
  'atm-logistics-ensuring-safe-and-secure-cash-management': {
    category: 'ATM Movement',
    image: 'assets/images/secure-atm.webp',
    date: '3 Mar 2026',
  },
  'how-vendor-management-improves-logistics-operations': {
    category: 'Vendor Management',
    image: 'assets/images/a-data-driven-team-enhancing-vendor-partnerships-11zon.webp',
    date: '10 Mar 2026',
  },
  'the-importance-of-lubricant-logistics-in-the-automotive-industry': {
    category: 'Lubricant Logistics',
    image: 'assets/images/lubricant-sector-logistics-from-core-to-coast.webp',
    date: '18 Mar 2026',
  },
  'the-future-of-logistics-trends-shaping-the-industry-in-2025': {
    category: 'Logistics',
    image: 'assets/images/transforming-logistics-with-creative.webp',
    date: '25 Mar 2026',
  },
}

function cleanText(text) {
  if (!text) return ''
  return text.replace(/\s+/g, ' ').trim()
}

function shortBannerParagraph(text) {
  if (!text) return ''
  const firstBlock = text.split(/\n\n+/)[0]
  return cleanText(firstBlock)
}

function heroIntroParagraph(text) {
  if (!text) return ''
  const parts = text.split(/\n\n+/).map((part) => cleanText(part)).filter(Boolean)
  if (parts.length <= 1) return ''
  return parts.slice(1).join(' ')
}

function getPageLabel(slug) {
  return (
    PAGE_LABELS[slug] ||
    slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  )
}

function mapPage(slug) {
  const data = extracted[slug]
  if (!data) return null

  const section1Heading = data.headings?.[1]
  const section2Heading = data.headings?.[2]

  return {
    slug,
    meta: {
      title: data.meta.title,
      description: cleanText(data.meta.description),
      keywords: data.meta.keywords,
    },
    banner: {
      heading: getPageLabel(slug),
      paragraph:
        shortBannerParagraph(data.hero.paragraph) ||
        cleanText(data.meta.description),
    },
    hero: {
      heading: cleanText(data.hero.heading),
      paragraph: cleanText(data.hero.paragraph),
      introParagraph: heroIntroParagraph(data.hero.paragraph),
    },
    image: data.image,
    image2: data.image2 || null,
    image3: data.image3 || null,
    section1: {
      heading: cleanText(section1Heading),
      paragraph: cleanText(data.sectionParas?.[0] || ''),
      ticks: data.ticks[0] || [],
    },
    section2: {
      heading: cleanText(section2Heading),
      paragraph: cleanText(data.sectionParas?.[1] || ''),
      ticks: data.ticks[1] || [],
    },
    ...(data.sectionParas?.[2]
      ? {
          section3: {
            heading: cleanText(data.headings?.[3] || ''),
            paragraph: cleanText(data.sectionParas[2]),
            ticks: data.ticks[2] || [],
          },
        }
      : {}),
    faqs: data.faqs.map((f) => ({
      question: cleanText(f.question),
      answer: cleanText(f.answer),
      defaultOpen: f.defaultOpen,
    })),
    video: getServiceVideo(slug),
  }
}

export const services = Object.fromEntries(
  SERVICE_SLUGS.map((slug) => [slug, mapPage(slug)]),
)

export const serviceList = SERVICE_SLUGS.map((slug) => services[slug])

export const industries = Object.fromEntries(
  INDUSTRY_SLUGS.map((slug) => [slug, mapPage(slug)]),
)

export const blogs = BLOG_SLUGS.map((slug) => {
  const data = extracted[slug]
  const meta = BLOG_META[slug]
  return {
    slug,
    meta: data.meta,
    hero: {
      heading: cleanText(data.hero.heading),
      paragraph: cleanText(data.hero.paragraph),
    },
    category: meta.category,
    date: meta.date,
    image: meta.image,
    excerpt: cleanText(data.hero.paragraph),
  }
})

export function getBlog(slug) {
  return blogs.find((b) => b.slug === slug)
}

export function getService(slug) {
  return services[slug]
}

export function getIndustry(slug) {
  return industries[slug]
}

export function getPageMeta(slug) {
  if (slug === 'careers') {
    return {
      title: 'Careers | Caper India',
      description: 'Join our team at Caper India. Build your career in logistics, supply chain, and operations.',
      keywords: 'careers, jobs, logistics jobs, Caper India',
    }
  }
  const data = extracted[slug]
  if (!data?.meta) return {}

  return {
    title: data.meta.title,
    description: cleanText(data.meta.description),
    keywords: data.meta.keywords,
  }
}

export { extracted as aboutData }
