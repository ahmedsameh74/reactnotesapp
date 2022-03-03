import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import styles from '../pages/home/Home.module.css'
import Trashcan from '../assest/delete.svg'
import { useFirestore } from './../hooks/useFirestore';

export default function Notes({notes}) {
  const {mode, color} = useTheme()
  const {deleteDocument} = useFirestore('notes')
    // console.log(notes)
  return (
    <>
    <div className={styles['notes-list']} >
      {notes.map(note => (
          <div key={note.id} className={styles.card} style={{background: mode === 'light' ? '#fff' : '#555'}}>
              <h3 style={{color: mode === 'light' ? '#333' : '#e0e0e0'}}>{note.title}</h3>
              <p style={{textAlign: 'center'}}>{note.createdAt.toDate().toLocaleString()}</p>
              <hr style={{background: mode === 'light' ? '#dad9d9' : '#484848'}}/>
              <div style={{color: mode === 'light' ? '#333' : '#e0e0e0'}}>{note.sub.substring(0,100)}...</div>
              <img src={Trashcan} className={styles.delete}
                onClick={() => deleteDocument(note.id)}
                alt='delete'
              />
              <Link to={`/note/${note.id}`} style={{background: color}}>Read More</Link>
          </div>
      ))}
    </div>
      
      </>
  )
}
