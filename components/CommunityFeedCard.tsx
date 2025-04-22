'use client'

import Link from 'next/link'
import Image from 'next/image'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { MessageCircle } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { IPost } from '@/types'
import { useFeedStore } from '@/store/feedStore'
import { CommentsModal } from '@/components/CommentsModal'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'

interface CommunityFeedCardProps {
  post: IPost
}

export function CommunityFeedCard({ post }: CommunityFeedCardProps) {
  const { toast } = useToast()
  const [showComments, setShowComments] = useState(false)
  const { toggleLike } = useFeedStore()

  console.log('✅ [Card] post id:', post.postId)

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleLike(post.postId)

    toast({
      title: !post.isLiked ? '좋아요를 눌렀습니다.' : '좋아요가 취소되었습니다.',
      variant: 'default',
      duration: 1500,
    })
  }

  const handleOpenComments = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowComments(true)
  }

  const handleCloseComments = () => {
    setShowComments(false)
  }

  return (
    <>
      <div onClick={(e) => e.stopPropagation()}>
        <Link href={`/post/${post.postId}`}>
          <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <div className="relative aspect-square">
              <Image
                src={post.imageURL}
                alt={post.prompt || ''}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="relative w-8 h-8">
                  <Image
                    src={post.userProfile || ''}
                    alt={post.userName}
                    fill
                    className="rounded-full object-cover"
                    sizes="32px"
                  />
                </div>
                <span className="font-medium">{post.userName}</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{post.prompt}</p>
              <div className="flex items-center gap-4" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={handleLikeToggle}
                  className="flex items-center gap-1 text-gray-600 hover:text-red-500"
                >
                  {post.isLiked ? (
                    <AiFillHeart className="w-5 h-5 fill-red-500 text-red-500" />
                  ) : (
                    <AiOutlineHeart className="w-5 h-5" />
                  )}
                  <span>{post.likes}</span>
                </button>
                <button
                  onClick={handleOpenComments}
                  className="flex items-center gap-1 text-gray-600 hover:text-blue-500"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{post.comments}</span>
                </button>
              </div>
            </div>
          </Card>
        </Link>
      </div>

      {showComments && (
        <CommentsModal
          postId={post.postId}
          isOpen={showComments}
          onClose={handleCloseComments}
        />
      )}
    </>
  )
}





