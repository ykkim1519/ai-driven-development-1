import { NextResponse } from 'next/server'
import Replicate from 'replicate'

// 스타일 매핑 정의
const styleMapping: { [key: string]: string } = {
    '디지털아트': 'digital art style',
    '수채화': 'watercolor painting style',
    '유화': 'oil painting style',
    '펜화': 'pen and ink drawing style',
    '연필화': 'pencil drawing style',
    '로고_미니멀': 'minimal logo design',
    '로고_3D': '3D logo design',
    '로고_그라디언트': 'gradient logo design',
    '로고_빈티지': 'vintage logo design',
    '로고_모던': 'modern logo design'
}

const colorMapping: { [key: string]: string } = {
    '밝은': 'bright and vibrant',
    '어두운': 'dark and moody',
    '파스텔': 'soft pastel',
    '흑백': 'black and white',
    '컬러풀': 'colorful and vivid',
    '모노톤': 'monochromatic',
    '메탈릭': 'metallic'
}

// Replicate 클라이언트 초기화
const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN
})

// 이미지 생성 API 엔드포인트
export async function POST(request: Request) {
    // API 토큰 확인
    if (!process.env.REPLICATE_API_TOKEN) {
        return NextResponse.json(
            { error: 'REPLICATE_API_TOKEN이 설정되지 않았습니다' },
            { status: 500 }
        )
    }

    try {
        // 요청 데이터 파싱
        const body = await request.json()
        const { 
            prompt, 
            aspect_ratio = '16:9', 
            num_outputs = 1,
            art_style,
            color_tone
        } = body

        // 필수 파라미터 검증
        if (!prompt) {
            return NextResponse.json(
                { error: '프롬프트는 필수 입력값입니다' },
                { status: 400 }
            )
        }

        // 스타일 옵션 검증
        if (!art_style || !color_tone) {
            return NextResponse.json(
                { error: '아트 스타일과 색감은 필수 입력값입니다' },
                { status: 400 }
            )
        }

        // 스타일 매핑
        const mappedStyle = styleMapping[art_style] || art_style
        const mappedColor = colorMapping[color_tone] || color_tone

        // 프롬프트에 스타일 옵션 추가
        const enhancedPrompt = `Create an image with ${mappedStyle} and ${mappedColor} colors: ${prompt}`

        console.log('Enhanced Prompt:', enhancedPrompt)

        // Replicate API 호출
        const prediction = await replicate.predictions.create({
            model: 'black-forest-labs/flux-schnell',
            input: {
                prompt: enhancedPrompt,
                num_outputs: num_outputs,
                aspect_ratio: aspect_ratio,
                go_fast: false,
                megapixels: "1",
                output_format: "webp",
                output_quality: 90
            }
        })

        console.log('Prediction created:', prediction)

        return NextResponse.json(prediction, { status: 201 })
    } catch (error) {
        console.error('이미지 생성 중 오류 발생:', error)
        return NextResponse.json(
            { error: '이미지 생성에 실패했습니다' },
            { status: 500 }
        )
    }
} 