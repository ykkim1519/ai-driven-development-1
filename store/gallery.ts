import { create } from 'zustand'
import { IGalleryImage } from '@/types'
import { DateRange } from 'react-day-picker'

interface FilterOptions {
    artStyle?: string
    colorTone?: string
    dateRange?: DateRange
    sortBy: 'latest' | 'oldest'
    isPublic?: boolean
}

interface GalleryStore {
    images: IGalleryImage[]
    filters: FilterOptions
    filteredImages: IGalleryImage[]
    totalCount: number
    hasMore: boolean
    currentPage: number
    isLoading: boolean
    error: string | null

    // Actions
    fetchImages: () => Promise<void>
    loadMoreImages: () => Promise<void>
    deleteImage: (imageId: string) => Promise<void>
    updateImage: (
        imageId: string,
        tags: string[],
        isPublic: boolean
    ) => Promise<void>
    setFilter: (filter: Partial<FilterOptions>) => void
    resetFilters: () => void
    setImages: (images: IGalleryImage[]) => void
    setFilteredImages: (images: IGalleryImage[]) => void
}

const defaultFilters: FilterOptions = {
    sortBy: 'latest',
    isPublic: undefined
}

const ITEMS_PER_PAGE = 12

// 목업 데이터
const MOCK_IMAGES: IGalleryImage[] = [
    {
        id: '1',
        userId: 'user1',
        imageUrl: 'https://picsum.photos/seed/gallery1/800',
        prompt: 'A serene Japanese garden with cherry blossoms',
        styleOptions: {
            artStyle: '디지털아트',
            colorTone: '밝은'
        },
        tags: ['자연', '정원', '일본'],
        isPublic: true,
        createdAt: '2024-03-15T10:00:00Z',
        updatedAt: '2024-03-15T10:00:00Z'
    },
    {
        id: '2',
        userId: 'user1',
        imageUrl: 'https://picsum.photos/seed/gallery2/800',
        prompt: 'A futuristic cityscape with neon lights',
        styleOptions: {
            artStyle: '디지털아트',
            colorTone: '어두운'
        },
        tags: ['도시', '미래', '네온'],
        isPublic: false,
        createdAt: '2024-03-14T15:30:00Z',
        updatedAt: '2024-03-14T15:30:00Z'
    },
    {
        id: '3',
        userId: 'user1',
        imageUrl: 'https://picsum.photos/seed/gallery3/800',
        prompt: 'A magical forest with glowing mushrooms',
        styleOptions: {
            artStyle: '수채화',
            colorTone: '파스텔'
        },
        tags: ['숲', '마법', '자연'],
        isPublic: true,
        createdAt: '2024-03-13T09:45:00Z',
        updatedAt: '2024-03-13T09:45:00Z'
    },
    {
        id: '4',
        userId: 'user1',
        imageUrl: 'https://picsum.photos/seed/gallery4/800',
        prompt: 'A steampunk airship in the clouds',
        styleOptions: {
            artStyle: '유화',
            colorTone: '메탈릭'
        },
        tags: ['스팀펑크', '비행선', '구름'],
        isPublic: false,
        createdAt: '2024-03-12T14:20:00Z',
        updatedAt: '2024-03-12T14:20:00Z'
    },
    {
        id: '5',
        userId: 'user1',
        imageUrl: 'https://picsum.photos/seed/gallery5/800',
        prompt: 'An underwater scene with bioluminescent creatures',
        styleOptions: {
            artStyle: '디지털아트',
            colorTone: '컬러풀'
        },
        tags: ['바다', '생물', '발광'],
        isPublic: true,
        createdAt: '2024-03-11T11:15:00Z',
        updatedAt: '2024-03-11T11:15:00Z'
    },
    {
        id: '6',
        userId: 'user1',
        imageUrl: 'https://picsum.photos/seed/gallery6/800',
        prompt: 'A cozy cafe interior with vintage furniture',
        styleOptions: {
            artStyle: '유화',
            colorTone: '밝은'
        },
        tags: ['카페', '인테리어', '빈티지'],
        isPublic: false,
        createdAt: '2024-03-10T16:40:00Z',
        updatedAt: '2024-03-10T16:40:00Z'
    },
    {
        id: '7',
        userId: 'user1',
        imageUrl: 'https://picsum.photos/seed/gallery7/800',
        prompt: 'A mystical library with floating books',
        styleOptions: {
            artStyle: '디지털아트',
            colorTone: '어두운'
        },
        tags: ['도서관', '마법', '책'],
        isPublic: true,
        createdAt: '2024-03-09T13:25:00Z',
        updatedAt: '2024-03-09T13:25:00Z'
    },
    {
        id: '8',
        userId: 'user1',
        imageUrl: 'https://picsum.photos/seed/gallery8/800',
        prompt: 'A cyberpunk street market at night',
        styleOptions: {
            artStyle: '디지털아트',
            colorTone: '컬러풀'
        },
        tags: ['사이버펑크', '시장', '밤'],
        isPublic: false,
        createdAt: '2024-03-08T10:50:00Z',
        updatedAt: '2024-03-08T10:50:00Z'
    },
    {
        id: '9',
        userId: 'user1',
        imageUrl: 'https://picsum.photos/seed/gallery9/800',
        prompt: 'A peaceful mountain landscape with a temple',
        styleOptions: {
            artStyle: '수채화',
            colorTone: '밝은'
        },
        tags: ['산', '사원', '자연'],
        isPublic: true,
        createdAt: '2024-03-07T08:35:00Z',
        updatedAt: '2024-03-07T08:35:00Z'
    },
    {
        id: '10',
        userId: 'user1',
        imageUrl: 'https://picsum.photos/seed/gallery10/800',
        prompt: 'A fantasy tavern with magical drinks',
        styleOptions: {
            artStyle: '유화',
            colorTone: '어두운'
        },
        tags: ['선술집', '판타지', '마법'],
        isPublic: false,
        createdAt: '2024-03-06T17:55:00Z',
        updatedAt: '2024-03-06T17:55:00Z'
    }
]

export const useGalleryStore = create<GalleryStore>((set, get) => ({
    images: MOCK_IMAGES,
    filters: defaultFilters,
    filteredImages: MOCK_IMAGES,
    totalCount: MOCK_IMAGES.length,
    hasMore: false,
    currentPage: 1,
    isLoading: false,
    error: null,

    fetchImages: async () => {
        try {
            set({ isLoading: true, error: null, currentPage: 1 })
            const filters = get().filters

            // 목업 데이터 필터링
            let filteredImages = [...MOCK_IMAGES]

            if (filters.artStyle) {
                filteredImages = filteredImages.filter(
                    img => img.styleOptions.artStyle === filters.artStyle
                )
            }

            if (filters.colorTone) {
                filteredImages = filteredImages.filter(
                    img => img.styleOptions.colorTone === filters.colorTone
                )
            }

            if (filters.isPublic !== undefined) {
                filteredImages = filteredImages.filter(
                    img => img.isPublic === filters.isPublic
                )
            }

            // 날짜 필터링 추가
            if (filters.dateRange?.from) {
                const startDate = new Date(filters.dateRange.from)
                startDate.setHours(0, 0, 0, 0)

                filteredImages = filteredImages.filter(img => {
                    const imgDate = new Date(img.createdAt)
                    imgDate.setHours(0, 0, 0, 0)
                    return imgDate >= startDate
                })

                if (filters.dateRange.to) {
                    const endDate = new Date(filters.dateRange.to)
                    endDate.setHours(23, 59, 59, 999)

                    filteredImages = filteredImages.filter(img => {
                        const imgDate = new Date(img.createdAt)
                        return imgDate <= endDate
                    })
                }
            }

            // 정렬
            filteredImages.sort((a, b) => {
                const dateA = new Date(a.createdAt).getTime()
                const dateB = new Date(b.createdAt).getTime()
                return filters.sortBy === 'latest' ? dateB - dateA : dateA - dateB
            })

            set({
                images: filteredImages,
                filteredImages: filteredImages,
                totalCount: filteredImages.length,
                hasMore: false
            })
        } catch (error) {
            set({
                error:
                    error instanceof Error
                        ? error.message
                        : '알 수 없는 오류가 발생했습니다.'
            })
        } finally {
            set({ isLoading: false })
        }
    },

    loadMoreImages: async () => {
        // 목업 데이터에서는 추가 로드가 필요 없음
        return
    },

    deleteImage: async (imageId: string) => {
        try {
            set({ isLoading: true, error: null })

            // 목업 데이터에서 이미지 삭제
            const { images, filteredImages } = get()
            const newImages = images.filter(img => img.id !== imageId)
            const newFilteredImages = filteredImages.filter(
                img => img.id !== imageId
            )

            set({
                images: newImages,
                filteredImages: newFilteredImages,
                totalCount: newImages.length
            })
        } catch (error) {
            set({
                error:
                    error instanceof Error
                        ? error.message
                        : '알 수 없는 오류가 발생했습니다.'
            })
        } finally {
            set({ isLoading: false })
        }
    },

    updateImage: async (imageId: string, tags: string[], isPublic: boolean) => {
        try {
            set({ isLoading: true, error: null })

            // 목업 데이터 업데이트
            const { images, filteredImages } = get()
            const updateImages = (imgs: IGalleryImage[]) =>
                imgs.map(img =>
                    img.id === imageId
                        ? { ...img, tags, isPublic, updatedAt: new Date().toISOString() }
                        : img
                )

            set({
                images: updateImages(images),
                filteredImages: updateImages(filteredImages)
            })
        } catch (error) {
            set({
                error:
                    error instanceof Error
                        ? error.message
                        : '알 수 없는 오류가 발생했습니다.'
            })
        } finally {
            set({ isLoading: false })
        }
    },

    setFilter: (filter: Partial<FilterOptions>) => {
        set(state => ({
            filters: { ...state.filters, ...filter }
        }))
        get().fetchImages()
    },

    resetFilters: () => {
        set({ filters: defaultFilters })
        get().fetchImages()
    },

    setImages: (images: IGalleryImage[]) => {
        set({ images, totalCount: images.length })
    },

    setFilteredImages: (images: IGalleryImage[]) => {
        set({ filteredImages: images })
    }
}))
