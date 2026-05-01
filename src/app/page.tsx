import HomeClient from '@/components/HomeClient';
import legacyMatches from '@/data/matches.json';

export default function Home() {
  return <HomeClient legacyMatches={legacyMatches} />;
}
