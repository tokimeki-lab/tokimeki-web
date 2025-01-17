'use client'

import { CostumeImage, CostumeModel } from '@/db/data'
import { useDictionary } from '@/i18n/hook'
import { Urls } from '@/utils/urls'
import Link from 'next/link'
import { useState } from 'react'
import { BsBadge3D } from 'react-icons/bs'
import CostumeImg from './CostumeImg'

interface Props {
  images?: CostumeImage[]
  models?: CostumeModel[]
}

const CostumeDetailImages = ({ images, models }: Props) => {
  const [image, setImage] = useState(images && images.length > 0 ? images[0] : undefined)
  const { costumes: t } = useDictionary()
  return (
    <>
      <div className="border rounded">
        <CostumeImg imageKey={image?.image_key} size="md" alt={image?.description || 'no image'} loading={!images} />
      </div>
      {image && (
        <>
          <div className="grid gap-1 py-2 text-left text-xs text-gray-500">
            <div className="min-h-8">
              <span className="mr-1">{image.description}</span>
              <span className="mr-1">（{t.photo_by}</span>
              <Link href={image.image_credit_url} target="_blank" className="text-primary">
                {image.image_credit}
              </Link>
              <span>{image.image_credit === '草🌱' ? '' : ` ${t.san}`}）</span>
            </div>
          </div>
          <div className="pt-4 text-left whitespace-nowrap overflow-x-scroll">
            {images &&
              (images.length > 1 || (models && models.length > 0)) &&
              images.map((img) => (
                <div key={img.id} className="w-20 h-20 inline-block mr-2 border rounded cursor-pointer select-none" onClick={() => setImage(img)}>
                  <CostumeImg imageKey={img.image_key} size="xs" alt={img.description} />
                </div>
              ))}
            {models &&
              models.map((model) => (
                <div key={model.id} className="w-20 h-20 inline-block mr-2 border rounded cursor-pointer select-none items-center justify-center">
                  <Link
                    href={model.url.endsWith('.glb') ? `${Urls.bolano}/models/${model.id}` : model.url}
                    target="_blank"
                    className="w-full h-full flex items-center justify-center">
                    <BsBadge3D className="w-full h-full p-4" />
                  </Link>
                </div>
              ))}
          </div>
        </>
      )}
    </>
  )
}

export default CostumeDetailImages
