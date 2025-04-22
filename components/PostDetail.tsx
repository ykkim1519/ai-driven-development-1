'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { MessageCircle, Share2, ArrowLeft, Send } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState, useCallback, useMemo, useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'
import { useFeedStore } from '@/store/feedStore'
import { formatRelativeTime, formatFullDate } from '@/utils/date'
import { shareContent } from '@/utils/share'
import { IPost } from '@/types'

interface PostDetailProps {
  postId: string
}

// 목업 댓글 데이터
const MOCK_COMMENTS = [
  {
    id: '1',
    userName: '김민수',
    userProfile: '/avatars/user1.png',
    content: '정말 멋진 작품이네요! 프롬프트도 잘 작성하셨어요.',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '2',
    userName: '이지현',
    userProfile: '/avatars/user2.png',
    content: '색감이 너무 예쁩니다. 참고하고 싶어요.',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
]

export function PostDetail({ postId }: PostDetailProps) {
  const router = useRouter()
  const { toast } = useToast()

  // 스토어에서 필요한 상태와 액션 가져오기
  const toggleLike = useFeedStore((state) => state.toggleLike)
  const { posts } = useFeedStore()
  
  // 게시물 정보를 메모이제이션된 selector로 가져오기
  const [post, setPost] = useState<IPost | null>(null)
  const [newComment, setNewComment] = useState('')
  const [comments, setComments] = useState(MOCK_COMMENTS)

  useEffect(() => {
    const foundPost = posts.find((p) => p.postId === postId)
    console.log('✅ PostDetail - foundPost:', foundPost)
    
    if (foundPost) {
      // 목업 데이터에 설명 추가
      setPost({
        ...foundPost,
        description: '이 작품은 중세 시대의 성을 배경으로 한 판타지 일러스트레이션입니다. 마법과 현실이 공존하는 세계관을 표현하고자 했습니다.',
      })
    } else {
      toast({
        title: '게시물을 찾을 수 없습니다.',
        variant: 'destructive',
        duration: 2000,
      })
    }
  }, [postId, posts, toast])

  // 필요한 상태값들을 메모이제이션
  const { isLiked, likes } = useMemo(() => ({
    isLiked: post?.isLiked ?? false,
    likes: post?.likes ?? 0
  }), [post?.isLiked, post?.likes])

  // 좋아요 토글 핸들러
  const handleLikeToggle = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()

      if (!post) return

      toggleLike(postId)

      toast({
        title: isLiked ? '좋아요가 취소되었습니다.' : '좋아요를 눌렀습니다.',
        variant: 'default',
        duration: 1500,
      })
    },
    [postId, isLiked, toggleLike, toast, post]
  )

  // 공유 핸들러
  const handleShare = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!post) return

    await shareContent({
      title: post.prompt || '공유된 이미지',
      text: `${post.userName}님의 이미지`,
      url: window.location.href,
    })
  }, [post])

  // 댓글 작성 핸들러
  const handleSubmitComment = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const newCommentObj = {
      id: Date.now().toString(),
      userName: '현재 사용자',
      userProfile: '/avatars/current-user.png',
      content: newComment,
      createdAt: new Date().toISOString(),
    }

    setComments(prev => [newCommentObj, ...prev])
    setNewComment('')

    toast({
      title: '댓글이 작성되었습니다.',
      variant: 'default',
      duration: 1500,
    })
  }, [newComment, toast])

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl font-semibold text-gray-200">게시물을 찾을 수 없습니다.</h2>
        <Button
          variant="ghost"
          className="mt-4 text-purple-400 hover:text-purple-300"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          돌아가기
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto px-4">
      {/* 돌아가기 버튼 */}
      <Button
        variant="ghost"
        className="self-start text-purple-400 hover:text-purple-300"
        onClick={() => router.back()}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        돌아가기
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 이미지 섹션 */}
        <div className="relative aspect-square rounded-xl overflow-hidden">
          <Image
            src={post.imageURL}
            alt={post.prompt || '생성된 이미지'}
            fill
            className="object-cover"
          />
        </div>

        {/* 상세 정보 섹션 */}
        <div className="flex flex-col gap-6">
          {/* 사용자 정보 */}
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 ring-2 ring-purple-600/30 shadow-lg">
              <AvatarImage src={post.userProfile} />
              <AvatarFallback className="bg-purple-600/20 text-purple-300">
                {post.userName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium text-gray-100">{post.userName}</span>
              <span className="text-sm text-gray-400">
                {formatRelativeTime(post.createdAt)}
              </span>
              <span className="text-xs text-gray-500" title={formatFullDate(post.createdAt)}>
                {formatFullDate(post.createdAt)}
              </span>
            </div>
          </div>

          {/* 프롬프트와 설명 */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-400">프롬프트</h3>
              <p className="text-gray-200 bg-gray-800/50 rounded-lg p-4">
                {post.prompt || '프롬프트 정보가 없습니다.'}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-400">설명</h3>
              <p className="text-gray-300 bg-gray-800/30 rounded-lg p-4">
                {post.description || '설명이 없습니다.'}
              </p>
            </div>
          </div>

          {/* 상호작용 버튼 */}
          <div className="flex items-center gap-4 py-4 border-y border-gray-800">
            <div
              role="button"
              tabIndex={0}
              onClick={handleLikeToggle}
              onKeyDown={(e) => e.key === 'Enter' && handleLikeToggle(e as unknown as React.MouseEvent)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all cursor-pointer
                hover:bg-purple-600/20 ${isLiked ? 'text-purple-300' : 'text-gray-300'}`}
            >
              {isLiked ? (
                <AiFillHeart size={24} color="#a855f7" />
              ) : (
                <AiOutlineHeart size={24} color="#9ca3af" />
              )}
              <span className="font-medium select-none">{likes}</span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 text-gray-300">
              <MessageCircle className="w-6 h-6" />
              <span className="font-medium select-none">{comments.length}</span>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-purple-300 hover:bg-purple-600/20"
              onClick={handleShare}
            >
              <Share2 className="w-5 h-5 mr-2" />
              공유하기
            </Button>
          </div>

          {/* 댓글 섹션 */}
          <div className="space-y-4">
            {/* 댓글 입력 */}
            <form onSubmit={handleSubmitComment} className="flex gap-2">
              <Input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="댓글을 입력하세요..."
                className="flex-1 bg-gray-800/50 border-gray-700 focus:border-purple-500 text-white placeholder:text-gray-400"
              />
              <Button 
                type="submit" 
                variant="ghost" 
                size="icon" 
                disabled={!newComment.trim()}
                className="text-gray-300 hover:text-purple-300 hover:bg-purple-600/20 disabled:text-gray-600"
              >
                <Send className="w-5 h-5" />
              </Button>
            </form>

            {/* 댓글 목록 */}
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={comment.userProfile} />
                    <AvatarFallback>{comment.userName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-200">{comment.userName}</span>
                      <span className="text-xs text-gray-500">
                        {formatRelativeTime(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-gray-300 mt-1">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 