'use client'

import { useEffect } from 'react'
import { CommunityFeedCard } from '@/components/CommunityFeedCard'
import { useFeedStore } from '@/store/feedStore'

// 임시 데이터 (나중에 API로 대체)
const TEMP_FEED_DATA = [
    {
        postId: '1',
        userName: '김철수',
        userProfile: '/profiles/user1.jpg',
        imageURL: '/images/ai-generated-1.jpg',
        prompt: '우주를 여행하는 고양이',
        likes: 120,
        comments: 15,
        isLiked: false,
    },
    // ... 다른 피드 데이터
]

export default function FeedPage() {
    // Zustand 스토어에서 필요한 상태와 함수 가져오기
    const { posts, setInitialPosts } = useFeedStore()

    // 컴포넌트 마운트 시 초기 피드 데이터 설정
    useEffect(() => {
        setInitialPosts(TEMP_FEED_DATA)
    }, [setInitialPosts])

    return (
        <div className="container mx-auto py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <CommunityFeedCard key={post.postId} postId={post.postId} />
                ))}
            </div>
        </div>
    )
} 