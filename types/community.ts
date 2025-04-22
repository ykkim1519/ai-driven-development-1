// 커뮤니티 게시물 타입 정의
export interface Post {
  postId: string;
  imageURL: string;
  userName: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  prompt?: string;
  createdAt?: string;
  userProfile?: string;
}

// 댓글 타입 정의
export interface Comment {
  id: string;
  postId: string;
  userName: string;
  content: string;
  createdAt: string;
  userProfile?: string;
}

// 피드 응답 타입 정의
export interface FeedResponse {
  posts: Post[];
  totalCount: number;
  hasMore: boolean;
}

// 댓글 응답 타입 정의
export interface CommentsResponse {
  comments: Comment[];
} 