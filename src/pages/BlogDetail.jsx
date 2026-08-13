import { Navigate, useParams } from 'react-router-dom'
import PageBanner from '../components/ui/PageBanner'
import { blogArticles } from '../data/blogArticles'
import { getBlog, getPageMeta } from '../data/pages'
import { usePageMeta } from '../hooks/usePageMeta'
import { aos } from '../utils/aos'

export default function BlogDetail() {
  const { slug } = useParams()
  const post = getBlog(slug)
  const content = blogArticles[slug]

  usePageMeta(getPageMeta(slug))

  if (!post || !content) return <Navigate to="/blogs" replace />

  return (
    <>
      <PageBanner heading={post.hero.heading} paragraph={post.hero.paragraph} />

      <section className="section pt-100" {...aos('fade-up')}>
        <div className="container">
          <div className="col-xl-12 col-lg-12 mb-30" {...aos('fade-up', 100)}>
            <div className="box-info-pround p-0">
              <div className="text-left">{content}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
