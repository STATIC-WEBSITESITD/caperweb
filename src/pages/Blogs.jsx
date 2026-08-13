import { Link } from 'react-router-dom'
import PageBanner from '../components/ui/PageBanner'
import { blogs, getPageMeta } from '../data/pages'
import { usePageMeta } from '../hooks/usePageMeta'
import { aos, aosStagger } from '../utils/aos'
import { asset } from '../utils/asset'

export default function Blogs() {
  usePageMeta(getPageMeta('blogs'))

  return (
    <>
      <PageBanner
        heading="News & Blogs"
        paragraph="Explore insightful blogs about the latest trends, innovations, and updates in our industry."
      />

      <section className="section pt-100" {...aos('fade-up')}>
        <div className="container">
          <div className="row">
            {blogs.map((post, index) => (
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
    </>
  )
}
