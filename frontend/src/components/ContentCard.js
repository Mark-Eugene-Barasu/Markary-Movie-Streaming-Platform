import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import styles from './ContentCard.module.css';

const GRADIENTS = [
  'linear-gradient(160deg,#1e0a3c,#7c3aed)',
  'linear-gradient(160deg,#0d1b2a,#1e5f9e)',
  'linear-gradient(160deg,#1a0505,#8b1a1a)',
  'linear-gradient(160deg,#0a1a0a,#1a6a2a)',
  'linear-gradient(160deg,#1a0f00,#8a5a00)',
  'linear-gradient(160deg,#001a20,#005a6a)',
  'linear-gradient(160deg,#1a0a20,#6a1a8a)',
  'linear-gradient(160deg,#050a1a,#0a2060)',
];

export default function ContentCard({ item, index = 0 }) {
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);
  const bg = item.poster || GRADIENTS[index % GRADIENTS.length];
  const isUrl = bg.startsWith('http');

  const handleAdd = async (e) => {
    e.stopPropagation();
    try {
      await api.post(`/user/mylist/${item._id}`);
      setAdded(true);
    } catch (err) {
      if (err.response?.status === 409) {
        setAdded(true); // already added
      } else {
        // show error, but since no UI, perhaps alert or ignore
        console.error('Failed to add to list:', err);
      }
    }
  };

  const tagColors = {
    'New':    { bg: 'rgba(124,58,237,0.85)',  color: '#e9d5ff' },
    'Hot':    { bg: 'rgba(219,39,119,0.85)',  color: '#fce7f3' },
    'Top 10': { bg: 'rgba(201,168,76,0.85)',  color: '#fef3c7' },
  };
  const tc = tagColors[item.tag];

  return (
    <div className={styles.card} onClick={() => navigate(`/watch/${item._id}`)}>
      <div className={styles.thumb}>
        {isUrl
          ? <img src={bg} alt={item.title} className={styles.img} />
          : <div className={styles.gradient} style={{ background: bg }} />
        }
        {tc && (
          <div className={styles.tag} style={{ background: tc.bg, color: tc.color }}>
            {item.tag}
          </div>
        )}
        <div className={styles.title}>{item.title}</div>
        <div className={styles.overlay}>
          <div className={styles.playCircle}>▶</div>
          <div className={styles.actions}>
            <button className={styles.actionBtn} onClick={handleAdd} title="Add to My List">
              {added ? '✓' : '+'}
            </button>
            <button className={styles.actionBtn} title="Like">♥</button>
          </div>
        </div>
      </div>
    </div>
  );
}
