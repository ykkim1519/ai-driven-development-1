import { create } from 'zustand'

interface LikeState {
    likedPosts: { [key: string]: boolean }
    likeCounts: { [key: string]: number }
    toggleLike: (postId: string, initialCount: number) => void
}

export const useLikeStore = create<LikeState>((set) => ({
    likedPosts: {},
    likeCounts: {},
    toggleLike: (postId: string, initialCount: number) => {
        set((state) => {
            // 현재 좋아요 상태 확인
            const isCurrentlyLiked = state.likedPosts[postId] || false
            const currentCount = state.likeCounts[postId] ?? initialCount

            // 새로운 상태 계산
            const newLikedPosts = {
                ...state.likedPosts,
                [postId]: !isCurrentlyLiked
            }

            const newLikeCounts = {
                ...state.likeCounts,
                [postId]: isCurrentlyLiked ? currentCount - 1 : currentCount + 1
            }

            return {
                likedPosts: newLikedPosts,
                likeCounts: newLikeCounts
            }
        })
    }
})) 