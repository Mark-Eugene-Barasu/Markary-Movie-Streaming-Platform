import { useNavigate } from 'react-router-dom';
import styles from './Hero.module.css';

export default function Hero({ item }) {
  const navigate = useNavigate();
  if (!item) return null;

  return (
    <section className={styles.hero}>
      <div className={styles.bg}>
        {item.backdrop && <img src={item.backdrop} alt="" className={styles.backdropImg} />}
        <div className={styles.bgOverlay} />
      </div>
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      <div className={styles.content}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowDot} />
          Now Streaming · Top 10 Today
        </div>
        <h1 className={styles.title}>{item.title}</h1>
        <div className={styles.meta}>
          <span className={styles.match}>{item.matchScore || 97}% Match</span>
          <span className={styles.dot} />
          <span>{item.releaseYear || 2024}</span>
          <span className={styles.dot} />
          <span className={styles.rating}>{item.rating || '16+'}</span>
          <span className={styles.dot} />
          <span>{item.type === 'series' ? `${item.seasons} Season${item.seasons > 1 ? 's' : ''}` : `${item.duration} min`}</span>
        </div>
        <p className={styles.desc}>{item.description}</p>
        <div className={styles.btns}>
          <button className={styles.btnPlay} onClick={() => navigate(`/watch/${item._id}`)}>
            ▶&nbsp; Play Now
          </button>
          <button className={styles.btnInfo} onClick={() => navigate(`/watch/${item._id}`)}>
            ℹ&nbsp; More Info
          </button>
        </div>
      </div>
      <div className={styles.bottomFade} />
    </section>
  );
}
