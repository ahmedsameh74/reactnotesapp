import styles from './Signup.module.css';
import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
import { useTheme } from '../../hooks/useTheme';

export default function Signup() {
  const [email, setEmail] = useState('')
  const {color, mode} = useTheme()
  const [displayName, setDisplayName] = useState('')
  const [password, setPassword] = useState('')
  const {signup, isLoading, error} = useSignup()

  const handleSubmit =(e) => {
    e.preventDefault()
    signup(email, password, displayName)
  }

  return (
    <form className={styles['signup-form']} onSubmit={handleSubmit}>
    <h2 style={{color: mode === 'light' ? '#333' : '#fff'}}>SignUp</h2>
    <label>
      <span>email:</span>
      <input
      type="email"
      onChange={(e) => setEmail(e.target.value)}
      value={email}
      />
    </label>
    <label>
      <span>username:</span>
      <input
       type="text"
       onChange={(e) => setDisplayName(e.target.value)}
       value={displayName}
      />
    </label>
    <label>
      <span>password:</span>
      <input 
      type="password"
      onChange={(e) => setPassword(e.target.value)}
      value={password}
      autoComplete='none'
      />
    </label>
    {!isLoading && <button className='btn' style={{background: color, color: '#fff'}}>SignUp</button>}
    {isLoading && <button className='btn' style={{background: color, color: '#fff'}} disabled>loading</button>}
    {error && <p style={{color: mode === 'light' ? '#333' : 'crimson'}}>{error}</p>}

    </form>
  )
}
