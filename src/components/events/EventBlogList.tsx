import { getDictionary } from '@/i18n/dictionaries'
import SectionHeading from '../common/SectionHeading'

interface Props {
  showHeading?: boolean
}

const EventBlogList = async ({ showHeading = false }: Props) => {
  const blogs = []
  const { events: t } = await getDictionary()
  return (
    <>
      {blogs.length > 0 && (
        <div>
          {showHeading && <SectionHeading title={`📝 ${t.related_blogs}`} />}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"></div>
        </div>
      )}
    </>
  )
}

export default EventBlogList
