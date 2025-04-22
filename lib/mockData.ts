import { Post, Comment, FeedResponse, CommentsResponse } from '@/types/community';

// 프롬프트 목록
const prompts = [
  'A beautiful sunset over the ocean',
  'Abstract geometric patterns in vibrant colors',
  'Surreal landscape with floating islands',
  'Cyberpunk city at night',
  'Enchanted forest with magical creatures',
  'Futuristic space station',
  'Ancient ruins covered in vegetation',
  'Underwater city with bioluminescent life',
  'Steampunk airship fleet',
  'Crystal cave with glowing minerals',
  'Desert oasis under starry sky',
  'Japanese garden in autumn',
  'Northern lights over mountains',
  'Alien marketplace on distant planet',
  'Medieval castle in the clouds',
  'Neon-lit rainy street',
  'Tropical paradise with waterfalls',
  'Arctic ice palace',
  'Volcanic landscape with dragons',
  'Floating sky gardens',
  'Deep space nebula',
  'Ancient temple in the jungle',
  'Underwater coral reef city',
  'Mountain peak above clouds',
  'Fairy tale cottage in the woods',
  'Futuristic hover car race',
  'Crystal clear mountain lake',
  'Desert sandstorm with ancient ruins',
  'Bioluminescent forest at night',
  'Floating islands in the sunset'
];

// 목업 게시물 데이터 생성
export const mockPosts: Post[] = Array.from({ length: 30 }, (_, i) => ({
  postId: (i + 1).toString(),
  imageURL: `https://picsum.photos/seed/${i + 1}/800/800`,
  userName: `artist${(i % 10) + 1}`,
  likes: Math.floor(Math.random() * 300) + 50,
  comments: Math.floor(Math.random() * 30) + 5,
  isLiked: Math.random() > 0.5,
  prompt: prompts[i],
  createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  userProfile: `https://picsum.photos/seed/profile${(i % 10) + 1}/100/100`
}));

// 목업 댓글 데이터 생성
const commentTemplates = [
  'This is absolutely stunning! The colors are incredible.',
  'Amazing work! I love the composition.',
  'The lighting in this piece is perfect.',
  'This is so creative and unique!',
  'Incredible detail and atmosphere.',
  'The mood in this piece is captivating.',
  'Beautiful work! The textures are amazing.',
  'This is truly inspiring.',
  'The perspective is so interesting.',
  'Love the creative approach!'
];

export const mockComments: Comment[] = mockPosts.flatMap(post => 
  Array.from({ length: Math.floor(Math.random() * 5) + 2 }, (_, i) => ({
    id: `${post.postId}-${i + 1}`,
    postId: post.postId,
    userName: `user${Math.floor(Math.random() * 20) + 1}`,
    content: commentTemplates[Math.floor(Math.random() * commentTemplates.length)],
    createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    userProfile: `https://picsum.photos/seed/user${Math.floor(Math.random() * 20) + 1}/100/100`
  }))
);

// 피드 목업 API 응답
export const getMockFeed = (page: number = 1, limit: number = 10): FeedResponse => {
  const start = (page - 1) * limit;
  const end = start + limit;
  const posts = mockPosts.slice(start, end);
  
  return {
    posts,
    totalCount: mockPosts.length,
    hasMore: end < mockPosts.length
  };
};

// 댓글 목업 API 응답
export const getMockComments = (postId: string): CommentsResponse => {
  const comments = mockComments.filter(comment => comment.postId === postId);
  
  return {
    comments
  };
}; 