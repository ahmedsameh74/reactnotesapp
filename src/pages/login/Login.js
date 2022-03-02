import { useState } from 'react'
import styles from './Login.module.css'
import { useLogin } from './../../hooks/useLogin';
import { useTheme } from '../../hooks/useTheme';

export default function Login() {
  const [email, setEmail] = useState('')
  const {color, mode} = useTheme()
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()
  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }



  return (
    <form className={styles['login-form']} onSubmit={handleSubmit}>
      <h2 style={{color: mode === 'light' ? '#333' : '#fff'}}>LogIn</h2>
      <label>
        <span>email:</span>
        <input
         type="email"
         onChange={(e) => setEmail(e.target.value)}
         value={email}
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
      {!isLoading && <button className='btn' style={{background: color, color: '#fff'}}>LogIn</button>}
      {isLoading && <button className='btn' style={{background: color, color: '#fff'}} disabled>Loading</button>}
      {error && <p style={{color: mode === 'light' ? '#333' : 'crimson'}}>{error}</p>}
    </form>
  )
}
