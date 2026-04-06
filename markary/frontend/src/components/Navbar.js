import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => { logout(); navigate('/login'); };
  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2) || 'ME';

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <Link to="/" className={styles.logo}>MARKARY</Link>

      <ul className={styles.links}>
        {[['/', 'Home'], ['/browse', 'Browse'], ['/mylist', 'My List']].map(([path, label]) => (
          <li key={path}>
            <Link to={path} className={`${styles.link} ${location.pathname === path ? styles.active : ''}`}>
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles.right}>
        <button className={styles.searchBtn} onClick={() => navigate('/browse')}>⌕</button>
        <div className={styles.avatarWrap} onClick={() => setMenuOpen(o => !o)}>
          <div className={styles.avatar}>{initials}</div>
          {menuOpen && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownName}>{user?.name}</div>
              <div className={styles.dropdownEmail}>{user?.email}</div>
              <hr className={styles.dropdownDivider} />
              <button className={styles.dropdownItem} onClick={() => { setMenuOpen(false); navigate('/mylist'); }}>My List</button>
              <button className={styles.dropdownItem} onClick={handleLogout}>Sign Out</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
