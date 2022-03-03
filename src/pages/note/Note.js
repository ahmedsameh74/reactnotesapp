import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { projectFirebase } from '../../firebase/config'
// import { useCollection } from '../../hooks/useCollection'
import { useTheme } from '../../hooks/useTheme'
import styles from './Note.module.css'
// import {
//   FacebookShareButton,
//   GooglePlusShareButton,
//   LinkedinShareButton,
//   TwitterShareButton,
//   WhatsappShareButton,
//   EmailShareButton,
// } from 'react-share';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {} from '@fortawesome/free-solid-svg-icons'

export default function Note() {
  const {id} = useParams()
  const [note, setNote] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsloading] = useState(false)
  const {mode} = useTheme()
  
  useEffect(() => {
    setIsloading(true)
    const unsub = projectFirebase.collection('notes').doc(id).onSnapshot((doc) => {
      if(doc.exists){
        setIsloading(false)
        setNote(doc.data())
      }else{
        setIsloading(false)
        setError('could not fetch this note')
      }
    })
    return () => unsub()
  },[id])


  return (
    <div className={styles.note} style={{background: mode === 'light' ? '#fff' : '#555'}}>
    {error && <p className='error' style={{color: mode === 'light' ? '#333' : 'crimson'}}>{error}</p>}
    {isLoading && <p className='loading' style={{color: mode === 'light' ? '#333' : '#fff'}}>loading...</p>}
    {note && (
      <>
        <h2 style={{color: mode === 'light' ? '#333' : '#e0e0e0'}}>{note.title}</h2>
        <span>Created at: {note.createdAt.toDate().toLocaleString()}</span>
        <hr style={{background: mode === 'light' ? '#dad9d9' : '#484848'}}/>
        <p style={{color: mode === 'light' ? '#333' : '#e0e0e0'}}>{note.sub}</p>
        <div className="share">
          {/* <FacebookShareButton url={window.location.href}>
          <FontAwesomeIcon icon={faArrowTurnUp} />
          </FacebookShareButton> */}
        </div>
      </>
    )}

    </div>
  )
}
