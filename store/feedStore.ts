import { create } from 'zustand'
import { IPost } from '@/types'

// 피드 스토어의 상태 타입 정의
interface FeedState {
  posts: IPost[]
}

// 피드 스토어의 액션 타입 정의
interface FeedActions {
  setInitialPosts: (posts: IPost[]) => void
  toggleLike: (postId: string) => void
}

type FeedStore = FeedState & FeedActions

// 피드 스토어 생성
const useFeedStore = create<FeedStore>((set) => ({
  // 초기 상태
  posts: [],
  
  // 게시물 초기화 액션
  setInitialPosts: (posts) => set({ posts }),
  
  // 좋아요 토글 액션
  toggleLike: (postId) => 
    set((state) => {
      const updatedPosts = state.posts.map((post) => {
        if (post.postId === postId) {
          // 새로운 객체를 반환하여 참조가 변경되도록 합니다
          return {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        }
        return post
      })
      
      // 배열도 새로운 참조로 반환
      return { posts: [...updatedPosts] }
    })
}))

export { useFeedStore } 