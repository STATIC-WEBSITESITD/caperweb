import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { aos } from '../../utils/aos'
import { asset } from '../../utils/asset'
import 'swiper/css'
import 'swiper/css/navigation'

const PRIMARY = '#DC2626'
const SECONDARY = '#1F3C45'

function SwiperArrowIcon({ direction }) {
  if (direction === 'prev') {
    return (
      <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path
          d="M7.5 2.5 3.5 6l4 3.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return (
    <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="m4.5 2.5 4 3.5-4 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function NavButton({ btnRef, direction, label }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      ref={btnRef}
      type="button"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'absolute',
        [direction === 'prev' ? 'left' : 'right']: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 10,
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: hovered ? PRIMARY : SECONDARY,
        color: '#fff',
        transition: 'background 0.25s ease',
        flexShrink: 0,
      }}
    >
      <SwiperArrowIcon direction={direction} />
    </button>
  )
}

const slides = [
  {
    image: 'images/expertise-heavy-equipment-atm-transport.webp',
    title: 'Heavy Equipment',
    text: 'Large, bulky machinery and automated teller machines requiring secure and careful transportation.',
    link: '/atm-movement',
  },
  {
    image: 'images/sensitive-electronic-items.webp',
    title: 'Sensitive Electronic Items',
    text: 'High-value electronic devices like laptops and computers that need protective packaging to prevent damage.',
    link: '/courier-services',
  },
  {
    image: 'images/lubricant-sector-logistics-from-core-to-coast.webp',
    title: 'Lubricant Materials',
    text: 'Industrial oils, greases, drums, and cans transported with secure handling, bulk packaging, and compliant delivery across sectors.',
    link: '/lubricant-logistics',
  },
  {
    image: 'images/fragile-material.webp',
    title: 'Fragile Material',
    text: 'Point-of-sale materials like gift items, brochures, and promotional danglers used for marketing and retail displays.',
    link: '/warehousing',
  },
  {
    image: 'images/temperature-controlled-shipment-services-with-smart-insights-11zon.webp',
    title: 'Temperature-Controlled Logistics',
    text: 'Cold chain solutions for pharmaceuticals, APIs, and temperature-sensitive goods with real-time monitoring from pickup to delivery.',
    link: '/cold-chain',
  },
]

export default function ExpertiseSwiper() {
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const [swiperInstance, setSwiperInstance] = useState(null)

  useEffect(() => {
    if (!swiperInstance || !prevRef.current || !nextRef.current) return

    swiperInstance.params.navigation.prevEl = prevRef.current
    swiperInstance.params.navigation.nextEl = nextRef.current

    if (swiperInstance.navigation.initialized) {
      swiperInstance.navigation.destroy()
    }
    swiperInstance.navigation.init()
    swiperInstance.navigation.update()
  }, [swiperInstance])

  return (
    <div {...aos('fade-up')} style={{ position: 'relative', padding: '0 56px' }}>
      <Swiper
        className="swiper-group-4"
        modules={[Navigation, Autoplay]}
        spaceBetween={16}
        slidesPerView={1}
        rewind
        onSwiper={setSwiperInstance}
        autoplay={{ delay: 10000, disableOnInteraction: false }}
        breakpoints={{
          768: { spaceBetween: 24, slidesPerView: 2 },
          992: { spaceBetween: 30, slidesPerView: 3 },
          1200: { slidesPerView: 3 },
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div className="cardGrid">
              <div className="cardImage">
                <img src={asset(slide.image)} alt={slide.title} />
              </div>
              <div className="cardInfo">
                <h5 className="color-grey-600 mb-10">{slide.title}</h5>
                <p className="font-xs color-grey-500">{slide.text}</p>
                <div className="box-button mt-30">
                  <Link className="btn btn-link font-sm color-brand-2" to={slide.link}>
                    View Details
                    <span>
                      <i className="fa-solid fa-arrow-right w-6 h-6 icon-16" aria-hidden="true" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <NavButton btnRef={prevRef} direction="prev" label="Previous slide" />
      <NavButton btnRef={nextRef} direction="next" label="Next slide" />
    </div>
  )
}
