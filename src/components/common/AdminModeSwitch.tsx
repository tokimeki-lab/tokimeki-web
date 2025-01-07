'use client'

import { useEffect, useState } from 'react'

const AdminModeSwitch = () => {
  const [admin, setAdmin] = useState<boolean>()
  useEffect(() => {
    const v = localStorage.getItem('admin')
    setAdmin(v === 'true')
  }, [])
  const onChange = () => {
    localStorage.setItem('admin', admin ? 'false' : 'true')
    setAdmin(!admin)
  }
  return <input type="checkbox" checked={admin || false} onChange={onChange} disabled={admin === undefined} className="opacity-50" />
}

export default AdminModeSwitch
