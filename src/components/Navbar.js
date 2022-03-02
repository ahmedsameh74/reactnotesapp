import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import {useLogout} from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useTheme } from '../hooks/useTheme'

export default function Navbar() {
  const {logout} = useLogout()
  const {user} = useAuthContext()
  const {color} = useTheme()


  
  return (
    <nav className={styles.navbar} style={{background:color}}>
    <ul>
        <li className={styles.title}><Link to='/'>NOTES</Link></li>
        {!user && (
          <>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/signup'>Signup</Link></li>
          </>
        )}
       
        {user && (
          <>
          <li>hello, {user.displayName}</li>
          <li className={styles.hide}><Link to='/create'>Add</Link></li>
          <li>
            <button className="btn" onClick={logout}>Logout</button>
          </li>
          </>
        )}
    </ul>

    </nav>
  )
}
