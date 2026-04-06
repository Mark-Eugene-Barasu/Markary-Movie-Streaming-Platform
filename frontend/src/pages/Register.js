import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Auth.module.css';

export default function Register() {
  const [form,  setForm]  = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [busy,  setBusy]  = useState(false);
  const { register } = useAuth();
  const navigate     = useNavigate();

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setBusy(true); setError('');
    try {
      await register(form.name, form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally { setBusy(false); }
  };

  return (
    <div className={styles.page}>
      <div className={styles.bg} />
      <div className={styles.card}>
        <div className={styles.logo}>MARKARY</div>
        <h1 className={styles.heading}>Create account</h1>
        <p className={styles.sub}>Start streaming in seconds</p>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>Full Name</label>
          <input className={styles.input} type="text" name="name" placeholder="John Doe" value={form.name} onChange={handleChange} required />
          <label className={styles.label}>Email</label>
          <input className={styles.input} type="email" name="email" placeholder="you@email.com" value={form.email} onChange={handleChange} required />
          <label className={styles.label}>Password</label>
          <input className={styles.input} type="password" name="password" placeholder="Min. 6 characters" value={form.password} onChange={handleChange} required />
          <button className={styles.btn} disabled={busy}>{busy ? 'Creating account…' : 'Get Started'}</button>
        </form>

        <p className={styles.footer}>
          Already have an account? <Link to="/login" className={styles.linkText}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
