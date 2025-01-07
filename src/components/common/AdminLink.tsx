'use client'

import { Urls } from '@/utils/urls'
import { useEffect, useState } from 'react'
import { BiEdit } from 'react-icons/bi'

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  path: string
}

const AdminLink = (props: Props) => {
  const [admin, setAdmin] = useState<boolean>()
  useEffect(() => {
    const admin = localStorage.getItem('admin') === 'true'
    setAdmin(admin)
  }, [])
  return admin && process.env.NEXT_PUBLIC_MANAGE_URL ? (
    <a href={Urls.manage(props.path)} {...props} className={`text-primary font-bold mr-1 ${props.className}`}>
      <BiEdit className="inline-block" />
    </a>
  ) : (
    <></>
  )
}

export default AdminLink
