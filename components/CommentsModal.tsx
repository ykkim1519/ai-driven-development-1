'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react'
import { getMockComments } from '@/lib/mockData'
import { Comment } from '@/types/community'

interface CommentsModalProps {
    postId: string
    isOpen: boolean
    onClose: () => void
}

export function CommentsModal({ postId, isOpen, onClose }: CommentsModalProps) {
    // 댓글 목록 상태 관리
    const [comments, setComments] = useState<Comment[]>(() => {
        const { comments: initialComments } = getMockComments(postId)
        return initialComments
    })
    const [newComment, setNewComment] = useState('')

    // 댓글 입력 핸들러
    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewComment(e.target.value)
    }

    // 댓글 작성 핸들러
    const handleSubmitComment = () => {
        if (!newComment.trim()) return
        
        // 새로운 댓글 객체 생성
        const newCommentObj: Comment = {
            id: `${postId}-${Date.now()}`,
            postId,
            userName: '현재 사용자', // 실제 구현 시 로그인된 사용자 정보 사용
            content: newComment.trim(),
            createdAt: new Date().toISOString(),
            userProfile: 'https://api.dicebear.com/7.x/initials/svg?seed=default' // 이니셜 스타일로 변경
        }

        // 댓글 목록 업데이트
        setComments(prevComments => [newCommentObj, ...prevComments])
        setNewComment('')
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-gray-900/95 text-gray-100">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
                        댓글
                    </DialogTitle>
                </DialogHeader>
                <div className="max-h-[300px] overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
                    {comments.map((comment: Comment) => (
                        <div key={comment.id} className="flex items-start gap-3 bg-gray-800/50 p-3 rounded-lg">
                            <div className="relative w-8 h-8 flex-shrink-0">
                                <Image
                                    src={comment.userProfile || 'https://api.dicebear.com/7.x/initials/svg?seed=default'}
                                    alt={comment.userName || '사용자'}
                                    fill
                                    className="rounded-full object-cover"
                                    sizes="32px"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-purple-400">{comment.userName}</span>
                                    <span className="text-xs text-gray-500">
                                        {new Date(comment.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-300 break-words">{comment.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex gap-2 mt-4">
                    <div className="relative flex-1">
                        <Input
                            placeholder="댓글을 입력하세요"
                            value={newComment}
                            onChange={handleCommentChange}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault()
                                    handleSubmitComment()
                                }
                            }}
                            className="bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 pr-12"
                        />
                        <Button
                            onClick={handleSubmitComment}
                            disabled={!newComment.trim()}
                            size="icon"
                            className="absolute right-1 top-1/2 -translate-y-1/2 bg-purple-600 hover:bg-purple-700 h-7 w-7"
                        >
                            <Send className="h-4 w-4" />
                            <span className="sr-only">전송</span>
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
