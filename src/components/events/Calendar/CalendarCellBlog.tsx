import Tooltip from '@/components/common/Tooltip'
import { Blog } from '@/db/data'
import { useDictionary } from '@/i18n/hook'
import Link from 'next/link'

interface Props {
  blog: Blog
  showBlogTitles: boolean
}

const CalendarCellBlog = ({ blog, showBlogTitles }: Props) => {
  const { common: t } = useDictionary()
  if (showBlogTitles) {
    return (
      <div>
        <Link href={blog.url} target="_blank" className="mr-1 select-none">
          📄 {blog.title}
        </Link>
      </div>
    )
  } else {
    const label = (() => {
      switch (blog.author) {
        case 'kanami':
          return t.kanami
        case 'julia':
          return t.julia
        case 'hitoka':
          return t.hitoka
        case 'haruka':
          return t.haruka
        case 'aki':
          return t.aki
        case 'hiyori':
          return t.hiyori
        case 'kumicho':
          return t.kumicho
        case 'banbi':
          return t.bambi
        case 'mako':
          return t.mako
        case 'sara':
          return t.sara
        default:
          return '📙'
      }
    })()
    return (
      <Tooltip text={blog.title} tipPosition="bottom">
        <Link href={blog.url} target="_blank" className="mr-1 leading-3 text-nowrap select-none">
          <span>{label}</span>
        </Link>
      </Tooltip>
    )
  }
}

export default CalendarCellBlog
