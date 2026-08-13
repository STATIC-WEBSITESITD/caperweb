import { Link } from 'react-router-dom'
import ContactForm from '../components/ui/ContactForm'
import HeroVideo from '../components/ui/HeroVideo'
import ExpertiseSwiper from '../components/ui/ExpertiseSwiper'
import ServicesSwiper from '../components/ui/ServicesSwiper'
import FAQ from '../components/ui/FAQ'
import TickList from '../components/ui/TickList'
import extracted from '../data/extracted.json'
import { blogs, getPageMeta } from '../data/pages'
import { usePageMeta } from '../hooks/usePageMeta'
import { aos, aosStagger } from '../utils/aos'
import { asset, favicon } from '../utils/asset'

const meta = getPageMeta('index')

const homeFaqs = [
  {
    question: 'Do you offer international courier services?',
    answer:
      'Yes, Caper provides international courier services with a focus on timely and secure deliveries across the globe, ensuring your shipments reach their destination without delay.',
    defaultOpen: true,
  },
  {
    question: "Are Caper's logistics services customizable?",
    answer:
      "Yes, our logistics services are fully customizable. We provide tailored services to meet specific business needs, whether it's for courier, warehousing, or cold chain.",
  },
  {
    question: 'How do I make a payment for services?',
    answer:
      "Payments for Caper's services can be made online via secure payment gateways or through our dedicated account management team for larger shipments.",
  },
  {
    question: 'How do I cancel or reschedule a pick-up?',
    answer:
      "You can easily cancel or reschedule a pick-up by contacting our customer support team. We'll make the necessary changes to accommodate your needs.",
  },
  {
    question: 'Can I schedule a recurring pick-up or delivery?',
    answer:
      'Yes, Caper offers recurring pick-up and delivery services for businesses with regular logistics needs. Contact us to set up a tailored schedule that fits your requirements.',
  },
]

const logisticsTicks = [
  'Tailored logistics services',
  '125+ offices across India',
  'Real-time tracking via IWMS',
  'Safe, reliable handling',
  'On-time, efficient deliveries',
  'Systems customized to your needs',
]

const needsTicks = [
  'Express courier deliveries',
  'Advanced warehousing facilities',
  'Temperature-controlled cold chain',
  'Efficient nationwide distribution',
  'Freight forwarding expertise',
  'Customized supply chain planning',
]

export default function Home() {
  usePageMeta(meta)

  return (
    <>
      <HeroVideo videoId="1205730875" title="Caper India" />

      <section className="section pt-100" {...aos('fade-up')}>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-8" {...aos('fade-up', 100)}>
              <div className="text-center">
                <img className="mx-auto mb-15" src={favicon} alt="Caper" {...aos('zoom-in')} />
                <h2 className="color-grey-600 mb-20" {...aos('fade-up', 100)}>
                  Behind Every Successful Business Is a Smart Supply Chain That Works
                </h2>
                <p className="font-md color-grey-700" {...aos('fade-up', 200)}>
                  Every product has a destination. But what really matters is the journey in between.
                  <br /><br />
                  At Caper, we make that journey simple and stress-free.<br /><br />
                  From warehousing and transport to courier and cold chain, we handle the full supply chain
                  with speed, care, and reliability. With smart systems and clear visibility, we help businesses
                  move faster and worry less. You build your business. Caper keeps it moving.
                </p>
              </div>
              <div className="box-button mt-30 text-center">
                <Link className="btn btn-brand-1-big hover-up" to="/contact" {...aos('fade-up', 300)}>
                  Let&apos;s Connect
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section pt-100" {...aos('fade-up')}>
        <div className="container">
          <div className="text-center mb-30">
            <img className="mx-auto mb-15" src={favicon} alt="Caper" {...aos('zoom-in')} />
            <h2 className="color-grey-600 mb-20" {...aos('fade-up', 100)}>
              How We Help Businesses Move Forward
            </h2>
            <p className="font-md color-grey-700" {...aos('fade-up', 200)}>
              Intelligent logistics services tailored to your business, combining efficiency, precision, and
              reliability to keep your supply chain moving seamlessly.
            </p>
          </div>
          <div className="mt-50 box-background-offer">
            <ServicesSwiper />
          </div>
        </div>
      </section>

      <section className="section pt-100" {...aos('fade-up')}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6 mb-30" {...aos('fade-right')}>
              <img
                className="img-main"
                src={asset(extracted.index.image)}
                alt="Caper Logistics Services"
              />
            </div>
            <div className="col-xl-6 col-lg-6 mb-30" {...aos('fade-left', 150)}>
              <div className="box-info-pround">
                <div className="text-left">
                  <img className="mb-15" src={favicon} alt="Caper" />
                  <h2 className="color-grey-600 mb-20">We Deliver a Full Range of Logistics Services</h2>
                  <p className="font-md color-grey-700">
                    We offer smart logistics services pan-India and globally, combining infrastructure,
                    experience, and custom planning to keep your cargo moving efficiently.
                  </p>
                </div>
                <div className="mt-30">
                  <TickList items={logisticsTicks} />
                </div>
                <div className="mt-30">
                  <Link className="btn btn-brand-1-big hover-up" to="/about">
                    Explore More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section mt-100 pt-100 pb-100 bg-2 position-relative" {...aos('fade-up')}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6" {...aos('fade-right', 100)}>
              <div className="box-info-pround">
                <div className="text-left">
                  <img className="mb-15" src={favicon} alt="Caper" />
                  <h2 className="color-grey-600 mb-20">Logistics Services, Made for Your Needs</h2>
                  <p className="font-md color-grey-700">
                    We go beyond logistics. We offer swift and hassle-free express deliveries, advanced
                    warehousing, cold chain services, and efficient distribution—delivering fast,
                    reliable, and secure logistics tailored to your needs.
                  </p>
                </div>
                <div className="mt-30">
                  <TickList items={needsTicks} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="box-image-touch"
          style={{
            backgroundImage: `url(${asset('images/1-caper.jpg')})`,
          }}
        />
      </section>

      <section className="section pt-100" {...aos('fade-up')}>
        <div className="container">
          <div className="text-center mb-30">
            <img className="mx-auto mb-15" src={favicon} alt="Caper" {...aos('zoom-in')} />
            <h2 className="color-grey-600 mb-20" {...aos('fade-up', 100)}>
              Our Expertise
            </h2>
            <p className="font-md color-grey-700" {...aos('fade-up', 200)}>
              Proven expertise in delivering top-notch courier services with excellence
            </p>
          </div>
          <div className="mt-50">
            <ExpertiseSwiper />
          </div>
        </div>
      </section>

      <section className="section pt-100" {...aos('fade-up')}>
        <div className="container">
          <div className="text-center">
            <img className="mx-auto mb-15" src={favicon} alt="Caper" {...aos('zoom-in')} />
            <h2 className="color-grey-600 mb-20" {...aos('fade-up', 100)}>
              Our Blogs
            </h2>
            <p className="font-md color-grey-700" {...aos('fade-up', 200)}>
              Read our latest news and updates
            </p>
          </div>
          <div className="row mt-50">
            {blogs.slice(0, 3).map((post, index) => (
              <div key={post.slug} className="col-lg-4" {...aosStagger(index, 150)}>
                <div className="card-blog-grid hover-up">
                  <div className="card-image">
                    <Link to={`/blogs/${post.slug}`}>
                      <img src={asset(post.image)} alt="Caper Blog" />
                    </Link>
                    <Link className="btn btn-border-brand-1 mr-15" to={`/blogs/${post.slug}`}>
                      {post.category}
                    </Link>
                  </div>
                  <div className="card-info">
                    <Link to={`/blogs/${post.slug}`}>
                      <h5 className="color-grey-600">{post.hero.heading}</h5>
                    </Link>
                    <p className="font-sm color-grey-500 mt-20">{post.excerpt}</p>
                    <div className="line-border" />
                    <div className="mt-5 d-flex align-items-center justify-content-between pt-0">
                      <Link className="btn btn-link font-sm color-brand-2" to={`/blogs/${post.slug}`}>
                        View Details
                        <span>
                          <i className="fa-solid fa-arrow-right w-6 h-6 icon-16" aria-hidden="true" />
                        </span>
                      </Link>
                      <span className="date-post font-sm color-grey-700">{post.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-100" {...aos('fade-up')}>
        <div className="container">
          <div className="text-center">
            <img className="mx-auto mb-15" src={favicon} alt="Caper" {...aos('zoom-in')} />
            <h2 className="color-grey-600 mb-20" {...aos('fade-up', 100)}>
              Still Have Questions?
            </h2>
            <p className="font-md color-grey-700" {...aos('fade-up', 200)}>
              Can&apos;t find the answer you are looking for? Please reach out to our friendly team for
              assistance.
            </p>
          </div>
          <div className="row align-items-center justify-content-center mt-50">
            <div className="col-xl-12 col-lg-12">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <FAQ items={homeFaqs} />
    </>
  )
}
