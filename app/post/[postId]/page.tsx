import { PostDetail } from '@/components/PostDetail';

export default function PostDetailPage({ params }: { params: { postId: string } }) {
  return <PostDetail postId={params.postId} />;
} 