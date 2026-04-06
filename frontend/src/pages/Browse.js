import { useState, useEffect, useCallback } from 'react';
import api from '../api';
import ContentCard from '../components/ContentCard';
import styles from './Browse.module.css';

const GENRES = ['All','Sci-Fi','Thriller','Drama','Action','Horror','Comedy','Documentary','Romance','Animation'];

export default function Browse() {
  const [query,   setQuery]   = useState('');
  const [genre,   setGenre]   = useState('All');
  const [items,   setItems]   = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchContent = useCallback(async () => {
    setLoading(true);
    try {
      if (query.trim()) {
        const res = await api.get(`/content/search?q=${encodeURIComponent(query)}`);
        setItems(res.data);
      } else {
        const g = genre !== 'All' && GENRES.includes(genre) ? `&genre=${genre}` : '';
        const res = await api.get(`/content/all?limit=24${g}`);
        setItems(res.data.items || []);
      }
    } catch {
      setItems([]);
    } finally { setLoading(false); }
  }, [query, genre]);

  useEffect(() => {
    const t = setTimeout(fetchContent, 400);
    return () => clearTimeout(t);
  }, [fetchContent]);

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Browse</h1>
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>⌕</span>
          <input
            className={styles.search} type="text"
            placeholder="Search titles…"
            value={query} onChange={e => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.genres}>
        {GENRES.map(g => (
          <button key={g} className={`${styles.pill} ${genre === g ? styles.active : ''}`}
            onClick={() => setGenre(g)}>{g}</button>
        ))}
      </div>

      {loading && <p className={styles.status}>Searching…</p>}
      {!loading && items.length === 0 && <p className={styles.status}>No results found.</p>}

      <div className={styles.grid}>
        {items.map((item, i) => <ContentCard key={item._id || i} item={item} index={i} />)}
      </div>
    </main>
  );
}
