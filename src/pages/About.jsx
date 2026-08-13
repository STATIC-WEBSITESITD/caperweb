import { useState } from 'react'
import FAQ from '../components/ui/FAQ'
import PageBanner from '../components/ui/PageBanner'
import { aboutData, getPageMeta } from '../data/pages'
import { usePageMeta } from '../hooks/usePageMeta'
import { aos, aosStagger } from '../utils/aos'
import { asset, favicon } from '../utils/asset'

const milestones = [
  {
    icon: 'fa-warehouse',
    title: '1993 Launched Caper India',
    text: 'Core warehousing, logistics, and allied services established.',
  },
  {
    icon: 'fa-money-bill-transfer',
    title: '2012 ATM logistics',
    text: 'ATM delivery, relocation, and storage services introduced.',
  },
  {
    icon: 'fa-snowflake',
    title: '2014 Pharma & cold chain',
    text: 'Pharmaceutical and life science clients and cold chain supply management.',
  },
  {
    icon: 'fa-handshake',
    title: '2017 Vendor management',
    text: (
      <>
        Vendor Management Module for <strong>AlcoBev</strong> companies driving cost optimization.
      </>
    ),
  },
  {
    icon: 'fa-globe',
    title: '2022 Caper International',
    text: 'Caper International FZCO, Dubai started import and export operations.',
  },
  {
    icon: 'fa-cubes',
    title: '2024 3PL for Leading Lubricant Company',
    text: 'Partnered as a 3PL provider for a leading lubricant company, delivering end-to-end supply chain solutions.',
  },
  {
    icon: 'fa-truck',
    title: '2026 Line Haul Development FTL Movements',
    text: 'Expanded into line haul development with full truckload (FTL) movements for stronger network capacity.',
  },
]

const team = [
  {
    name: 'Satish Kundapur',
    role: 'Founder & Managing Director',
    image: 'images/satish-kundapur.webp',
    bio: 'A visionary leader with over 37 years of solid experience across industrial sectors, Satish Kundapur has been the driving force of Caper since inception. He has been the backbone of Caper’s meteoric rise from a courier company to a complete logistics and warehousing solution provider. Under his dynamic leadership, the company continues to tread beyond organic growth, venture into new business turfs and set new benchmarks in customer ownership with ambitious growth plans in the pipeline.',
  },
  {
    name: 'Rohan Kundapur',
    role: 'Director',
    image: 'images/rohan-kundapur.webp',
    bio: 'Focused, firmly grounded and future-driven, Rohan Kundapur is a Commerce Graduate and a fast-tracker with a varied spectrum of experience across the Shipping industry and Financial Markets. At Caper, he is an active contributor across Staff Management, E-Commerce, Business Development, Financial Analysis and Financial Risk. He is responsible for infusing young energy in the team and strongly believes in taking the organisation to the next level.',
  },
  {
    name: 'Rakshit Kundapur',
    role: 'Director',
    image: 'images/rakshit-kundapur.webp',
    bio: 'Young, dynamic and always ready for challenges, Rakshit Kundapur is Caper’s Next Gen Leader in the making. He took the reins of the company after successfully completing his post-graduation in Logistics & Warehousing and a degree in Mass Media, Advertising and Marketing. Rakshit lends his new age brilliance across Digital Marketing, Team Management, Warehouse Operations, Business Process Design, Internal Controls and Risk Management functions of the company. Always hungry for business diversification, Rakshit is also a talented photographer with an eye for creativity.',
  },
  {
    name: 'Vittal Madival',
    role: 'Director (IT)',
    image: 'images/vittal-madival.webp',
    bio: 'A problem solver by DNA and an Engineering Graduate (B.Tech) from Indian Institute of Science, Bangalore, Vittal Madival comes with a credible track record of 35+ years in planning, design, and implementation of Information Systems. He has closely worked with Caper to create a robust technology platform, keeping in mind the complexities of the business and the challenges of today and tomorrow. His result-driven approach has helped the company create a highly focused and motivated IT team, ever ready to deliver the right answers at the right time.',
  },
]

function TeamMemberBio({ bio }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <p
        className={`cardTeam__bio font-md color-grey-900 mb-0${
          expanded ? '' : ' cardTeam__bio--clamped'
        }`}
      >
        {bio}
      </p>
      <button
        type="button"
        className="cardTeam__toggle btn btn-link font-sm color-brand-1 p-0 mt-10"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
      >
        {expanded ? 'View less' : 'View more'}
      </button>
    </>
  )
}

export default function About() {
  const data = aboutData.about
  usePageMeta(getPageMeta('about'))

  return (
    <>
      <PageBanner heading={data.hero.heading} paragraph={data.hero.paragraph} />

      <section className="section mt-100" {...aos('fade-up')}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-5 col-lg-5 mb-30" {...aos('fade-up')}>
              <div className="cardTeam">
                <div className="cardImage">
                  <img alt="Satish Kundapur" src={asset('images/satish-kundapur-1.webp')} />
                  <div className="cardInfo">
                    <h6 className="color-white">Satish Kundapur</h6>
                    <div className="info-bottom">
                      <p className="color-white">Founder &amp; Managing Director</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-7 col-lg-7 mb-30" {...aos('fade-left', 150)}>
              <div className="box-info-pround">
                <div className="text-left">
                  <img className="mb-15" src={favicon} alt="Caper" />
                  <h2 className="color-grey-600 mb-20">
                    Built on Strong Relationships. Driven by Better Understanding.
                  </h2>
                  <p className="font-md color-grey-700">
                    Over the years, we’ve built strong relationships with our partners, customers, and teams by understanding one simple truth—every business is different.<br /><br />
                    Awards and numbers don’t define great logistics. Understanding problems and solving them in smarter ways does. At Caper, we combine experience, technology, and fresh thinking to solve challenges before they turn into obstacles. Because the better we understand your business, the better we can deliver for it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Mission & Vision Section */}
      <section className="section mt-100" {...aos('fade-up')}>
        <div className="container">
          <div className="text-center">
            <img className="mx-auto mb-15" src={favicon} alt="Caper" {...aos('zoom-in')} />
            <h2 className="color-grey-600 mb-20" {...aos('fade-up', 100)}>
              Mission &amp; Vision
            </h2>
            <p className="font-md color-grey-700" {...aos('fade-up', 200)}>
              Our Mission and Vision guide every action we take. We strive not only to move goods efficiently, but to deliver reliability, trust, and forward-thinking solutions that help our clients achieve their ambitions. We believe every successful supply chain starts with understanding unique business challenges and delivering solutions that create lasting value.
            </p>
          </div>
          <div className="row mt-50 align-items-stretch">
            {/* Mission */}
            <div className="col-lg-6 mb-30" {...aos('fade-up')}>
              <div className="h-100 rounded-3 shadow-sm p-4">
                <span className="about-value-icon" aria-hidden="true">
                  <i className="fa-solid fa-bullseye" />
                </span>
                <h2 className="color-grey-600 mt-15 mb-25">Our Mission</h2>
                <p className="font-md color-grey-900 mb-20">
                  We question the rules. We challenge yesterday&apos;s methods.
                </p>
                <p className="font-md color-grey-900 mb-0">
                  Our mission is to rethink what&apos;s possible and build smart logistics solutions that keep every business one step ahead.
                </p>
              </div>
            </div>
            {/* Vision */}
            <div className="col-lg-6 mb-30" {...aos('fade-up', 100)}>
              <div className="h-100 rounded-3 shadow-sm p-4">
                <span className="about-value-icon" aria-hidden="true">
                  <i className="fa-solid fa-eye" />
                </span>
                <h2 className="color-grey-600 mt-15 mb-25">Our Vision</h2>
                <p className="font-md color-grey-900 mb-20">
                  We don&apos;t want to be remembered for moving shipments.
                </p>
                <p className="font-md color-grey-900 mb-20">
                  We want to be remembered for helping businesses move forward.
                </p>
                <p className="font-md color-grey-900 mb-0">
                  Everything else is just logistics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="section mt-100" {...aos('fade-up')}>
        <div className="container">
          <div className="text-center">
            <img className="mx-auto mb-15" src={favicon} alt="Caper" {...aos('zoom-in')} />
            <h2 className="color-grey-600 mb-20" {...aos('fade-up', 100)}>
              Our Core Values
            </h2>
            <p className="font-md color-grey-700" {...aos('fade-up', 200)}>
              Our culture is guided by strong values that help us build trust, foster lasting partnerships, and support sustainable business growth.
            </p>
          </div>
          <div className="row mt-50 align-items-stretch">
            {/* Integrity */}
            <div className="col-lg-4 mb-30" {...aos('fade-up', 200)}>
              <div className="h-100 rounded-3 shadow-sm p-4">
                <span className="about-value-icon" aria-hidden="true">
                  <i className="fa-solid fa-handshake" />
                </span>
                <h2 className="color-grey-600 mt-15 mb-25">Integrity</h2>
                <p className="font-md color-grey-900 mb-0">
                  We build trust through transparency and by honoring our commitments.
                </p>
              </div>
            </div>
            {/* Innovation */}
            <div className="col-lg-4 mb-30" {...aos('fade-up', 220)}>
              <div className="h-100 rounded-3 shadow-sm p-4">
                <span className="about-value-icon" aria-hidden="true">
                  <i className="fa-solid fa-lightbulb" />
                </span>
                <h2 className="color-grey-600 mt-15 mb-25">Innovation</h2>
                <p className="font-md color-grey-900 mb-0">
                  We embrace creative solutions and evolving technologies to continually improve logistics outcomes.
                </p>
              </div>
            </div>
            {/* Collaboration */}
            <div className="col-lg-4 mb-30" {...aos('fade-up', 240)}>
              <div className="h-100 rounded-3 shadow-sm p-4">
                <span className="about-value-icon" aria-hidden="true">
                  <i className="fa-solid fa-people-arrows" />
                </span>
                <h2 className="color-grey-600 mt-15 mb-25">Collaboration</h2>
                <p className="font-md color-grey-900 mb-0">
                  We work together with partners and clients to achieve shared goals and smarter solutions.
                </p>
              </div>
            </div>
            {/* Accountability */}
            <div className="col-lg-4 mb-30" {...aos('fade-up', 260)}>
              <div className="h-100 rounded-3 shadow-sm p-4">
                <span className="about-value-icon" aria-hidden="true">
                  <i className="fa-solid fa-scale-balanced" />
                </span>
                <h2 className="color-grey-600 mt-15 mb-25">Accountability</h2>
                <p className="font-md color-grey-900 mb-0">
                  We take responsibility—owning challenges, delivering on promises, and continuously improving.
                </p>
              </div>
            </div>
            {/* Customer Focus */}
            <div className="col-lg-4 mb-30" {...aos('fade-up', 280)}>
              <div className="h-100 rounded-3 shadow-sm p-4">
                <span className="about-value-icon" aria-hidden="true">
                  <i className="fa-solid fa-users" />
                </span>
                <h2 className="color-grey-600 mt-15 mb-25">Customer Focus</h2>
                <p className="font-md color-grey-900 mb-0">
                  We put customers at the heart of everything—adapting to their needs and exceeding expectations.
                </p>
              </div>
            </div>
            {/* Sustainability */}
            <div className="col-lg-4 mb-30" {...aos('fade-up', 300)}>
              <div className="h-100 rounded-3 shadow-sm p-4">
                <span className="about-value-icon" aria-hidden="true">
                  <i className="fa-solid fa-leaf" />
                </span>
                <h2 className="color-grey-600 mt-15 mb-25">Sustainability</h2>
                <p className="font-md color-grey-900 mb-0">
                  We are dedicated to responsible practices that support long-term business and environmental growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section mt-100" {...aos('fade-up')}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6 mb-30" {...aos('fade-right')}>
              <img className="img-main w-100" src={asset(data.image)} alt="Caper" />
            </div>
            <div className="col-xl-6 col-lg-6 mb-30" {...aos('fade-left', 150)}>
              <div className="box-info-pround">
                <div className="text-left">
                  <img className="mb-15" src={favicon} alt="Caper" />
                  <h2 className="color-grey-600 mb-20">
                    Smart Solutions. Stronger Supply Chains.
                  </h2>
                  <p className="font-md color-grey-700">
                    Every product has somewhere to be. The question is, how smoothly can it get there?<br /><br />
                    For more than 3 decades, Caper has been helping businesses across India answer that question. With smart warehousing, reliable courier services, and specialized cold chain solutions, we make sure products move efficiently from origin to destination.<br /><br />
                    Powered by technology and driven by commitment, we help businesses focus on growth while we take care of the journey. Because when logistics works seamlessly, business grows naturally.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section mt-100" {...aos('fade-up')}>
        <div className="container">
          <div className="text-center">
            <img className="mx-auto mb-15" src={favicon} alt="Caper" {...aos('zoom-in')} />
            <h2 className="color-grey-600 mb-20" {...aos('fade-up', 100)}>
              Our Journey of Growth & Innovation
            </h2>
            <p className="font-md color-grey-700" {...aos('fade-up', 200)}>
              With smart warehousing, reliable courier services, and specialized cold chain solutions, Caper ensures your products move smoothly from origin to destination—every single time.
            </p>
          </div>
          <div className="row mt-50 align-items-center">
            <div className="col-lg-6 mb-30" {...aos('fade-right', 100)}>
              <div className="box-image-how">
                <img className="w-100" src={asset('images/about-logistics-journey-growth-innovation.webp')} alt="Caper logistics journey" />
                <div className="box-info-bottom-img">
                  <div className="info-play">
                    <h4 className="color-white mb-15">More than 3 decades of logistics excellence</h4>
                    <p className="font-sm color-white">
                      Since 1993, we’ve been transforming logistics in India—empowering business growth with smarter technology and a commitment to seamless deliveries.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-30 d-flex align-items-center">
              <ul className="list-how-works about-journey-milestones">
                {milestones.map((item, index) => (
                  <li key={item.title} {...aosStagger(index, 100, 'fade-left')}>
                    <div className="image-how">
                      <span className="about-value-icon" aria-hidden="true">
                        <i className={`fa-solid ${item.icon}`} />
                      </span>
                    </div>
                    <div className="info-how">
                      <h6 className="color-grey-600 mb-5">{item.title}</h6>
                      <p className="font-sm color-grey-700 mb-0">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="section mt-100" {...aos('fade-up')}>
        <div className="container">
          <div className="row align-items-center item-about-2">
            <div className="col-lg-6" {...aos('fade-right')}>
              <img src={asset('images/we-have-established-strong-relationships.webp')} alt="Caper" />
            </div>
            <div className="col-lg-6" {...aos('fade-left', 150)}>
              <div className="box-info-aabout-2">
                <span className="btn btn-tag">Why Choose Caper?</span>
                <h2 className="color-grey-600 mt-15 mb-25">
                  Built on Strong Relationships. Driven by Better Understanding.
                </h2>
                <p className="font-md color-grey-900 mb-20">
                  Over the years, we’ve built strong relationships with our partners, customers, and teams by understanding one simple truth—every business is different.<br /><br />
                  Awards and numbers don’t define great logistics. Understanding problems and solving them in smarter ways does. At Caper, we combine experience, technology, and fresh thinking to solve challenges before they turn into obstacles. Because the better we understand your business, the better we can deliver for it.
                </p>
              </div>
            </div>
          </div>

          <div className="row align-items-center item-about-2 item-about-2-revert">
            <div className="col-lg-6" {...aos('fade-right')}>
              <div className="box-info-aabout-2">
                <span className="btn btn-tag">Mission</span>
                <h2 className="color-grey-600 mt-15 mb-25">What Drives Us Forward</h2>
                <p className="font-md color-grey-900 mb-20">
                  Every business makes promises to its customers. Our job is to help keep them.<br /><br />
                  Our vision is to become India&#39;s most trusted logistics partner—known not just for moving shipments, but for delivering reliability, trust, and peace of mind.<br /><br />
                  Our mission is simple: to make logistics smarter, faster, and more dependable through innovation, efficiency, and accountability. Because when businesses can rely on their supply chain, they can focus on what they do best—growing.
                </p>
              </div>
            </div>
            <div className="col-lg-6" {...aos('fade-left', 150)}>
              <img src={asset('images/our-mission-and-our-vision.webp')} alt="Caper" />
            </div>
          </div>

          <div className="row align-items-center item-about-2">
            <div className="col-lg-6" {...aos('fade-right')}>
              <img src={asset('images/transforming-logistics-with-creative-3.webp')} alt="Caper" />
            </div>
            <div className="col-lg-6" {...aos('fade-left', 150)}>
              <div className="box-info-aabout-2">
                <span className="btn btn-tag">Our Philosophy</span>
                <h2 className="color-grey-600 mt-15 mb-25">Great Logistics Starts with Great People</h2>
                <p className="font-md color-grey-900 mb-20">
                  Our team combines experience, innovation, and reliability to ensure every shipment, every delivery, and every challenge is handled with care. By constantly improving the way we work, we help businesses operate more efficiently and move forward with confidence.<br /><br />
                  Because the right logistics partner is more than a service provider, it’s a team you can depend on.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="section mt-100" {...aos('fade-up')}>
        <div className="container">
          <div className="text-center">
            <img className="mx-auto mb-15" src={favicon} alt="Caper" {...aos('zoom-in')} />
            <h2 className="color-grey-600 mb-20" {...aos('fade-up', 100)}>
              Meet Our Team
            </h2>
            <p className="font-md color-grey-700" {...aos('fade-up', 200)}>
              The leadership team behind Caper India&apos;s trusted logistics, courier, and warehousing
              services.
            </p>
          </div>
          <div className="row mt-50 align-items-stretch">
            {team.map((member, index) => (
              <div key={member.name} className="col-xl-3 col-sm-6 mb-30" {...aosStagger(index, 120)}>
                <div className="cardTeam-box h-100 rounded-3 shadow-sm">
                  <div className="cardTeam">
                    <div className="cardImage">
                      <img src={asset(member.image)} alt={member.name} />
                      <div className="cardInfo">
                        <h6 className="color-white">{member.name}</h6>
                        <div className="info-bottom">
                          <p className="color-white">{member.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <TeamMemberBio bio={member.bio} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FAQ items={data.faqs} />
    </>
  )
}
