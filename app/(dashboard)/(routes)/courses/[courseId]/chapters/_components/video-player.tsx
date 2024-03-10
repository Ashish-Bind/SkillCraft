import { Loader2, Lock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface VideoPlayerProps {
  chapterId: string
  title: string
  videoUrl: string
  isLocked: boolean
  nextChapterId: string
  courseId: string
  completeOnEnd: boolean
}

const VideoPlayer = ({
  chapterId,
  courseId,
  isLocked,
  nextChapterId,
  title,
  videoUrl,
}: VideoPlayerProps) => {
  return (
    <div className="relative aspect-video">
      {!isLocked && (
        <div className="absolute inset-0 flex items-center justify-center">
          <video src={videoUrl} controls></video>
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-600 text-white">
          <div className="flex items-center flex-col gap-2">
            <Lock />
            This chapter is locked
          </div>
        </div>
      )}
    </div>
  )
}

export default VideoPlayer
