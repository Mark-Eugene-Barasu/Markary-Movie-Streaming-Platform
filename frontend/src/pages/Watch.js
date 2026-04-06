import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import styles from './Watch.module.css';

const GRADIENTS = [
  'linear-gradient(160deg,#1e0a3c,#7c3aed)',
  'linear-gradient(160deg,#0d1b2a,#1e5f9e)',
  'linear-gradient(160deg,#1a0505,#8b1a1a)',
];

export default function Watch() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(`/content/${id}`)
      .then(res => setItem(res.data))
      .catch(err => {
        setError(err.response?.data?.error || 'Failed to load content');
        setItem(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className={styles.loader}>Loading…</div>;

  if (error) return <div className={styles.error}>Error: {error}</div>;

  // Mock player if no videoUrl
  const bg = item?.backdrop || GRADIENTS[0];
  const isUrl = bg?.startsWith('http');

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => navigate(-1)}>← Back</button>

      <div className={styles.player}>
        {isUrl
          ? <img src={bg} alt="" className={styles.playerBg} />
          : <div className={styles.playerBg} style={{ background: bg }} />
        }
        <div className={styles.playerOverlay}>
          {item?.videoUrl
            ? <video src={item.videoUrl} controls className={styles.video} />
            : (
              <div className={styles.noVideo}>
                <div className={styles.playBtn}>▶</div>
                <p className={styles.noVideoText}>Video coming soon</p>
              </div>
            )
          }
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.meta}>
          <span className={styles.match}>{item?.matchScore || 97}% Match</span>
          <span className={styles.metaItem}>{item?.releaseYear || 2024}</span>
          <span className={styles.metaRating}>{item?.rating || '16+'}</span>
          {item?.type === 'series'
            ? <span className={styles.metaItem}>{item.seasons} Season{item.seasons > 1 ? 's' : ''}</span>
            : <span className={styles.metaItem}>{item?.duration} min</span>
          }
        </div>
        <h1 className={styles.title}>{item?.title || 'Unknown Title'}</h1>
        <p className={styles.desc}>{item?.description}</p>

        {item?.cast?.length > 0 && (
          <p className={styles.cast}><span className={styles.castLabel}>Cast: </span>{item.cast.join(', ')}</p>
        )}
        {item?.genres?.length > 0 && (
          <div className={styles.genres}>
            {item.genres.map(g => <span key={g} className={styles.genreTag}>{g}</span>)}
          </div>
        )}
      </div>
    </div>
  );
}
