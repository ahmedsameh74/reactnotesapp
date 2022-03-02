import Notes from '../../components/Notes'
import styles from './Home.module.css'
// import NoteForm from './NoteForm'
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext';
// import { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Link } from 'react-router-dom';

export default function Home() {
  const {user} = useAuthContext()
  const {mode, color} = useTheme()
  
  const {documents, error, isLoading} = useCollection(
    'notes',
    ['uid', '==', user.uid],
    ['createdAt', 'desc']    
    )
    // console.log(documents)
    // console.log(window.screen.width)
    
  return (
    <div className={styles.home}>
    {error && <p style={{textAlign: 'center', color: mode === 'light' ? '#333' : 'crimson'}}>{error}</p>}
    {isLoading && <p className='loading' style={{color: mode === 'light' ? '#333' : '#fff'}}>loading...</p>}
    {documents &&
     <>
     <Notes notes={documents}/>
     <div className={styles['card-add']} style={{background: mode === 'light' ? '#fff' : '#555', margin: '0 0 0 auto', display: documents.length && window.screen.width <= 400 ? 'flex' : 'none'}}>
        <Link to='/create' style={{color: color}}>+</Link>
      </div> 
     </>}
     {documents && documents.length === 0 && 
     <>
     <p className='loading' style={{color: mode === 'light' ? '#333' : '#fff'}}>you don't have notes yet</p>
     <div className={styles['card-add']} style={{background: mode === 'light' ? '#fff' : '#555', margin: '0 auto 0 auto', display: window.screen.width <= 400 ? 'flex' : 'none'}}>
        <Link to='/create' style={{color: color}}>+</Link>
      </div> 
     </>}
    </div>
  )
}
