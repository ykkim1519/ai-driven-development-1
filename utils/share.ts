import { ShareOptions } from '@/types'
import { toast } from '@/hooks/use-toast'

/**
 * 콘텐츠 공유 함수
 * Web Share API를 지원하지 않는 경우 클립보드 복사로 대체
 */
export async function shareContent(options: ShareOptions): Promise<void> {
  try {
    if (navigator.share) {
      await navigator.share(options)
      toast({
        title: '공유되었습니다.',
        variant: 'default',
        duration: 1500,
      })
    } else {
      // 클립보드에 URL 복사
      await navigator.clipboard.writeText(options.url)
      toast({
        title: 'URL이 클립보드에 복사되었습니다.',
        variant: 'default',
        duration: 1500,
      })
    }
  } catch (error) {
    console.error('공유 실패:', error)
    toast({
      title: '공유에 실패했습니다.',
      variant: 'destructive',
      duration: 1500,
    })
  }
} 