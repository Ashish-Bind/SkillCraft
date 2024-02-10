'use client'

import { UploadDropzone } from '@/lib/uploadThing'
import { ourFileRouter } from '@/app/api/uploadthing/core'
import toast from 'react-hot-toast'

interface FileUploadProps {
  onChange: (url?: string) => void
  endpoint: keyof typeof ourFileRouter
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url)
      }}
      onUploadError={(err: Error) => {
        toast.error(`${err?.message}`)
      }}
    />
  )
}
