import { useEffect, useState } from 'react';
import api from '../api';
import ContentCard from '../components/ContentCard';
import styles from './MyList.module.css';

export default function MyList() {
  const [items,   setItems]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/user/mylist')
      .then(res => setItems(res.data))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className={styles.page}>
      <h1 className={styles.heading}>My List</h1>
      {loading && <p className={styles.status}>Loading…</p>}
      {!loading && items.length === 0 && (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>Your list is empty</p>
          <p className={styles.emptyText}>Browse content and tap + to add titles here.</p>
        </div>
      )}
      <div className={styles.grid}>
        {items.map((item, i) => <ContentCard key={item._id || i} item={item} index={i} />)}
      </div>
    </main>
  );
}
