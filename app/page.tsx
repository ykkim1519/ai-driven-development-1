import { MainContent } from '@/components/MainContent';
import { getMockFeed } from '@/lib/mockData';

export default function Home() {
    const feedData = getMockFeed();
    
    return <MainContent initialFeedData={feedData} />;
}
