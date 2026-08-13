import { useEffect, useRef, useState } from 'react'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { aos } from '../../utils/aos'
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

const services = [
  {
    icon: 'fa-snowflake',
    title: 'Cold Chain Delivery',
    text: 'Experts in providing fast and reliable pick-up and delivery services for temperature-controlled cargo across India.',
  },
  {
    icon: 'fa-plane',
    title: 'Freight Forwarding',
    text: 'Complete air and sea freight services with flexible options, global partnerships, and end-to-end cargo management.',
  },
  {
    icon: 'fa-droplet',
    title: 'Lubricant Logistics',
    text: 'Reliable and tailored lubricant logistics services, including safe transport, secure storage, and timely delivery.',
  },
  {
    icon: 'fa-building-columns',
    title: 'ATM Movements',
    text: 'End-to-end ATM movement with secure transport from manufacturer to site, including installation and seamless relocation.',
  },
  {
    icon: 'fa-cart-shopping',
    title: 'Procurement',
    text: 'Strategic sourcing and cost-effective procurement services to enhance efficiency across your operations.',
  },
  {
    icon: 'fa-handshake',
    title: 'Vendor Management',
    text: 'Streamline vendor management to reduce costs, improve performance, and build stronger supplier relationships.',
  },
  {
    icon: 'fa-warehouse',
    title: 'Warehousing',
    text: 'Efficient warehousing with smart inventory management and reliable storage across India.',
  },
  {
    icon: 'fa-rotate-left',
    title: 'Reverse Logistics',
    text: 'Simplify returns and maximize value with smooth returns, recovery, and responsible redistribution.',
  },
  {
    icon: 'fa-ship',
    title: 'Courier Services',
    text: "On-time delivery isn't easy. We've developed it over years of experience, expertise, and dedication to perfection.",
  },
]

export default function ServicesSwiper() {
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
        {services.map((item) => (
          <SwiperSlide key={item.title}>
            <div className="card-offer hover-up">
              <div className="card-image">
                <i className={`fa-solid ${item.icon} fa-theme-icon`} aria-hidden="true" />
              </div>
              <div className="card-info">
                <h5 className="color-grey-600 mb-15">{item.title}</h5>
                <p className="font-sm color-grey-900 mb-35">{item.text}</p>
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
