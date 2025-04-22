/**
 * 날짜를 상대적 시간으로 포맷팅하는 함수
 * @param dateString - ISO 형식의 날짜 문자열
 * @returns 포맷팅된 상대 시간 문자열
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(months / 12)

  if (years > 0) return `${years}년 전`
  if (months > 0) return `${months}개월 전`
  if (days > 0) return `${days}일 전`
  if (hours > 0) return `${hours}시간 전`
  if (minutes > 0) return `${minutes}분 전`
  return '방금 전'
}

/**
 * 날짜를 전체 형식으로 포맷팅하는 함수
 * @param dateString - ISO 형식의 날짜 문자열
 * @returns 포맷팅된 전체 날짜 문자열
 */
export function formatFullDate(dateString: string): string {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`
} 