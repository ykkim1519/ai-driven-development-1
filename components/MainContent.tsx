'use client';

import { useEffect } from 'react';
import { useFeedStore } from '@/store/feedStore';
import { CommunityFeedCard } from '@/components/CommunityFeedCard';
import { IPost } from '@/types';

// 초기 게시물 데이터
const INITIAL_POSTS: IPost[] = [
  {
    postId: '1',
    userId: 'user1',
    userName: '김철수',
    userProfile: 'https://picsum.photos/200/200?random=1',
    imageURL: 'https://picsum.photos/800/800?random=1',
    prompt: '오늘의 일상',
    likes: 24,
    comments: 5,
    isLiked: false,
    createdAt: new Date().toISOString(),
  },
  {
    postId: '2',
    userId: 'user2',
    userName: '이영희',
    userProfile: 'https://picsum.photos/200/200?random=2',
    imageURL: 'https://picsum.photos/800/800?random=2',
    prompt: '여행 중',
    likes: 15,
    comments: 3,
    isLiked: true,
    createdAt: new Date().toISOString(),
  },
  {
    postId: '3',
    userId: 'user3',
    userName: '박지민',
    userProfile: 'https://picsum.photos/200/200?random=3',
    imageURL: 'https://picsum.photos/800/800?random=3',
    prompt: '맛집 탐방',
    likes: 30,
    comments: 8,
    isLiked: false,
    createdAt: new Date().toISOString(),
  },
];

export function MainContent() {
  // Zustand 스토어에서 상태와 액션 가져오기
  const { posts, setInitialPosts } = useFeedStore();

  // 컴포넌트 마운트 시 초기 게시물 데이터 설정
  useEffect(() => {
    setInitialPosts(INITIAL_POSTS);
  }, [setInitialPosts]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {posts.map((post) => (
        <CommunityFeedCard key={post.postId} post={post} />
      ))}
    </div>
  );
} 