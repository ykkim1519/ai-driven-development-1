import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'AI 이미지 생성 커뮤니티',
    description: 'AI로 이미지를 생성하고 공유하는 커뮤니티입니다.'
}

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ko">
            <body className={inter.className}>
                <div className="min-h-screen bg-gray-50">
                    {children}
                </div>
            </body>
        </html>
    )
}
