'use client'

import dynamic from 'next/dynamic'
import { useMemo } from 'react'

import 'react-quill/dist/quill.snow.css'

interface TextEditorProps {
  onChange: (value: string) => void
  value: string
}

export const TextEditor = ({ onChange, value }: TextEditorProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  )

  return (
    <div className="bg-white">
      <ReactQuill theme="snow" value={value} onChange={onChange} />
    </div>
  )
}
