import ContentCard from './ContentCard';
import styles from './ContentRow.module.css';

export default function ContentRow({ title, items = [], showMore }) {
  if (!items.length) return null;
  return (
    <div className={styles.row}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {showMore && <span className={styles.more}>View all →</span>}
      </div>
      <div className={styles.grid}>
        {items.map((item, i) => (
          <ContentCard key={item._id || i} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}
