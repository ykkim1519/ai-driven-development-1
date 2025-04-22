# Replicate Flux 모델 사용 가이드

이 가이드는 Next.js 프로젝트에서 Replicate의 Flux 이미지 생성 모델을 설정하고 사용하는 방법을 설명합니다.

## 목차

-   [사전 준비](#사전-준비)
-   [프로젝트 설정](#프로젝트-설정)
-   [API 구현](#api-구현)
-   [프론트엔드 구현](#프론트엔드-구현)
-   [환경 변수 설정](#환경-변수-설정)
-   [스타일 옵션](#스타일-옵션)

## 사전 준비

1. Replicate 계정 생성
   - [Replicate](https://replicate.com) 웹사이트에서 계정을 생성합니다.
   - API 토큰을 발급받습니다.

2. 필요한 패키지 설치
```bash
npm install replicate
```

## 프로젝트 설정

1. Next.js 설정
   `next.config.js` 파일에 이미지 도메인을 추가합니다:

```javascript
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'replicate.com',
            },
            {
                protocol: 'https',
                hostname: 'replicate.delivery',
            }
        ]
    }
}
```

## API 구현

1. 이미지 생성 API (`app/api/predictions/route.ts`)

```typescript
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
```

2. 프롬프트 형식
```typescript
const enhancedPrompt = `Create an image with ${mappedStyle} and ${mappedColor} colors: ${prompt}`
```

## 스타일 옵션

1. 아트 스타일
   - 디지털아트 (Digital Art Style)
   - 수채화 (Watercolor Painting Style)
   - 유화 (Oil Painting Style)
   - 펜화 (Pen and Ink Drawing Style)
   - 연필화 (Pencil Drawing Style)
   - 로고_미니멀 (Minimal Logo Design)
   - 로고_3D (3D Logo Design)
   - 로고_그라디언트 (Gradient Logo Design)
   - 로고_빈티지 (Vintage Logo Design)
   - 로고_모던 (Modern Logo Design)

2. 색감
   - 밝은 (Bright and Vibrant)
   - 어두운 (Dark and Moody)
   - 파스텔 (Soft Pastel)
   - 흑백 (Black and White)
   - 컬러풀 (Colorful and Vivid)
   - 모노톤 (Monochromatic)
   - 메탈릭 (Metallic)

## 환경 변수 설정

1. `.env.local` 파일 생성
```plaintext
REPLICATE_API_TOKEN=your_api_token_here
```

## 사용 예시

```typescript
// 이미지 생성 요청
const response = await fetch('/api/predictions', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        prompt: "A beautiful landscape",
        art_style: "디지털아트",
        color_tone: "밝은",
        aspect_ratio: "16:9",
        num_outputs: 1
    })
})
```

## 주의사항

1. 이미지 생성 시간
   - 이미지 생성에는 일정 시간이 소요됩니다 (약 10-30초)
   - 상태 폴링을 통해 생성 완료를 확인합니다

2. 에러 처리
   - API 토큰 미설정
   - 필수 파라미터 누락
   - 네트워크 오류
   - 이미지 생성 실패

3. 이미지 표시
   - Next.js Image 컴포넌트 사용 시 sizes 속성 필수
   - 이미지 최적화를 위한 도메인 설정 필요

## 참고 사항

- API 요청 횟수에 따라 과금될 수 있으므로 사용량을 모니터링하세요.
- 생성된 이미지의 저작권 및 사용 제한 사항을 확인하세요.
- 더 나은 결과를 위해 프롬프트를 상세하게 작성하세요.