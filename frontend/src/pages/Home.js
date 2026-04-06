import { useState, useEffect } from 'react';
import api from '../api';
import Hero from '../components/Hero';
import ContentRow from '../components/ContentRow';
import styles from './Home.module.css';

const GENRES = ['All','Sci-Fi','Thriller','Drama','Action','Horror','Comedy','Documentary','Romance','Animation'];

// Fallback mock data so the UI looks great even before DB is seeded
const MOCK = Array.from({ length: 10 }, (_, i) => ({
  _id: `mock-${i}`,
  title: ['Void Signal','Neon Cage','The Last Epoch','Fractured','Echo Protocol','Solaris Deep','Blood Meridian','Phantom City','Zero Hour','The Fold'][i],
  description: 'A gripping story of survival, discovery and the unknown.',
  type: 'series', seasons: 2, releaseYear: 2024, rating: '16+',
  matchScore: Math.floor(Math.random() * 20 + 80),
  tag: ['New','','Hot','','','','New','Hot','','Top 10'][i],
  genres: ['Sci-Fi','Drama'],
}));

const MOCK_FEATURED = {
  _id: 'mock-featured',
  title: 'Dark Horizon', type: 'series', seasons: 2,
  releaseYear: 2024, rating: '16+', matchScore: 97,
  description: 'A rogue scientist discovers a signal from beyond the known universe — and the race to decode it changes everything humanity thought it knew about existence.',
};

export default function Home() {
  const [featured,  setFeatured]  = useState(null);
  const [trending,  setTrending]  = useState([]);
  const [picks,     setPicks]     = useState([]);
  const [activeGenre, setActiveGenre] = useState('All');
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/content/featured').catch(() => ({ data: null })),
      api.get('/content/trending').catch(() => ({ data: [] })),
      api.get('/content/all?limit=10').catch(() => ({ data: { items: [] } })),
    ]).then(([f, t, a]) => {
      setFeatured(f.data || MOCK_FEATURED);
      setTrending(t.data?.length ? t.data : MOCK);
      setPicks(a.data?.items?.length ? a.data.items : MOCK.slice(1));
    }).finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className={styles.loader}>
      <div className={styles.loaderLogo}>MARKARY</div>
      <div className={styles.loaderBar}><div className={styles.loaderFill} /></div>
    </div>
  );

  return (
    <main>
      <Hero item={featured} />

      {/* Genre pills */}
      <div className={styles.genreBar}>
        {GENRES.map(g => (
          <button
            key={g}
            className={`${styles.pill} ${activeGenre === g ? styles.pillActive : ''}`}
            onClick={() => setActiveGenre(g)}
          >{g}</button>
        ))}
      </div>

      <div className={styles.rows}>
        <ContentRow title="Trending Now" items={trending} showMore />
        <ContentRow title="Top Picks for You" items={picks} showMore />
        <ContentRow title="Because you watched Dark Horizon" items={trending.slice(2)} showMore />
      </div>

      {/* Featured banner */}
      <div className={styles.banner}>
        <div className={styles.bannerGlow} />
        <div className={styles.bannerContent}>
          <div className={styles.bannerLabel}>Markary Originals</div>
          <div className={styles.bannerTitle}>Echoes of Tomorrow</div>
          <div className={styles.bannerSub}>A landmark 10-part series. Premieres this Friday.</div>
        </div>
        <button className={styles.bannerBtn}>Set Reminder</button>
      </div>

      <div className={styles.rows}>
        <ContentRow title="New Releases" items={picks.slice(1)} showMore />
      </div>
    </main>
  );
}
